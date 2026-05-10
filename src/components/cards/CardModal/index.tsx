import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  X, CreditCard, Shield, Trash2, Plus, Minus, Edit2, 
  MoreVertical, Share2, Hash 
} from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useCrypto } from '../../../context/CryptoContext';
import { LockScreen } from '../../layout/LockScreen';
import toast from 'react-hot-toast';
import type { Card, SharedUser } from '../../../types';
import * as S from './styles';
import { AnimatePresence } from 'framer-motion';

const ShareModal = lazy(() => import('../../notes/ShareModal').then(m => ({ default: m.ShareModal })));

const COMMON_BANKS = [
  'HDFC Bank', 'SBI', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra', 
  'IDFC First', 'IndusInd Bank', 'Canara Bank', 'Bank of Baroda', 
  'Standard Chartered', 'American Express', 'HSBC', 'DBS'
];

interface CardModalProps {
  card?: Card | null;
  allTags: string[];
  onClose: () => void;
  onSave: (card: Partial<Card>) => void;
  onDelete: (id: string) => void;
  onShare: (sharedWith: SharedUser[]) => void;
}

export const CardModal: React.FC<CardModalProps> = ({ 
  card, 
  allTags,
  onClose, 
  onSave, 
  onDelete,
  onShare
}) => {
  const { t } = useTranslation();
  const { masterKey, setKey } = useCrypto();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isEditing, setIsEditing] = useState(!card);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const isLocked = card && !isUnlocked;

  const [formData, setFormData] = useState<Partial<Card>>({
    name: '',
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    pin: '',
    type: 'credit',
    network: 'visa',
    bankName: '',
    billingDate: 1,
    dueDate: 15,
    limit: 0,
    benefits: [],
    tags: [],
    isEncrypted: true
  });

  const [newBenefit, setNewBenefit] = useState('');
  const [newTag, setNewTag] = useState('');

  const filteredSuggestions = useMemo(() => {
    const query = newTag.trim().toLowerCase();
    if (!query) return [];
    return allTags.filter(tag => 
      tag.toLowerCase().includes(query) && 
      !(formData.tags || []).includes(tag)
    );
  }, [allTags, newTag, formData.tags]);

  useEffect(() => {
    if (card) {
      setFormData(card);
    }
  }, [card]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onSave(formData);
  };

  const addBenefit = () => {
    if (newBenefit.trim()) {
      setFormData(prev => ({
        ...prev,
        benefits: [...(prev.benefits || []), newBenefit.trim()]
      }));
      setNewBenefit('');
    }
  };

  const removeBenefit = (index: number) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits?.filter((_, i) => i !== index)
    }));
  };

  const addTag = () => {
    const val = newTag.trim().toLowerCase();
    if (val && !(formData.tags || []).includes(val)) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), val]
      }));
      setNewTag('');
      setShowSuggestions(false);
    }
  };

  return (
    <AnimatePresence>
      <S.Overlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <S.Modal
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          <S.Header>
            <S.Title>
              <CreditCard size={24} />
              {card ? (isEditing ? t('cards.editCard') : t('cards.viewCard')) : t('cards.newCard')}
            </S.Title>
            <S.HeaderActions>
              {card && !isEditing && (
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <S.MoreButton>
                      <MoreVertical size={20} />
                    </S.MoreButton>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Portal>
                    <S.DropdownContent sideOffset={5}>
                      <S.DropdownItem onSelect={() => setShowShareModal(true)}>
                        <Share2 size={16} /> {t('common.share')}
                      </S.DropdownItem>
                      <DropdownMenu.Separator style={{ height: 1, backgroundColor: 'rgba(0,0,0,0.1)', margin: '4px 0' }} />
                      <S.DropdownItem onSelect={() => onDelete(card.id)} className="danger">
                        <Trash2 size={16} /> {t('common.delete')}
                      </S.DropdownItem>
                    </S.DropdownContent>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
              )}

              {isEditing ? (
                <S.ActionButton $variant="primary" onClick={() => handleSubmit()}>
                  {t('common.save')}
                </S.ActionButton>
              ) : (
                <S.ActionButton $variant="primary" onClick={() => setIsEditing(true)}>
                  <Edit2 size={18} /> {t('common.edit')}
                </S.ActionButton>
              )}
              
              <S.CloseButton onClick={onClose}>
                <X size={24} />
              </S.CloseButton>
            </S.HeaderActions>
          </S.Header>

          {isLocked ? (
            <div style={{ padding: '3rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '350px' }}>
              <LockScreen 
                onUnlock={(enteredKey) => {
                  if (!masterKey) {
                    setKey(enteredKey);
                    setIsUnlocked(true);
                  } else if (enteredKey === masterKey) {
                    setIsUnlocked(true);
                  } else {
                    toast.error('Invalid Master Key');
                  }
                }} 
                onSkip={onClose} 
              />
            </div>
          ) : isEditing ? (
            <>
              <S.Body>
                <S.FormGroup>
                  <S.Label>{t('cards.cardName')}</S.Label>
                  <S.Input 
                    placeholder="e.g. Personal Credit Card"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                </S.FormGroup>

                <S.Grid>
                  <S.FormGroup>
                    <S.Label>{t('cards.cardType')}</S.Label>
                    <S.Select 
                      value={formData.type}
                      onChange={e => setFormData({ ...formData, type: e.target.value as 'credit' | 'debit' })}
                    >
                      <option value="credit">Credit Card</option>
                      <option value="debit">Debit Card</option>
                    </S.Select>
                  </S.FormGroup>
                  <S.FormGroup>
                    <S.Label>{t('cards.network')}</S.Label>
                    <S.Select 
                      value={formData.network}
                      onChange={e => setFormData({ ...formData, network: e.target.value as any })}
                    >
                      <option value="visa">Visa</option>
                      <option value="mastercard">Mastercard</option>
                      <option value="amex">American Express</option>
                      <option value="discover">Discover</option>
                      <option value="rupay">RuPay</option>
                    </S.Select>
                  </S.FormGroup>
                </S.Grid>

                <S.FormGroup>
                  <S.Label>{t('cards.bankName')}</S.Label>
                  <S.Select 
                    value={formData.bankName}
                    onChange={e => setFormData({ ...formData, bankName: e.target.value })}
                  >
                    <option value="">Select Bank</option>
                    {COMMON_BANKS.map(bank => (
                      <option key={bank} value={bank}>{bank}</option>
                    ))}
                  </S.Select>
                </S.FormGroup>

                <S.FormGroup>
                  <S.Label>{t('cards.cardholderName')}</S.Label>
                  <S.Input 
                    placeholder="Name as on card"
                    value={formData.cardholderName}
                    onChange={e => setFormData({ ...formData, cardholderName: e.target.value })}
                  />
                </S.FormGroup>

                <S.FormGroup>
                  <S.Label>{t('cards.cardNumber')}</S.Label>
                  <S.Input 
                    placeholder="0000 0000 0000 0000"
                    value={formData.cardNumber}
                    onChange={e => setFormData({ ...formData, cardNumber: e.target.value })}
                  />
                </S.FormGroup>

                <S.Grid>
                  <S.FormGroup>
                    <S.Label>{t('cards.expiryDate')}</S.Label>
                    <S.Input 
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={e => setFormData({ ...formData, expiryDate: e.target.value })}
                    />
                  </S.FormGroup>
                  <S.FormGroup>
                    <S.Label>{t('cards.cvv')}</S.Label>
                    <S.Input 
                      type="password"
                      placeholder="***"
                      maxLength={4}
                      value={formData.cvv}
                      onChange={e => setFormData({ ...formData, cvv: e.target.value })}
                    />
                  </S.FormGroup>
                </S.Grid>

                {formData.type === 'credit' && (
                  <S.Grid>
                    <S.FormGroup>
                      <S.Label>{t('cards.billingDate')}</S.Label>
                      <S.Input 
                        type="number"
                        min={1}
                        max={31}
                        value={formData.billingDate}
                        onChange={e => setFormData({ ...formData, billingDate: parseInt(e.target.value) })}
                      />
                    </S.FormGroup>
                    <S.FormGroup>
                      <S.Label>{t('cards.dueDate')}</S.Label>
                      <S.Input 
                        type="number"
                        min={1}
                        max={31}
                        value={formData.dueDate}
                        onChange={e => setFormData({ ...formData, dueDate: parseInt(e.target.value) })}
                      />
                    </S.FormGroup>
                  </S.Grid>
                )}

                {formData.type === 'credit' && (
                  <S.CreditFields
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                  >
                    <S.FormGroup>
                      <S.Label>{t('cards.limit')}</S.Label>
                      <S.Input 
                        type="number"
                        placeholder="Total Limit"
                        value={formData.limit}
                        onChange={e => setFormData({ ...formData, limit: parseInt(e.target.value) })}
                      />
                    </S.FormGroup>

                    <S.FormGroup>
                      <S.Label>{t('cards.benefits')}</S.Label>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <S.Input 
                          placeholder={t('cards.newBenefitPlaceholder')}
                          value={newBenefit}
                          onChange={e => setNewBenefit(e.target.value)}
                          onKeyPress={e => e.key === 'Enter' && addBenefit()}
                        />
                        <S.Button onClick={addBenefit}><Plus size={18} /> {t('common.add')}</S.Button>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                        {formData.benefits?.map((benefit, i) => (
                          <S.BenefitItem key={i}>
                            <div style={{ flex: 1 }}>{benefit}</div>
                            <S.IconButton onClick={() => removeBenefit(i)}>
                              <Minus size={16} />
                            </S.IconButton>
                          </S.BenefitItem>
                        ))}
                      </div>
                    </S.FormGroup>
                  </S.CreditFields>
                )}

                <S.FormGroup>
                  <S.Label>{t('notes.tagsLabel')}</S.Label>
                  <div style={{ position: 'relative', display: 'flex', gap: '0.5rem' }}>
                    <S.Input 
                      placeholder={t('cards.addTag')}
                      value={newTag}
                      onChange={e => {
                        setNewTag(e.target.value);
                        setShowSuggestions(true);
                      }}
                      onKeyDown={e => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          if (showSuggestions && filteredSuggestions.length > 0) {
                            const tag = filteredSuggestions[selectedIndex];
                            if (!(formData.tags || []).includes(tag)) {
                              setFormData(prev => ({ ...prev, tags: [...(prev.tags || []), tag] }));
                            }
                            setNewTag('');
                            setShowSuggestions(false);
                          } else {
                            addTag();
                          }
                        } else if (e.key === 'ArrowDown') {
                          setSelectedIndex(prev => (prev + 1) % filteredSuggestions.length);
                        } else if (e.key === 'ArrowUp') {
                          setSelectedIndex(prev => (prev - 1 + filteredSuggestions.length) % filteredSuggestions.length);
                        } else if (e.key === 'Escape') {
                          setShowSuggestions(false);
                        }
                      }}
                      onFocus={() => setShowSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    />

                    {showSuggestions && newTag && filteredSuggestions.length > 0 && (
                      <S.SuggestionsContainer>
                        {filteredSuggestions.map((tag: string, idx: number) => (
                          <S.SuggestionItem 
                            key={tag}
                            $selected={idx === selectedIndex}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              if (!(formData.tags || []).includes(tag)) {
                                setFormData(prev => ({ ...prev, tags: [...(prev.tags || []), tag] }));
                              }
                              setNewTag('');
                              setShowSuggestions(false);
                            }}
                            onMouseEnter={() => setSelectedIndex(idx)}
                          >
                            <Hash size={12} /> {tag}
                          </S.SuggestionItem>
                        ))}
                      </S.SuggestionsContainer>
                    )}
                    <S.Button onClick={addTag}><Plus size={18} /> {t('common.add')}</S.Button>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.75rem' }}>
                    {formData.tags?.map(tag => (
                      <S.BenefitItem key={tag} style={{ padding: '0.375rem 0.75rem', borderRadius: '10px' }}>
                        <Hash size={12} /> {tag}
                        <S.IconButton onClick={() => setFormData(prev => ({ ...prev, tags: prev.tags?.filter(t => t !== tag) }))}>
                          <X size={12} />
                        </S.IconButton>
                      </S.BenefitItem>
                    ))}
                  </div>
                </S.FormGroup>
              </S.Body>

              <S.Footer>
                <S.Button $variant="ghost" onClick={card ? () => setIsEditing(false) : onClose}>{t('common.cancel')}</S.Button>
                <S.Button $variant="primary" onClick={() => handleSubmit()}>
                  <Shield size={18} /> {t('cards.saveSecurely')}
                </S.Button>
              </S.Footer>
            </>
          ) : (
            <>
              <S.Body>
                <S.PreviewCard $network={formData.network || 'visa'}>
                  <S.BankName>{formData.bankName || 'Knot Bank'}</S.BankName>
                  <S.TypeBadge $type={formData.type || 'credit'}>{formData.type}</S.TypeBadge>
                  <S.Chip />
                  <S.CardNumber>{formData.cardNumber}</S.CardNumber>
                  <S.CardInfo>
                    <div>
                      <S.Label style={{ color: 'rgba(255,255,255,0.7)' }}>{t('cards.cardholderName')}</S.Label>
                      <S.Value style={{ color: 'white' }}>{formData.cardholderName}</S.Value>
                    </div>
                    <div>
                      <S.Label style={{ color: 'rgba(255,255,255,0.7)' }}>{t('cards.expiryDate')}</S.Label>
                      <S.Value style={{ color: 'white' }}>{formData.expiryDate}</S.Value>
                    </div>
                    <S.NetworkLogo>{formData.network?.toUpperCase()}</S.NetworkLogo>
                  </S.CardInfo>
                </S.PreviewCard>

                <S.Grid style={{ marginTop: '1.5rem' }}>
                  <S.FormGroup>
                    <S.Label>{t('cards.cvv')}</S.Label>
                    <S.ViewValue>***</S.ViewValue>
                  </S.FormGroup>
                  {formData.type === 'credit' && (
                    <S.FormGroup>
                      <S.Label>{t('cards.limit')}</S.Label>
                      <S.ViewValue>${formData.limit?.toLocaleString()}</S.ViewValue>
                    </S.FormGroup>
                  )}
                </S.Grid>

                {formData.type === 'credit' && (
                  <S.Grid>
                    <S.FormGroup>
                      <S.Label>{t('cards.billingDate')}</S.Label>
                      <S.ViewValue>{formData.billingDate}</S.ViewValue>
                    </S.FormGroup>
                    <S.FormGroup>
                      <S.Label>{t('cards.dueDate')}</S.Label>
                      <S.ViewValue>{formData.dueDate}</S.ViewValue>
                    </S.FormGroup>
                  </S.Grid>
                )}

                {formData.benefits && formData.benefits.length > 0 && (
                  <S.FormGroup>
                    <S.Label>{t('cards.benefits')}</S.Label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                      {formData.benefits.map((benefit, i) => (
                        <S.BenefitItem key={i}>
                          {benefit}
                        </S.BenefitItem>
                      ))}
                    </div>
                  </S.FormGroup>
                )}
                
                {formData.tags && formData.tags.length > 0 && (
                  <S.FormGroup>
                    <S.Label>{t('notes.tagsLabel')}</S.Label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                      {formData.tags.map(tag => (
                        <S.BenefitItem key={tag} style={{ padding: '0.375rem 0.75rem', borderRadius: '10px' }}>
                          <Hash size={12} /> {tag}
                        </S.BenefitItem>
                      ))}
                    </div>
                  </S.FormGroup>
                )}
              </S.Body>
            </>
          )}
        </S.Modal>
      </S.Overlay>
      
      {showShareModal && card && (
        <Suspense fallback={null}>
          <ShareModal
            item={card}
            onClose={() => setShowShareModal(false)}
            onShare={onShare}
          />
        </Suspense>
      )}
    </AnimatePresence>
  );
};
