import { useState, useEffect } from 'react';
import Api from '../const/api';

function useCurrentGame() {
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    setLoading(loading);

    (async () => {
      try {
        const response = await Api.Game.getCurrentGame();

        if ("game" in response?.data) {
          setGame(response.data.game);
        } else {
          setError("Something went wrong");
        }
      } catch (e) {
        setError(e.response?.data?.message ?? "Something went wrong");
      } finally {
        setLoading(false);
      }
     })();
   }, []);

  return { game, setGame, loading, error };
}

export default useCurrentGame;