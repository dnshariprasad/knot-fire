import React, { useState } from 'react';
import { Unlock, Shield, Key, ChevronRight, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCrypto } from '../../../context/CryptoContext';
import { useAuth } from '../../../context/AuthContext';
import toast from 'react-hot-toast';
import * as S from './styles';

interface LockScreenProps {
  onUnlock: (key: string) => void;
  onSkip?: () => void;
}

export const LockScreen: React.FC<LockScreenProps> = ({ onUnlock, onSkip }) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { recoverMasterKey } = useCrypto();
  
  const [inputKey, setInputKey] = useState('');
  const [isRecovering, setIsRecovering] = useState(false);
  const [recoveryCode, setRecoveryCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputKey.length >= 4) {
      onUnlock(inputKey);
    }
  };

  const handleRecover = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsLoading(true);
    const recovered = await recoverMasterKey(recoveryCode, user.uid);
    setIsLoading(false);
    
    if (recovered) {
      toast.success(t('security.recoverySuccess') || 'Master Key recovered!');
      onUnlock(recovered);
    } else {
      toast.error(t('security.recoveryFailed') || 'Invalid recovery code');
    }
  };

  return (
    <S.LockOverlay>
      <S.LockCard>
        <S.IconWrapper>
          <Shield size={32} />
        </S.IconWrapper>
        <S.ViewHeader>
          <S.LockTitle>{t('security.lockTitle')}</S.LockTitle>
          <S.LockDesc>{t('security.lockDescription')}</S.LockDesc>
        </S.ViewHeader>
        
        {!isRecovering ? (
          <>
            <S.UnlockForm onSubmit={handleUnlock}>
              <S.KeyInput 
                type="password" 
                placeholder={t('security.keyPlaceholder')} 
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                autoFocus
              />
              <S.UnlockButton type="submit">
                <Key size={18} /> {t('security.unlockData')}
              </S.UnlockButton>
            </S.UnlockForm>
            <S.ForgotButton onClick={() => setIsRecovering(true)}>
              {t('security.forgotKey') || 'Forgot Master Key?'}
            </S.ForgotButton>
          </>
        ) : (
          <S.RecoveryContainer>
            <S.LockDesc>{t('security.recoveryInstruction') || 'Enter your 16-character recovery code to retrieve your Master Key.'}</S.LockDesc>
            <S.UnlockForm onSubmit={handleRecover}>
              <S.KeyInput 
                type="text" 
                placeholder="XXXX-XXXX-XXXX-XXXX" 
                value={recoveryCode}
                onChange={(e) => setRecoveryCode(e.target.value.toUpperCase())}
                autoFocus
              />
              <S.UnlockButton type="submit" disabled={isLoading}>
                {isLoading ? <RefreshCw className="animate-spin" size={18} /> : <Unlock size={18} />}
                {t('security.recoverKey') || 'Recover Master Key'}
              </S.UnlockButton>
            </S.UnlockForm>
            <S.ForgotButton onClick={() => setIsRecovering(false)}>
              {t('common.back') || 'Back'}
            </S.ForgotButton>
          </S.RecoveryContainer>
        )}

        {onSkip && (
          <S.SkipButton onClick={onSkip}>
            {t('security.proceedWithoutEncryption')} <ChevronRight size={14} />
          </S.SkipButton>
        )}

        <S.SecurityBadge>
          <Unlock size={12} /> {t('security.encryptionActive')}
        </S.SecurityBadge>
      </S.LockCard>
    </S.LockOverlay>
  );
};
