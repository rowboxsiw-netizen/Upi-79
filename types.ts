
export enum TransactionType {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT',
  TRANSFER = 'TRANSFER'
}

export enum TransactionStatus {
  COMPLETED = 'COMPLETED',
  PENDING = 'PENDING',
  FAILED = 'FAILED'
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: TransactionType;
  category: string;
  description: string;
  timestamp: Date;
  status: TransactionStatus;
  recipientId?: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  accountNumber: string;
  balance: number;
  currency: string;
  createdAt: Date;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}
