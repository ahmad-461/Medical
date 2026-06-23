import { supabase } from './supabase';

const SESSION_KEY = 'rx_session_id';

export async function getOrCreateSessionId(): Promise<string> {
  if (typeof window === 'undefined') return '';

  const existingId = localStorage.getItem(SESSION_KEY);
  if (existingId) {
    return existingId;
  }

  const newId = crypto.randomUUID();

  try {
    const { error } = await supabase
      .from('sessions')
      .insert([{ id: newId }]);

    if (error) {
      console.error('Error inserting session into Supabase:', error);
      // We still return the newId so the user can proceed locally
    }

    localStorage.setItem(SESSION_KEY, newId);
    return newId;
  } catch (err) {
    console.error('Unexpected error creating session:', err);
    localStorage.setItem(SESSION_KEY, newId);
    return newId;
  }
}
