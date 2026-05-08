import React, { useState } from 'react';
import { Lock, Unlock, CheckCircle2, Settings, Globe } from 'lucide-react';
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

      <S.ContentWrapper>
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
            </S.LanguageGrid>
          </S.Section>
        ) : (
          <S.SecurityList>
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
                {masterKey && (
                  <S.SuccessIcon>
                    <CheckCircle2 size={20} />
                  </S.SuccessIcon>
                )}
              </S.StatusCard>
            </S.Section>

            {masterKey ? (
              <S.Section>
                <S.WarningBox>
                  <S.WarningIcon size={18} />
                  <div>{t('security.disableWarning')}</div>
                </S.WarningBox>
                <S.Button $variant="danger" onClick={handleDisable}>
                  {t('security.disableButton')}
                </S.Button>
              </S.Section>
            ) : isEnabling ? (
              <S.Section>
                <S.SectionTitle>{t('security.setMasterKey')}</S.SectionTitle>
                <S.DescriptionText>
                  {t('security.keyDescription')}
                </S.DescriptionText>
                <S.InlineFlex>
                  <S.Input 
                    type="password" 
                    placeholder={t('security.keyPlaceholder')} 
                    value={newKey}
                    onChange={(e) => setNewKey(e.target.value)}
                    autoFocus
                  />
                  <S.Button $variant="primary" onClick={handleEnable}>{t('security.enableButton')}</S.Button>
                </S.InlineFlex>
                <S.Button $variant="outline" onClick={() => setIsEnabling(false)}>{t('common.cancel')}</S.Button>
              </S.Section>
            ) : (
              <S.Button $variant="primary" onClick={() => setIsEnabling(true)}>
                {t('security.enableEncryptionButton')}
              </S.Button>
            )}

            <S.Section>
              <S.SectionTitle>{t('security.whatIsE2ee')}</S.SectionTitle>
              <S.DescriptionText>
                {t('security.e2eeDescription')}
              </S.DescriptionText>
            </S.Section>
          </S.SecurityList>
        )}
      </S.ContentWrapper>
    </Modal>
  );
};
