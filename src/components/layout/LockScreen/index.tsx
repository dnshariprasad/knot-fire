import React, { useState } from 'react';
import { Unlock, Shield, Key, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import * as S from './styles';

interface LockScreenProps {
  onUnlock: (key: string) => void;
  onSkip?: () => void;
}

export const LockScreen: React.FC<LockScreenProps> = ({ onUnlock, onSkip }) => {
  const { t } = useTranslation();
  const [inputKey, setInputKey] = useState('');

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputKey.length >= 4) {
      onUnlock(inputKey);
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
