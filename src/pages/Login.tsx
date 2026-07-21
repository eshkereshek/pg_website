import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth, API_URL } from '../contexts/AuthContext';
import '../index.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/auth/login`, { username, password });
      login(res.data.token, res.data.user);
      navigate('/profile');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Ошибка авторизации');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="nav-brand">
          <img src="/icon.png" alt="Pagrysha Launcher" />
          <span>Pagrysha Launcher</span>
        </Link>
        <div className="nav-links">
          <Link to="/download">Скачать</Link>
          <Link to="/register" className="nav-btn">Регистрация</Link>
        </div>
      </nav>

      <div className="auth-container">
        <div className="auth-card">
          <h2>Вход в аккаунт</h2>
          <p>Управляйте своими скинами и плащами</p>
          
          {error && <div className="auth-error">{error}</div>}
          
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group">
              <label>Никнейм в игре</label>
              <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required 
                placeholder="Steve"
              />
            </div>
            <div className="input-group">
              <label>Пароль</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                placeholder="••••••••"
              />
            </div>
            <button type="submit" className="download-btn auth-submit" disabled={loading}>
              {loading ? 'Вход...' : 'Войти'}
            </button>
          </form>
          
          <div className="auth-footer">
            Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
          </div>
        </div>
      </div>
    </>
  );
}
