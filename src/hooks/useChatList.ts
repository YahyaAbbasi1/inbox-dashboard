import { useState, useEffect } from 'react';
import type { Chat } from '../types';

// Static names/messages to map onto API data for realism
const CHAT_OVERRIDES = [
  { name: 'Olivia Mckinsey', lastMessage: "Oh my god 😍 I'll try it ASAP, thank..", time: '23:23', avatar: 'O', unread: 2 },
  { name: 'Sara Williams', lastMessage: 'Good Evening, Emily! Hope you are..', time: '23:16', avatar: 'S', unread: 0 },
  { name: 'Frank Thompson', lastMessage: 'Thank you for signing up Frank! If t..', time: '22:28', avatar: 'F', unread: 1 },
  { name: 'Grace Lee', lastMessage: 'I am sending you the report right a..', time: '20:43', avatar: 'G', unread: 3 },
  { name: 'Henry Adams', lastMessage: 'Thank you for filling out our survey!', time: '17:37', avatar: 'H', unread: 0 },
  { name: 'Isabella Martinez', lastMessage: 'I will update you soon Isabella!', time: '16:01', avatar: 'I', unread: 0 },
  { name: 'James Brown', lastMessage: "Hello James! Let's collaborate on...", time: '13:44', avatar: 'J', unread: 1 },
  { name: 'Katherine White', lastMessage: 'Hi Katherine, looking forward to our..', time: '09:02', avatar: 'K', unread: 0 },
  { name: 'Lucas Green', lastMessage: 'Hey Lucas! Ready for the holiday...', time: 'Yesterday', avatar: 'L', unread: 2 },
];

const AVATAR_COLORS = [
  '#6366f1', '#8b5cf6', '#06b6d4', '#10b981',
  '#f59e0b', '#ef4444', '#ec4899', '#14b8a6', '#84cc16',
];

export function useChatList() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        // Using dummyjson users as the data source for chat contacts
        const res = await fetch('https://dummyjson.com/users?limit=9&select=id,firstName,lastName,email,phone');
        if (!res.ok) throw new Error('API fetch failed');
        const data = await res.json();

        const mapped: Chat[] = data.users.map((user: any, idx: number) => ({
          id: String(user.id),
          name: CHAT_OVERRIDES[idx]?.name ?? `${user.firstName} ${user.lastName}`,
          lastMessage: CHAT_OVERRIDES[idx]?.lastMessage ?? 'No messages yet',
          time: CHAT_OVERRIDES[idx]?.time ?? 'Today',
          avatar: CHAT_OVERRIDES[idx]?.avatar ?? user.firstName.charAt(0),
          avatarColor: AVATAR_COLORS[idx % AVATAR_COLORS.length],
          unread: CHAT_OVERRIDES[idx]?.unread ?? 0,
          email: user.email,
          phone: user.phone,
        }));

        setChats(mapped);
      } catch (err) {
        setError('Failed to load chats');
        // Fallback to static data
        const fallback: Chat[] = CHAT_OVERRIDES.map((c, i) => ({
          id: String(i + 1),
          name: c.name,
          lastMessage: c.lastMessage,
          time: c.time,
          avatar: c.avatar,
          avatarColor: AVATAR_COLORS[i % AVATAR_COLORS.length],
          unread: c.unread,
        }));
        setChats(fallback);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  return { chats, loading, error };
}