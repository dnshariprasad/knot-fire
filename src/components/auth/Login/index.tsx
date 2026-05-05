import React, { useState } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import { auth } from '../../../firebase';
import { LogIn, UserPlus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import * as S from './styles';

export const Login: React.FC = () => {
  const { t } = useTranslation();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
 
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <S.Container>
      <S.Card
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <img src="/favicon.svg" alt={t('app.logoAlt')} width="64" height="64" />
        </div>
        <S.Title>{t('app.title')}</S.Title>
        <S.Subtitle>{isLogin ? t('auth.welcomeBack') : t('auth.createAccount')}</S.Subtitle>

        <S.Form onSubmit={handleSubmit}>
          <S.InputGroup>
            <S.Label>{t('auth.emailAddress')}</S.Label>
            <S.Input 
              type="email" 
              placeholder="name@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </S.InputGroup>
          <S.InputGroup>
            <S.Label>{t('auth.password')}</S.Label>
            <S.Input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </S.InputGroup>

          <S.Button type="submit" disabled={loading}>
            {loading ? t('common.processing') : (isLogin ? <><LogIn size={18} /> {t('auth.signIn')}</> : <><UserPlus size={18} /> {t('auth.signUp')}</>)}
          </S.Button>
        </S.Form>

        <S.Divider><span>{t('common.or')}</span></S.Divider>

        <S.Button 
          type="button" 
          $variant="outline" 
          onClick={handleGoogleLogin}
          style={{ width: '100%' }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path
              fill="#4285F4"
              d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"
            />
            <path
              fill="#34A853"
              d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"
            />
            <path
              fill="#FBBC05"
              d="M3.964 10.712c-.18-.54-.282-1.117-.282-1.712s.102-1.173.282-1.712V4.956H.957a8.996 8.996 0 000 8.088l3.007-2.332z"
            />
            <path
              fill="#EA4335"
              d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.582C13.463.891 11.426 0 9 0 5.483 0 2.443 2.043.957 4.956L3.964 7.29c.708-2.127 2.692-3.71 5.036-3.71z"
            />
          </svg>
          {t('auth.continueWithGoogle')}
        </S.Button>

        {error && <S.ErrorMsg>{error}</S.ErrorMsg>}

        <S.ToggleText>
          {isLogin ? t('auth.noAccount') : t('auth.hasAccount')}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? t('auth.signUp') : t('auth.signIn')}
          </span>
        </S.ToggleText>
      </S.Card>
    </S.Container>
  );
};
