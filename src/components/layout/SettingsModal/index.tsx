import React, { useState } from 'react';
import { ShieldAlert, Lock, Unlock, CheckCircle2, Settings, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCrypto } from '../../../context/CryptoContext';
import { Modal } from '../../common/Modal';
import toast from 'react-hot-toast';
import * as S from './styles';

interface SettingsModalProps {
  onClose: () => void;
}

type TabType = 'general' | 'security';

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  const { t, i18n } = useTranslation();
  const { masterKey, setKey, clearKey, setSkipped } = useCrypto();
  const [activeTab, setActiveTab] = useState<TabType>('general');
  const [newKey, setNewKey] = useState('');
  const [isEnabling, setIsEnabling] = useState(false);

  const handleEnable = () => {
    if (newKey.length < 4) {
      toast.error(t('security.keyTooShort'));
      return;
    }
    setKey(newKey);
    toast.success(t('security.enableSuccess'));
    setIsEnabling(false);
    setNewKey('');
  };

  const handleDisable = () => {
    if (window.confirm(t('security.disableConfirm'))) {
      clearKey();
      setSkipped(true);
      toast.success(t('security.disableSuccess'));
    }
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={<><Settings size={20} /> {t('settings.title')}</>}
    >
      <S.TabList>
        <S.Tab 
          $active={activeTab === 'general'} 
          onClick={() => setActiveTab('general')}
        >
          {t('settings.general')}
        </S.Tab>
        <S.Tab 
          $active={activeTab === 'security'} 
          onClick={() => setActiveTab('security')}
        >
          {t('settings.security')}
        </S.Tab>
      </S.TabList>

      <div style={{ marginTop: '1.5rem' }}>
        {activeTab === 'general' ? (
          <S.Section>
            <S.SectionTitle>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Globe size={16} /> {t('settings.language')}
              </div>
            </S.SectionTitle>
            <p style={{ fontSize: '0.8125rem', color: '#64748b' }}>
              {t('settings.selectLanguage')}
            </p>
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
            </S.LanguageGrid>
          </S.Section>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <S.Section>
              <S.SectionTitle>{t('security.encryptionStatus')}</S.SectionTitle>
              <S.StatusCard $active={!!masterKey}>
                <S.StatusIcon $active={!!masterKey}>
                  {masterKey ? <Lock size={24} /> : <Unlock size={24} />}
                </S.StatusIcon>
                <S.StatusText>
                  <span>{masterKey ? t('security.statusActive') : t('security.statusDisabled')}</span>
                  <span>{masterKey ? t('security.statusActiveDesc') : t('security.statusDisabledDesc')}</span>
                </S.StatusText>
                {masterKey && <CheckCircle2 size={20} color="#10b981" style={{ marginLeft: 'auto' }} />}
              </S.StatusCard>
            </S.Section>

            {masterKey ? (
              <S.Section>
                <S.WarningBox>
                  <ShieldAlert size={18} style={{ flexShrink: 0 }} />
                  <div>{t('security.disableWarning')}</div>
                </S.WarningBox>
                <S.Button $variant="danger" onClick={handleDisable}>
                  {t('security.disableButton')}
                </S.Button>
              </S.Section>
            ) : isEnabling ? (
              <S.Section>
                <S.SectionTitle>{t('security.setMasterKey')}</S.SectionTitle>
                <p style={{ fontSize: '0.8125rem', color: '#64748b' }}>
                  {t('security.keyDescription')}
                </p>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <S.Input 
                    type="password" 
                    placeholder={t('security.keyPlaceholder')} 
                    value={newKey}
                    onChange={(e) => setNewKey(e.target.value)}
                    autoFocus
                  />
                  <S.Button $variant="primary" onClick={handleEnable}>{t('security.enableButton')}</S.Button>
                </div>
                <S.Button $variant="outline" onClick={() => setIsEnabling(false)}>{t('common.cancel')}</S.Button>
              </S.Section>
            ) : (
              <S.Button $variant="primary" onClick={() => setIsEnabling(true)}>
                {t('security.enableEncryptionButton')}
              </S.Button>
            )}

            <S.Section>
              <S.SectionTitle>{t('security.whatIsE2ee')}</S.SectionTitle>
              <p style={{ fontSize: '0.8125rem', color: '#64748b', lineHeight: 1.6 }}>
                {t('security.e2eeDescription')}
              </p>
            </S.Section>
          </div>
        )}
      </div>
    </Modal>
  );
};
