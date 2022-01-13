import { useEffect, useState } from 'react'
import axios from "axios";

export default function GamesByCatAuto() {
  const defaultCats = ['Adventure', 'Family Game', 'Finance', 'Party Game', 'Card Game', 'Racing']
  
  const generateCatUrl = id => {
    return `https://api.boardgameatlas.com/api/search?categories=${id}&client_id=${process.env.REACT_APP_BOARD_GAME_VAL}`
  }

  useEffect(() => {
    axios.get(`https://api.boardgameatlas.com/api/game/categories?client_id=${process.env.REACT_APP_BOARD_GAME_VAL}`).then((response) => {
      console.log(response.data);
      const catRequests = response.data.categories
        .filter(cat => defaultCats.includes(cat.name))
        .map(cat => cat.id)
        .map(id => axios.get(generateCatUrl(id)))


      axios.all(catRequests).then(axios.spread((...responses) => {
        console.log('responses', responses)
      }))
    });
  }, []);

  return (
    <div></div>
  )
}
