import { useState, useEffect, useCallback } from 'react';
import type { Message, Conversation } from '../types';

// Fallback messages for demo
const FALLBACK_MESSAGES: Record<string, Message[]> = {
  '1': [
    {
      id: '1',
      content: "Hi, I recently joined Fit4Life and I'm trying to access my workout plan, but I can't login. Can you help?",
      timestamp: '23:08',
      isAgent: false,
      status: 'read',
    },
    {
      id: '2',
      content: "Hello Olivia 👋 I'm Michael, your AI customer support assistant. Let's fix this quickly. Could you confirm the email address you used to sign up?",
      timestamp: '23:08',
      isAgent: true,
      status: 'read',
    },
    {
      id: '3',
      content: "Yes, it's olivia.Mckinsey@gmail.com",
      timestamp: '23:16',
      isAgent: false,
      status: 'read',
    },
    {
      id: '4',
      content: "Thanks! Looks like your password reset wasn't completed. I've sent a new reset link – please check your inbox and spam folder.",
      timestamp: '23:16',
      isAgent: true,
      status: 'read',
    },
    {
      id: '5',
      content: 'I see it. resetting now…',
      timestamp: '23:17',
      isAgent: false,
      status: 'read',
    },
    {
      id: '6',
      content: "Done! I'm logged in. Thanks so much for your help!",
      timestamp: '23:20',
      isAgent: false,
      status: 'read',
    },
    {
      id: '7',
      content: 'Perfect 🎉 Your workout plan is ready under "My Programs". Since you\'re starting out, I recommend our Premium Nutrition Guide – it boosts results by 40% and is 20% off this week!',
      timestamp: '23:20',
      isAgent: true,
      status: 'read',
    },
    {
      id: '8',
      content: "Oh my god 😍 I'll try it ASAP, thank you so much!!",
      timestamp: '23:23',
      isAgent: false,
      status: 'read',
    },
  ],
};

const CONVERSATION_METADATA: Record<string, Partial<Conversation>> = {
  '1': {
    contact: {
      firstName: 'Olivia',
      lastName: 'Mckinsey',
      phone: '+1 (312) 555-0134',
      email: 'olivia.Mckinsey@gmail.com',
    },
    assignee: 'James West',
    team: 'Sales Team',
    labels: ['Closed Won', 'Premium Lead'],
  },
};

export function useMessages(conversationId: string | null) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = useCallback(async () => {
    if (!conversationId) {
      setMessages([]);
      setConversation(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Try to fetch from API - using dummyjson posts as message simulation
      const res = await fetch(`https://dummyjson.com/posts?limit=10`);
      if (!res.ok) throw new Error('Failed to fetch');

      const data = await res.json();

      // Transform API posts to message format
      const apiMessages: Message[] = data.posts.slice(0, 8).map((post: any, idx: number) => ({
        id: String(post.id),
        content: post.body,
        timestamp: `${Math.floor(Math.random() * 23)}:${Math.floor(Math.random() * 60)}`.padStart(5, '0'),
        isAgent: idx % 3 === 0, // Every 3rd message is from agent
        status: idx % 2 === 0 ? 'read' : 'delivered',
        conversationId: conversationId,
      }));

      // Merge with fallback for better UX
      const fallbackMsgs = FALLBACK_MESSAGES[conversationId] || [];
      const merged = fallbackMsgs.length > 0 ? fallbackMsgs : apiMessages;

      setMessages(merged);

      // Set conversation metadata
      const metadata = CONVERSATION_METADATA[conversationId] || {
        contact: {
          firstName: 'Customer',
          lastName: '',
          phone: '+1 (555) 000-0000',
          email: 'customer@example.com',
        },
        assignee: 'Support Team',
        team: 'Customer Support',
        labels: ['Open'],
      };

      setConversation({
        id: conversationId,
        messages: merged,
        ...metadata,
      } as Conversation);
    } catch (err) {
      console.error('Error fetching messages:', err);
      // Fallback to mock data
      const fallbackMsgs = FALLBACK_MESSAGES[conversationId] || [];
      setMessages(fallbackMsgs);
      if (fallbackMsgs.length > 0) {
        const metadata = CONVERSATION_METADATA[conversationId] || {
          contact: { firstName: 'Customer', lastName: '', phone: '+1 (555) 000-0000', email: 'customer@example.com' },
          assignee: 'Support Team',
          team: 'Customer Support',
          labels: ['Open'],
        };
        setConversation({
          id: conversationId,
          messages: fallbackMsgs,
          ...metadata,
        } as Conversation);
      }
      setError(null); // Don't show error if we have fallback
    } finally {
      setLoading(false);
    }
  }, [conversationId]);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || !conversationId) return;

    const newMessage: Message = {
      id: `temp-${Date.now()}`,
      content: content.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isAgent: true,
      status: 'sent',
      conversationId,
    };

    setMessages(prev => [...prev, newMessage]);
    setSending(true);

    try {
      // Simulate API call to send message
      await new Promise(resolve => setTimeout(resolve, 800));

      // Update message status
      setMessages(prev =>
        prev.map(msg =>
          msg.id === newMessage.id ? { ...msg, status: 'delivered' as const } : msg
        )
      );

      // Simulate AI response after 1 second
      setTimeout(() => {
        const autoResponse: Message = {
          id: `auto-${Date.now()}`,
          content: "Thanks for your message! I'll look into this and get back to you shortly. Is there anything else I can help with?",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isAgent: true,
          status: 'read',
          conversationId,
        };
        setMessages(prev => [...prev, autoResponse]);
      }, 1000);
    } catch (err) {
      console.error('Failed to send message:', err);
      setMessages(prev =>
        prev.map(msg =>
          msg.id === newMessage.id ? { ...msg, status: 'sent' } : msg
        )
      );
    } finally {
      setSending(false);
    }
  }, [conversationId]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return { messages, conversation, loading, error, sendMessage, sending, refetch: fetchMessages };
}