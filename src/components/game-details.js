import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function GameDetails() {
    const { gameId } = useParams();
    const [game, setGame] = useState();
    console.log('gameId', gameId);

    useEffect(() => {
      axios.get(`https://api.boardgameatlas.com/api/search?ids=${gameId}&client_id=${process.env.REACT_APP_BOARD_GAME_VAL}`).then((response) => {
        console.log(response.data.games[0]);
        setGame(response.data.games[0]);
      });
    }, [gameId])

    return (
        <div>
          <img src={game?.images.medium}/>
        </div>
    )
}