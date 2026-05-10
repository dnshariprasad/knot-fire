import React, { useState } from 'react';
import { Lock, Unlock, CheckCircle2, Settings, Globe, Shield, Key, Copy } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCrypto } from '../../../context/CryptoContext';
import { useAuth } from '../../../context/AuthContext';
import { Modal } from '../../common/Modal';
import toast from 'react-hot-toast';
import * as S from './styles';

interface SettingsModalProps {
  onClose: () => void;
}

type TabType = 'general' | 'security';

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const { masterKey, setKey, generateRecoveryKey, saveRecoveryData } = useCrypto();
  
  const [activeTab, setActiveTab] = useState<TabType>('general');
  const [newKey, setNewKey] = useState('');
  const [recoveryKey, setRecoveryKey] = useState<string | null>(null);

  const handleSetKey = async () => {
    if (newKey.length < 4) {
      toast.error(t('security.keyTooShort') || 'Key must be at least 4 characters');
      return;
    }
    
    setKey(newKey);
    const generated = generateRecoveryKey();
    setRecoveryKey(generated);
    
    if (user) {
      // Temporarily set the key in context so saveRecoveryData can use it
      await saveRecoveryData(generated, user.uid);
    }
    
    setNewKey('');
    toast.success(t('security.keySetSuccess') || 'Master Key set successfully');
  };

  const copyRecoveryKey = () => {
    if (recoveryKey) {
      navigator.clipboard.writeText(recoveryKey);
      toast.success(t('common.copied') || 'Copied to clipboard');
    }
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={<><Settings size={20} /> {t('settings.title')}</>}
      data-testid="settings-modal"
    >
      <S.TabList>
        <S.Tab 
          $active={activeTab === 'general'} 
          onClick={() => setActiveTab('general')}
        >
          {t('settings.generalTab') || 'General'}
        </S.Tab>
        <S.Tab 
          $active={activeTab === 'security'} 
          onClick={() => setActiveTab('security')}
        >
          {t('settings.securityTab') || 'Security'}
        </S.Tab>
      </S.TabList>

      <S.Body>
        {activeTab === 'general' ? (
          <S.Section>
            <S.SectionTitle>
              <S.TitleIconWrapper>
                <Globe size={16} /> {t('settings.language')}
              </S.TitleIconWrapper>
            </S.SectionTitle>
            <S.DescriptionText>
              {t('settings.selectLanguage')}
            </S.DescriptionText>
            <S.LanguageGrid>
              <S.LanguageButton 
                $active={i18n.language === 'en'} 
                onClick={() => i18n.changeLanguage('en')}
              >
                <span>{t('settings.english')}</span>
                <span>English</span>
              </S.LanguageButton>
              <S.LanguageButton 
                $active={i18n.language === 'te'} 
                onClick={() => i18n.changeLanguage('te')}
              >
                <span>{t('settings.telugu')}</span>
                <span>తెలుగు</span>
              </S.LanguageButton>
              <S.LanguageButton 
                $active={i18n.language === 'hi'} 
                onClick={() => i18n.changeLanguage('hi')}
              >
                <span>{t('settings.hindi')}</span>
                <span>हिन्दी</span>
              </S.LanguageButton>
            </S.LanguageGrid>
          </S.Section>
        ) : (
          <S.SecurityList>
            <S.Section>
              <S.SectionTitle>
                <S.TitleIconWrapper>
                  <Shield size={16} /> {t('security.title')}
                </S.TitleIconWrapper>
              </S.SectionTitle>
              <S.DescriptionText $hasMargin>
                {t('security.keyDescription') || 'Set a Master Key to encrypt your private notes and todos.'}
              </S.DescriptionText>

              <S.StatusCard $active={!!masterKey}>
                <S.StatusIcon $active={!!masterKey}>
                  {masterKey ? <Unlock size={24} /> : <Lock size={24} />}
                </S.StatusIcon>
                <S.StatusText>
                  <span>{masterKey ? t('security.statusUnlocked') || 'Unlocked' : t('security.statusLocked') || 'Locked'}</span>
                  <span>{masterKey ? t('security.unlockedDesc') || 'Your session is active.' : t('security.lockedDesc') || 'Set or enter your key.'}</span>
                </S.StatusText>
                {masterKey && (
                  <S.SuccessIcon>
                    <CheckCircle2 size={20} />
                  </S.SuccessIcon>
                )}
              </S.StatusCard>

              <S.InlineFlex>
                <S.Input 
                  type="password" 
                  placeholder={t('security.newKeyPlaceholder') || 'Enter New Master Key'} 
                  value={newKey}
                  onChange={(e) => setNewKey(e.target.value)}
                />
                <S.Button $variant="primary" onClick={handleSetKey}>
                  <Key size={18} /> {t('security.setKey') || 'Set Key'}
                </S.Button>
              </S.InlineFlex>

              {recoveryKey && (
                <S.WarningBox style={{ background: '#ecfdf5', borderColor: '#10b981', color: '#065f46', marginTop: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{t('security.recoveryCode') || 'Recovery Code Generated!'}</p>
                    <p style={{ marginBottom: '1rem', fontSize: '0.75rem', opacity: 0.8 }}>{t('security.recoveryWarning') || 'Save this code somewhere safe. It is the only way to recover your data if you forget your Master Key.'}</p>
                    <S.InlineFlex style={{ background: 'rgba(0,0,0,0.05)', padding: '0.75rem', borderRadius: '8px', alignItems: 'center' }}>
                      <code style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '0.05em' }}>{recoveryKey}</code>
                      <S.IconButton onClick={copyRecoveryKey} style={{ marginLeft: 'auto' }}>
                        <Copy size={16} />
                      </S.IconButton>
                    </S.InlineFlex>
                  </div>
                </S.WarningBox>
              )}
            </S.Section>
          </S.SecurityList>
        )}
      </S.Body>
    </Modal>
  );
};
