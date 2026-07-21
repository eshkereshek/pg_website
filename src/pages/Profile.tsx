import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SkinViewer, WalkingAnimation } from 'skinview3d';
import { useAuth, API_URL } from '../contexts/AuthContext';
import '../index.css';

export default function Profile() {
  const { user, token, logout, updateUser, isLoading } = useAuth();
  const navigate = useNavigate();
  const viewerRef = useRef<HTMLDivElement>(null);
  const [skinViewer, setSkinViewer] = useState<SkinViewer | null>(null);
  
  const [uploadingSkin, setUploadingSkin] = useState(false);
  const [uploadingCape, setUploadingCape] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
    }
  }, [user, isLoading, navigate]);

  useEffect(() => {
    if (viewerRef.current && !skinViewer && user) {
      const viewer = new SkinViewer({
        canvas: document.createElement('canvas'),
        width: 300,
        height: 400,
        skin: user.skinUrl || 'https://minotar.net/skin/Steve.png',
        cape: user.capeUrl || undefined
      });
      viewer.animation = new WalkingAnimation();
      viewerRef.current.appendChild(viewer.canvas);
      setSkinViewer(viewer);
    }
  }, [viewerRef, user, skinViewer]);

  useEffect(() => {
    if (skinViewer && user) {
      skinViewer.loadSkin(user.skinUrl || 'https://minotar.net/skin/Steve.png');
      if (user.capeUrl) {
        skinViewer.loadCape(user.capeUrl);
      } else {
        skinViewer.resetCape();
      }
    }
  }, [user, skinViewer]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'skin' | 'cape') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append(type, file);

    const setLoader = type === 'skin' ? setUploadingSkin : setUploadingCape;
    setLoader(true);

    try {
      const res = await axios.post(`${API_URL}/cosmetics/${type}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      
      // Update user context
      if (user) {
        updateUser({
          ...user,
          [type === 'skin' ? 'skinUrl' : 'capeUrl']: res.data[`${type}Url`]
        });
      }
    } catch (error) {
      console.error(`Failed to upload ${type}`, error);
      alert(`Ошибка загрузки ${type === 'skin' ? 'скина' : 'плаща'}`);
    } finally {
      setLoader(false);
      // Reset input
      e.target.value = '';
    }
  };

  const handleRemove = async (type: 'skin' | 'cape') => {
    try {
      await axios.delete(`${API_URL}/cosmetics/${type}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (user) {
        updateUser({
          ...user,
          [type === 'skin' ? 'skinUrl' : 'capeUrl']: null
        });
      }
    } catch (error) {
      console.error(`Failed to remove ${type}`, error);
    }
  };

  if (isLoading || !user) {
    return <div style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>Загрузка...</div>;
  }

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="nav-brand">
          <img src="/icon.png" alt="Pagrysha Launcher" />
          <span>Pagrysha Launcher</span>
        </Link>
        <div className="nav-links">
          <span style={{ color: '#fff', opacity: 0.7 }}>Привет, {user.username}!</span>
          <button onClick={logout} className="download-btn" style={{padding: '8px 15px', background: 'rgba(255,100,100,0.2)', color: '#ff6b6b'}}>Выйти</button>
        </div>
      </nav>

      <div className="profile-container">
        <h1 className="profile-title">Гардероб</h1>
        
        <div className="profile-grid">
          <div className="profile-viewer" ref={viewerRef}>
            {/* Skinview3D goes here */}
          </div>
          
          <div className="profile-controls">
            <div className="control-group">
              <h3>Ваш скин</h3>
              <p>Рекомендуемый размер 64x64 или 64x32 (PNG)</p>
              <div className="btn-row">
                <label className="upload-btn">
                  {uploadingSkin ? 'Загрузка...' : 'Загрузить скин'}
                  <input type="file" accept=".png" onChange={(e) => handleFileUpload(e, 'skin')} disabled={uploadingSkin} hidden />
                </label>
                {user.skinUrl && (
                  <button onClick={() => handleRemove('skin')} className="remove-btn">Удалить</button>
                )}
              </div>
            </div>
            
            <div className="control-group">
              <h3>Ваш плащ</h3>
              <p>Рекомендуемый размер 64x32 или 22x17 (PNG)</p>
              <div className="btn-row">
                <label className="upload-btn">
                  {uploadingCape ? 'Загрузка...' : 'Загрузить плащ'}
                  <input type="file" accept=".png" onChange={(e) => handleFileUpload(e, 'cape')} disabled={uploadingCape} hidden />
                </label>
                {user.capeUrl && (
                  <button onClick={() => handleRemove('cape')} className="remove-btn">Удалить</button>
                )}
              </div>
            </div>

            <div className="info-box">
              <p>💡 Чтобы другие игроки видели ваши скины, им необходимо установить мод <strong>PG Sync</strong>. Мод автоматически подхватит загруженные здесь текстуры.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
