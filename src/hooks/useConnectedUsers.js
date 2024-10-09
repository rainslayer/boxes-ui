import { useState, useEffect } from 'react';
import Api from '../const/api';

function useConnectedUsers() {
  const [users, setUsers] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    (async () => {
      try {
        const response = await Api.Sse.getConnectedUsers();

        if ("users" in response?.data) {
          setUsers(new Set(response.data.users));
        } else {
          setError("Something went wrong");
        }
      } catch (e) {
        setError(e.response?.data?.message ?? "Something went wrong");
      }
     })();
   }, []);

  return { users, setUsers, loading, error };
}

export default useConnectedUsers;