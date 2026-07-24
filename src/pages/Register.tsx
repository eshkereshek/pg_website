import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../contexts/AuthContext';
import '../index.css';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await axios.post(`${API_URL}/auth/register`, { username, password });
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Ошибка при регистрации');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="nav-brand">
          <img src="/newicon.png" alt="Pagrysha Launcher" />
          <span>Pagrysha Launcher</span>
        </Link>
        <div className="nav-links">
          <Link to="/download">Скачать</Link>
          <Link to="/login" className="nav-btn">Войти</Link>
        </div>
      </nav>

      <div className="auth-page">
        <div className="auth-container">
        <div className="auth-card">
          <h2>Регистрация</h2>
          <p>Создайте аккаунт для экосистемы Pagrysha</p>
          
          {error && <div className="auth-error">{error}</div>}
          
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group">
              <label>Никнейм в игре</label>
              <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required 
                placeholder="Minecraft Username"
              />
            </div>
            <div className="input-group">
              <label>Пароль</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                placeholder="Придумайте пароль"
              />
            </div>
            <button type="submit" className="nav-btn auth-submit" disabled={loading} style={{ justifyContent: 'center' }}>
              {loading ? 'Создание...' : 'Зарегистрироваться'}
            </button>
          </form>
          
          <div className="auth-footer">
            Уже есть аккаунт? <Link to="/login">Войти</Link>
            <p style={{ fontSize: '11px', color: '#777', marginTop: '15px', lineHeight: '1.4' }}>
              Регистрируясь, вы принимаете <Link to="/terms" style={{ color: '#aaa', textDecoration: 'underline' }}>пользовательское соглашение</Link> и <Link to="/privacy" style={{ color: '#aaa', textDecoration: 'underline' }}>политику конфиденциальности</Link>.
            </p>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}
