import React from 'react';
import { useTranslation } from 'react-i18next';
import { Lock } from 'lucide-react';
import type { Card } from '../../../types';
import * as S from './styles';

interface CardCardProps {
  card: Card;
  onClick: () => void;
}

export const CardCard: React.FC<CardCardProps> = ({ card, onClick }) => {
  const { t } = useTranslation();

  const formatCardNumber = () => {
    // Show only last 4 digits even if encrypted (optional, but here we mask all)
    return '•••• •••• •••• ••••';
  };

  return (
    <S.CardContainer 
      $network={card.network} 
      onClick={onClick}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <S.BankName>{card.bankName || 'Knot Bank'}</S.BankName>
      <S.TypeBadge $type={card.type}>{card.type}</S.TypeBadge>
      
      <S.Chip />
      
      <S.CardNumber>{formatCardNumber()}</S.CardNumber>
      
      <S.CardInfo>
        <div>
          <S.Label>{t('cards.cardholderName')}</S.Label>
          <S.Value>{card.cardholderName}</S.Value>
        </div>
        <div>
          <S.Label>{t('cards.expiryDate')}</S.Label>
          <S.Value>{card.expiryDate?.length > 10 ? '••••' : card.expiryDate}</S.Value>
        </div>
        <S.NetworkLogo>{card.network.toUpperCase()}</S.NetworkLogo>
      </S.CardInfo>

      {card.isEncrypted && (
        <S.PrivateOverlay>
          <S.PrivateBadge>
            <Lock size={14} />
            {t('common.shared') === 'Shared' ? 'Secure Card' : t('security.statusActive')}
          </S.PrivateBadge>
        </S.PrivateOverlay>
      )}
    </S.CardContainer>
  );
};
