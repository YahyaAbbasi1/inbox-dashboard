import type { Message, ChatDetails } from '../types';

export const MESSAGES: Message[] = [
  {
    id: '1',
    content: "Hi, I recently joined Fit4Life and I'm trying to access my workout plan, but I can't login. Can you help?",
    timestamp: '23:08',
    isAgent: false,
  },
  {
    id: '2',
    content: "Hello Olivia 👋 I'm Michael, your AI customer support assistant. Let's fix this quickly. Could you confirm the email address?",
    timestamp: '23:08',
    isAgent: true,
    status: 'read',
  },
  {
    id: '3',
    content: "Yes, it's olivia.Mckinsey@gmail.com",
    timestamp: '23:16',
    isAgent: false,
  },
  {
    id: '4',
    content: "Thanks! Looks like your reset wasn't completed. I've sent a new link – please check your inbox.",
    timestamp: '23:16',
    isAgent: true,
    status: 'read',
  },
  {
    id: '5',
    content: 'I see it. resetting now…',
    timestamp: '23:17',
    isAgent: false,
  },
  {
    id: '6',
    content: "Done! I'm logged in. Thanks!",
    timestamp: '23:20',
    isAgent: false,
  },
  {
    id: '7',
    content: 'Perfect 🎉 Your plan is ready under "My Programs". Since you\'re starting out, I suggest our Premium Guide – it boosts results and is 20% off here 👉 www.Fit4Life.com/Premium',
    timestamp: '23:20',
    isAgent: true,
    status: 'read',
  },
  {
    id: '8',
    content: "Oh my god 😍 I'll try it ASAP, thank you so much!!",
    timestamp: '23:23',
    isAgent: false,
  },
];

export const CHAT_DETAILS: ChatDetails = {
  assignee: 'James West',
  team: 'Sales Team',
  contact: {
    firstName: 'Olivia',
    lastName: 'Mckinsey',
    phone: '+1 (312) 555-0134',
    email: 'olivia.Mckinsey@gmail.com',
  },
  labels: ['Closed Won', 'Chicago'],
  notes: ['Strong potential for future upgrades'],
};

export const SIDEBAR_TEAMS = [
  { name: 'Sales', count: 7, active: false },
  { name: 'Customer Support', count: 16, active: true },
];

export const SIDEBAR_USERS = [
  { name: 'Sarah Williams', count: 2, active: false },
  { name: 'Michael Johnson', count: 11, active: true },
  { name: 'Emily Davis', count: 0, active: false },
  { name: 'Christopher Miller', count: 4, active: false },
  { name: 'Amanda Garcia', count: 5, active: false },
  { name: 'Joshua Martinez', count: 0, active: false },
  { name: 'Ashley Taylor', count: 1, active: false },
  { name: 'Daniel Anderson', count: 0, active: false },
  { name: 'Jessica Thomas', count: 2, active: false },
];

export const CHANNELS = [
  { name: 'WhatsApp', color: '#25D366' },
  { name: 'Instagram', color: '#E1306C' },
];