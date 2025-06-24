
import { useEffect } from 'react';
import { supabase } from '../config/supabase';
import { useNavigate } from 'react-router-dom';

export default function CallbackPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const handleCallback = async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session) {
        const accessToken = data.session.access_token;

        const res = await fetch('http://localhost:3000/verify', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const result = await res.json();
        console.log('User from backend:', result.user);
        navigate('/dashboard')
      }
    };

    handleCallback();
  }, []);

  return <h2>Logging in...</h2>;
}
