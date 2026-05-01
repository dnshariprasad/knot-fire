import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import { auth } from '../../firebase';
import { LogIn, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.background};
`;

const Card = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  padding: 2.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  width: 100%;
  max-width: 400px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  text-align: center;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.surfaceLight};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}33;
  }
`;

const Button = styled.button<{ $variant?: 'primary' | 'outline' }>`
  padding: 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  background: ${({ theme, $variant }) => $variant === 'outline' ? 'transparent' : theme.colors.primary};
  color: white;
  border: ${({ theme, $variant }) => $variant === 'outline' ? `1px solid ${theme.colors.border}` : 'none'};

  &:hover {
    background: ${({ theme, $variant }) => $variant === 'outline' ? theme.colors.surfaceLight : theme.colors.primaryDark};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.75rem;

  &::before, &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${({ theme }) => theme.colors.border};
  }

  span {
    padding: 0 0.75rem;
  }
`;

const ToggleText = styled.p`
  margin-top: 1.5rem;
  font-size: 0.875rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};

  span {
    color: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
    font-weight: 600;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorMsg = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.875rem;
  text-align: center;
  margin-top: 1rem;
`;

export const Login: React.FC = () => {
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
    <Container>
      <Card
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <img src="/favicon.svg" alt="Knot Logo" width="64" height="64" />
        </div>
        <Title>Knot</Title>
        <Subtitle>{isLogin ? 'Welcome back!' : 'Create your account'}</Subtitle>

        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label>Email Address</Label>
            <Input 
              type="email" 
              placeholder="name@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup>
            <Label>Password</Label>
            <Input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputGroup>

          <Button type="submit" disabled={loading}>
            {loading ? 'Processing...' : (isLogin ? <><LogIn size={18} /> Sign In</> : <><UserPlus size={18} /> Sign Up</>)}
          </Button>
        </Form>

        <Divider><span>OR</span></Divider>

        <Button 
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
          Continue with Google
        </Button>

        {error && <ErrorMsg>{error}</ErrorMsg>}

        <ToggleText>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign Up' : 'Sign In'}
          </span>
        </ToggleText>
      </Card>
    </Container>
  );
};
