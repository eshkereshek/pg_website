import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth, API_URL } from '../contexts/AuthContext';
import './SkinBrowser.css';

interface Skin {
  id: number;
  url: string;
}

interface SkinBrowserProps {
  onSkinUpdated: () => void;
}

export default function SkinBrowser({ onSkinUpdated }: SkinBrowserProps) {
  const { token, user, updateUser } = useAuth();
  const [skins, setSkins] = useState<Skin[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [applying, setApplying] = useState<number | null>(null);

  const fetchSkins = async (pageNum: number) => {
    setLoading(true);
    try {
      const res = await axios.get(`https://api.mineskin.org/get/list/${pageNum}?size=16`);
      if (res.data && res.data.skins) {
        setSkins(res.data.skins);
      }
    } catch (e) {
      console.error('Error fetching skins', e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSkins(page);
  }, [page]);

  const applySkin = async (skin: Skin) => {
    setApplying(skin.id);
    try {
      // Fetch the image blob through CORS proxy
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(skin.url)}`;
      const imageRes = await fetch(proxyUrl);
      const blob = await imageRes.blob();
      const file = new File([blob], `skin_${skin.id}.png`, { type: 'image/png' });

      // Upload it
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
      
      {loading ? (
        <div className="skin-browser-loading">Загрузка...</div>
      ) : (
        <div className="skin-browser-grid">
          {skins.map(skin => (
            <div key={skin.id} className="skin-card">
              <div className="skin-preview-container">
                <div 
                  className="skin-head-preview"
                  style={{
                    backgroundImage: `url(https://api.allorigins.win/raw?url=${encodeURIComponent(skin.url)})`
                  }}
                />
              </div>
              <button 
                className="skin-apply-btn" 
                onClick={() => applySkin(skin)}
                disabled={applying === skin.id}
              >
                {applying === skin.id ? 'Установка...' : 'Надеть'}
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="skin-browser-pagination">
        <button 
          onClick={() => setPage(p => Math.max(1, p - 1))} 
          disabled={page === 1 || loading}
          className="browser-nav-btn"
        >
          Назад
        </button>
        <span className="page-indicator">Страница {page}</span>
        <button 
          onClick={() => setPage(p => p + 1)} 
          disabled={loading}
          className="browser-nav-btn"
        >
          Вперед
        </button>
      </div>
    </div>
  );
}
