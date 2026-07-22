import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useAuth, API_URL } from '../contexts/AuthContext';
import { SkinViewer, WalkingAnimation } from 'skinview3d';
import './SkinBrowser.css';

interface Cape {
  id: string;
  name: string;
  url: string;
}

function CapePreview3D({ capeUrl }: { capeUrl: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered || !containerRef.current) return;
    
    const newViewer = new SkinViewer({
      width: 100,
      height: 180,
    });
    
    let isCancelled = false;
    
    // For cape preview, we load a default Steve skin, then the cape
    newViewer.loadSkin('https://textures.minecraft.net/texture/1a4af718455d4aab528e7a61f86fa25e6a369d1768dcb13f7df319a713eb810b').then(() => {
      if (isCancelled) return;
      newViewer.loadCape(capeUrl).then(() => {
        if (isCancelled) return;
        newViewer.animation = new WalkingAnimation();
        // Turn the model around so we can see the cape!
        newViewer.camera.position.z = -40;
        newViewer.camera.position.x = 20;
        newViewer.camera.lookAt(0, 0, 0);

        if (containerRef.current) {
          containerRef.current.appendChild(newViewer.canvas);
        }
      });
    }).catch((e) => {
      console.error("Cape load error:", e);
      newViewer.dispose();
    });
    
    return () => {
      isCancelled = true;
      if (containerRef.current && containerRef.current.contains(newViewer.canvas)) {
        containerRef.current.removeChild(newViewer.canvas);
        newViewer.dispose();
      } else if (newViewer.canvas) {
        // newViewer.dispose();
      }
    };
  }, [isHovered, capeUrl]);

  return (
    <div 
      className="skin-3d-preview" 
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '180px' }}
    >
      {!isHovered && (
        <img 
          src={capeUrl} 
          alt="Cape Preview" 
          style={{ width: 64, height: 32, objectFit: 'contain', imageRendering: 'pixelated', transform: 'scale(2)' }} 
        />
      )}
    </div>
  );
}

interface CapeBrowserProps {
  onSkinUpdated: () => void;
}

export default function CapeBrowser({ onSkinUpdated }: CapeBrowserProps) {
  const { token, user, updateUser } = useAuth();
  const [capes, setCapes] = useState<Cape[]>([]);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState<string | null>(null);

  useEffect(() => {
    fetch('/capes/capes.json')
      .then(r => r.json())
      .then(data => {
        setCapes(data);
        setLoading(false);
      })
      .catch(e => {
        console.error('Failed to load capes index', e);
        setLoading(false);
      });
  }, []);

  const applyCape = async (cape: Cape) => {
    setApplying(cape.id);
    try {
      const imageRes = await fetch(cape.url);
      const blob = await imageRes.blob();
      const file = new File([blob], `cape_${cape.id}.png`, { type: 'image/png' });

      const formData = new FormData();
      formData.append('cape', file);

      const res = await axios.post(`${API_URL}/cosmetics/cape`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      
      if (user) {
        updateUser({
          ...user,
          capeUrl: res.data.capeUrl
        });
      }
      onSkinUpdated();
    } catch (error) {
      console.error('Failed to apply cape', error);
      alert('Ошибка при установке плаща.');
    }
    setApplying(null);
  };

  return (
    <div className="skin-browser">
      <div className="skin-browser-header">
        <h2 className="skin-browser-title">Каталог плащей</h2>
      </div>
      
      {loading ? (
        <div className="skin-browser-loading-container">
          <div className="skin-browser-loading">Загрузка плащей...</div>
        </div>
      ) : (
        <div className="skin-browser-grid">
          {capes.map(cape => (
            <div key={cape.id} className="skin-card" style={{ padding: '15px' }}>
              <CapePreview3D capeUrl={cape.url} />
              <div style={{ color: 'var(--pg-yellow)', fontFamily: "'Blocks', sans-serif", fontSize: '14px', marginBottom: '10px', marginTop: '10px', textAlign: 'center' }}>
                {cape.name}
              </div>
              <button 
                className="nav-btn skin-apply-btn" 
                onClick={() => applyCape(cape)}
                disabled={applying === cape.id}
              >
                {applying === cape.id ? 'Установка...' : 'Надеть'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
