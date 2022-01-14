import { useEffect, useState } from 'react'
import axios from "axios";

export default function GamesByCatAuto() {
  const defaultCatNames = ['Adventure', 'Family Game', 'Finance', 'Party Game', 'Card Game', 'Racing'];
  const [gamesByCategory, setGamesByCategory] = useState({});
  
  const generateCatUrl = id => {
    return `https://api.boardgameatlas.com/api/search?categories=${id}&client_id=${process.env.REACT_APP_BOARD_GAME_VAL}`
  }

  useEffect(() => {
    axios.get(`https://api.boardgameatlas.com/api/game/categories?client_id=${process.env.REACT_APP_BOARD_GAME_VAL}`).then((response) => {
      const defaultCats = response.data.categories.filter(cat => defaultCatNames.includes(cat.name));
      console.log('defaultCats', defaultCats);
      const gamesByCatMap = {};

      defaultCats.forEach(cat => {
        gamesByCatMap[cat.id] = {
          id: cat.id,
          name: cat.name,
          games: []
        }
      })

      setGamesByCategory(gamesByCatMap);

      console.log('gamesByCategory1', gamesByCategory);

      const catRequests = defaultCats
        .map(cat => cat.id)
        .map(id => axios.get(generateCatUrl(id)))


      axios.all(catRequests).then(axios.spread((...responses) => {
        console.log('responses', responses)
        const tempGamesByCategory = gamesByCategory;

        for(const key in gamesByCategory) {
          responses.forEach(response => {
            if (response.config.url.includes(key)) {
              tempGamesByCategory[key].games = response.data.games;
            }
          });
        }

        console.log('gamesByCategory2', gamesByCategory);
      }));
    });
  }, []);

  return (
    <div></div>
  )
}
