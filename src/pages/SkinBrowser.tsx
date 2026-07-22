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

function SkinPreview3D({ url }: { url: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewer, setViewer] = useState<SkinViewer | null>(null);

  useEffect(() => {
    if (containerRef.current && !viewer) {
      const newViewer = new SkinViewer({
        canvas: document.createElement('canvas'),
        width: 100,
        height: 180,
        skin: url
      });
      // We don't want animation to lag the browser, so we make it static initially.
      // The user can still rotate it by dragging.
      containerRef.current.appendChild(newViewer.canvas);
      setViewer(newViewer);
    }
  }, [url, viewer]);

  const handleMouseEnter = () => {
    if (viewer) {
      viewer.animation = new WalkingAnimation();
    }
  };

  const handleMouseLeave = () => {
    if (viewer) {
      viewer.animation = null;
    }
  };

  return (
    <div 
      className="skin-3d-preview" 
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
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
