import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../api/authApi';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

function Register() {
  const navigate = useNavigate();
  const { login, isAuthenticated, loading: authLoading } = useAuth();
  const { t } = useLanguage();
  const [form, setForm] = useState({
    email: '',
    nickname: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [authLoading, isAuthenticated, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const email = form.email.trim();
    const nickname = form.nickname.trim();

    if (!email || !nickname || !form.password || !form.confirmPassword) {
      setError('Email, nickname, password, and password confirmation are required.');
      return;
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Password and confirmation do not match.');
      return;
    }

    setLoading(true);

    try {
      const data = await authApi.register({
        email,
        nickname,
        password: form.password,
      });
      login(data);
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Register failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>{t('register')}</h1>

        <label>
          Nickname
          <input
            type="text"
            value={form.nickname}
            onChange={(event) => setForm((prev) => ({ ...prev, nickname: event.target.value }))}
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={form.password}
            onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
            minLength={6}
            required
          />
        </label>

        <label>
          Confirm Password
          <input
            type="password"
            value={form.confirmPassword}
            onChange={(event) => setForm((prev) => ({ ...prev, confirmPassword: event.target.value }))}
            minLength={6}
            required
          />
        </label>

        {error && <p className="page-error">{error}</p>}

        <button type="submit" className="button-primary" disabled={loading}>
          {loading ? t('loading') : t('register')}
        </button>

        <p>
          Already registered? <Link to="/login">{t('login')}</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
