import React, { useEffect, useState } from 'react'
import axios from "axios";
import { makeStyles } from '@mui/styles';
import SearchControls from './search-controls';
import SearchedGameList from './searched-game-list';
import GamesByCatAuto from './games-by-cat-auto';

export default function GameSearch() {
  const classes = useStyles();
  const [gameSearchResults, setGameSearchResults] = useState([]);
  const [searchObj, setSearchObj] = useState({});

  useEffect(() => {
    if (searchObj?.searchText) {
      const alteredText = searchObj.searchText.replace(/\s/g, '+');
      axios.get(`https://api.boardgameatlas.com/api/search?name=${alteredText}&client_id=${process.env.REACT_APP_BOARD_GAME_VAL}`).then((response) => {
        console.log(response.data);
        const filteredGames = response.data.games.filter(game => !game.thumb_url.includes('empty+box+thumb'));
        setGameSearchResults(filteredGames);
      });
    }
  }, [searchObj]);

  return (
    <div className="root">
      <SearchControls 
        setSearchObj={setSearchObj}
        searchObj={searchObj}
      />

      <SearchedGameList games={gameSearchResults}/>

      {!searchObj?.searchText && (<GamesByCatAuto />)}
    </div>
  )
}

const useStyles = makeStyles({

});
