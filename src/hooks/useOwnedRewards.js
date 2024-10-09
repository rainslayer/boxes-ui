import { useState, useEffect } from 'react';
import Api from '../const/api';

function useOwnedRewards() {
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    (async () => {
      await update();
     })();
   }, []);

  async function update() {
    setLoading(true);

    try {
      const response = await Api.Rewards.getOwnedRewards();

      if ("rewards" in response?.data) {
        setRewards(response.data.rewards);
      } else {
        setError("Something went wrong");
      }
    } catch (e) {
      setError(e.response?.data?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }
  
  return { rewards, update, loading, error };
}

export default useOwnedRewards;