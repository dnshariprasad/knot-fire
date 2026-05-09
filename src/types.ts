export interface CustomField {
  label: string;
  value: string;
}

export interface SharedUser {
  userId: string;
  email: string;
  permission: 'read' | 'write';
}

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  dueDate?: string;
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

  sharedWith?: SharedUser[];
  sharedWithUids?: string[];
  ownerEmail?: string;
}

export interface Todo {
  id: string;
  title: string;
  items: TodoItem[];
  tags: string[];
  createdAt: number;
  updatedAt: number;
  userId: string;
  isEncrypted?: boolean;

  sharedWith?: SharedUser[];
  sharedWithUids?: string[];
  ownerEmail?: string;
}

