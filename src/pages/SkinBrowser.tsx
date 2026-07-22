import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { SkinViewer, WalkingAnimation } from 'skinview3d';
import { useAuth, API_URL } from '../contexts/AuthContext';
import './SkinBrowser.css';

interface Skin {
  id: number;
  url: string;
}

interface SkinBrowserProps {
  onSkinUpdated: () => void;
}

// Global snapshot worker to avoid WebGL 16 context limit
let snapshotWorker: SkinViewer | null = null;
const snapshotQueue: { url: string, resolve: (snapshot: string) => void }[] = [];
let isWorking = false;

const getSkinSnapshot = (url: string): Promise<string> => {
  return new Promise(resolve => {
    snapshotQueue.push({ url, resolve });
    processQueue();
  });
};

const processQueue = async () => {
  if (isWorking || snapshotQueue.length === 0) return;
  isWorking = true;
  
  if (!snapshotWorker) {
    snapshotWorker = new SkinViewer({ width: 100, height: 180, renderPaused: true });
  }

  while (snapshotQueue.length > 0) {
    const { url, resolve } = snapshotQueue.shift()!;
    try {
      await snapshotWorker.loadSkin(url.replace('http://', 'https://'));
      snapshotWorker.render();
      resolve(snapshotWorker.canvas.toDataURL());
    } catch (e) {
      console.error('Error generating snapshot', e);
      resolve('');
    }
  }
  isWorking = false;
};

function SkinPreview3D({ url }: { url: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [snapshot, setSnapshot] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let active = true;
    getSkinSnapshot(url).then(img => {
      if (active) setSnapshot(img);
    });
    return () => { active = false; };
  }, [url]);

  useEffect(() => {
    if (!isHovered || !containerRef.current) return;
    
    const newViewer = new SkinViewer({
      width: 100,
      height: 180
    });
    newViewer.animation = new WalkingAnimation();
    
    let isCancelled = false;
    
    newViewer.loadSkin(url.replace('http://', 'https://')).then(() => {
      if (isCancelled) {
        newViewer.dispose();
      } else if (containerRef.current) {
        containerRef.current.appendChild(newViewer.canvas);
      }
    }).catch((e) => {
      console.error("Skin load error:", e);
      newViewer.dispose();
    });
    
    return () => {
      isCancelled = true;
      if (containerRef.current && containerRef.current.contains(newViewer.canvas)) {
        containerRef.current.removeChild(newViewer.canvas);
        newViewer.dispose();
      } else if (newViewer.canvas && !newViewer.disposed) {
        // If it was instantiated but not appended, just dispose if it hasn't loaded yet
        // The .then or .catch will also dispose it, but we can call it here if needed.
        // Actually, it's safer to let the .then or .catch handle it if it's still loading.
      }
    };
  }, [isHovered, url]);

  return (
    <div 
      className="skin-3d-preview" 
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      {!isHovered && snapshot && (
        <img src={snapshot} alt="Skin Preview" style={{ width: 100, height: 180 }} />
      )}
      {!isHovered && !snapshot && (
        <div style={{ color: '#aaa', fontSize: 12 }}>Загрузка...</div>
      )}
    </div>
  );
}

export default function SkinBrowser({ onSkinUpdated }: SkinBrowserProps) {
  const { token, user, updateUser } = useAuth();
  const [skins, setSkins] = useState<Skin[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [applying, setApplying] = useState<number | null>(null);
  const observerTarget = useRef<HTMLDivElement>(null);

  const fetchSkins = async (pageNum: number) => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const res = await axios.get(`https://api.mineskin.org/get/list/${pageNum}?size=24`);
      if (res.data && res.data.skins) {
        if (res.data.skins.length === 0) {
          setHasMore(false);
        } else {
          setSkins(prev => {
            // Filter out duplicates just in case
            const newSkins = res.data.skins.filter((s: Skin) => !prev.some(p => p.id === s.id));
            return [...prev, ...newSkins];
          });
        }
      } else {
        setHasMore(false);
      }
    } catch (e) {
      console.error('Error fetching skins', e);
      setHasMore(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSkins(page);
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          setPage(p => p + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [loading, hasMore]);

  const applySkin = async (skin: Skin) => {
    setApplying(skin.id);
    try {
      const imageRes = await fetch(skin.url);
      const blob = await imageRes.blob();
      const file = new File([blob], `skin_${skin.id}.png`, { type: 'image/png' });

      const formData = new FormData();
      formData.append('skin', file);

      const res = await axios.post(`${API_URL}/cosmetics/skin`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      
      if (user) {
        updateUser({
          ...user,
          skinUrl: res.data.skinUrl
        });
      }
      onSkinUpdated();
    } catch (error) {
      console.error('Failed to apply skin', error);
      alert('Ошибка при установке скина.');
    }
    setApplying(null);
  };

  return (
    <div className="skin-browser">
      <h2 className="skin-browser-title">Каталог скинов (MineSkin)</h2>
      
      <div className="skin-browser-grid">
        {skins.map(skin => (
          <div key={skin.id} className="skin-card">
            <SkinPreview3D url={skin.url} />
            <button 
              className="nav-btn skin-apply-btn" 
              onClick={() => applySkin(skin)}
              disabled={applying === skin.id}
            >
              {applying === skin.id ? 'Установка...' : 'Надеть'}
            </button>
          </div>
        ))}
      </div>

      <div ref={observerTarget} className="skin-browser-loading-container">
        {loading && <div className="skin-browser-loading">Загрузка скинов...</div>}
        {!hasMore && skins.length > 0 && <div className="skin-browser-loading">Больше скинов нет!</div>}
      </div>
    </div>
  );
}
