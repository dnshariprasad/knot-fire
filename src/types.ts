export interface CustomField {
  label: string;
  value: string;
}

export interface SharedUser {
  userId: string;
  email: string;
  permission: 'read' | 'write';
}

export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  customFields: CustomField[];
  createdAt: number;
  updatedAt: number;
  userId: string;
  isEncrypted?: boolean;
  isPrivate?: boolean;
  pin?: string;
  sharedWith?: SharedUser[];
  sharedWithUids?: string[];
  ownerEmail?: string;
}
