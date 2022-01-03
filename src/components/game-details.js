import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { makeStyles } from '@mui/styles';
import UserRating from "./user-rating";
import Button from '@mui/material/Button';

export default function GameDetails() {
  const classes = useStyles();
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
      <div className={classes.mainDetails}>
        <img src={game?.images.medium}/>

        <div className={classes.sideInfo}>
          <div className={classes.title}>{game?.name}</div>
          <UserRating userRating={game?.average_user_rating} ratingCount={game?.num_user_ratings} />
          <Button variant="outlined" color="secondary">Outlined</Button>
        </div>
      </div>
  )
}

const useStyles = makeStyles(theme => ({
  mainDetails: {
    display: 'flex',
  },
  sideInfo: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2)
  },
  title: {
    fontSize: '1.2em',
    fontWeight: 'bold'
  }
}));