import { useEffect, useState } from 'react'
import axios from "axios";
import { makeStyles } from '@mui/styles';
import Divider from '@mui/material/Divider';

export default function GamesByCatAuto() {
  const classes = useStyles();
  const defaultCatNames = ['Adventure', 'Family Game', 'Finance', 'Party Game', 'Card Game', 'Racing'];
  const [gamesByCategory, setGamesByCategory] = useState({});
  
  const generateCatUrl = id => {
    return `https://api.boardgameatlas.com/api/search?categories=${id}&client_id=${process.env.REACT_APP_BOARD_GAME_VAL}`
  }

  useEffect(() => {
    axios.get(`https://api.boardgameatlas.com/api/game/categories?client_id=${process.env.REACT_APP_BOARD_GAME_VAL}`).then((response) => {
      const defaultCats = response.data.categories.filter(cat => defaultCatNames.includes(cat.name));
      let gamesByCatMap = {};
      console.log('defaultCats', defaultCats);

      defaultCats.forEach(cat => {
        gamesByCatMap[cat.id] = {
          id: cat.id,
          name: cat.name,
          games: []
        }
      })

      const catRequests = defaultCats
        .map(cat => cat.id)
        .map(id => axios.get(generateCatUrl(id)))

      axios.all(catRequests).then(axios.spread((...responses) => {
        for(const key in gamesByCategory) {
          responses.forEach(response => {
            if (response.config.url.includes(key)) {
              gamesByCatMap[key].games = response.data.games;
            }
          });
        }

        setGamesByCategory(gamesByCatMap);
      }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {Object.keys(gamesByCategory).map((catId, index) => (
        <div key={catId}>
          {index > 0 && <Divider />}
          <div className={classes.categoryRow}>
            {gamesByCategory[catId].games.map(game => (
              <div key={catId + game.id} className={classes.game}>
                <img src={game.images.small} alt="game thumbnail"/>
                <div>{game.name}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  categoryRow: {
    display: 'flex'
  },
  columnData: {
    display: 'flex',
    flexDirection: 'row'
  },
  game: {
    width: '120px',
    fontSize: '.5em',
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    '& img': {
      objectFit: 'contain',
    }
  }
}));
