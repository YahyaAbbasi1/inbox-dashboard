export interface Message {
  id: string;
  content: string;
  timestamp: string;
  isAgent: boolean;
  status?: 'sent' | 'delivered' | 'read';
  conversationId?: string;
}

export interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  avatar: string;
  avatarColor?: string;
  unread?: number;
  email?: string;
  phone?: string;
}

export interface ContactData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface ChatDetails {
  assignee: string;
  team: string;
  contact: ContactData;
  labels: string[];
  notes: string[];
}

export interface Conversation {
  id: string;
  messages: Message[];
  contact: ContactData;
  assignee?: string;
  team?: string;
  labels?: string[];
}

export type LoadingPhase = 'honeycomb' | 'skeleton' | 'loaded';