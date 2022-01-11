import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { makeStyles } from '@mui/styles';
import UserRating from "./user-rating";
import * as _ from 'lodash';
import Divider from '@mui/material/Divider';
import GameDetailControls from "./game-detail-controls";
import SimilarGames from "./similar-games";

export default function GameDetails() {
  const classes = useStyles();
  const { gameId } = useParams();
  const [game, setGame] = useState();
  const [allMechanics, setAllMechanics] = useState({});
  const [allCategories, setAllCategories] = useState({});
  const [similarGames, setSimilarGames] = useState([]);
  console.log('gameId', gameId);

  useEffect(() => {
    axios.get(`https://api.boardgameatlas.com/api/search?ids=${gameId}&client_id=${process.env.REACT_APP_BOARD_GAME_VAL}`).then((response) => {
      console.log('game', response.data.games[0]);
      setGame(response.data.games[0]);
    });
  }, [gameId]);

  useEffect(() => {
    axios.get(`https://api.boardgameatlas.com/api/game/mechanics?&client_id=${process.env.REACT_APP_BOARD_GAME_VAL}`).then((response) => {
      console.log('mechanics', response);
      setAllMechanics(_.mapKeys(response.data.mechanics, 'id'));
    });
  }, []);

  useEffect(() => {
    axios.get(`https://api.boardgameatlas.com/api/game/categories?&client_id=${process.env.REACT_APP_BOARD_GAME_VAL}`).then((response) => {
      console.log('categories', response);
      setAllCategories(_.mapKeys(response.data.categories, 'id'));
    });
  }, []);

  // Update to use all mechanic ids instead just the 1st one
  useEffect(() => {
    if (game) {
      axios.get(`https://api.boardgameatlas.com/api/search?mechanics=${game.mechanics[0].id}&client_id=${process.env.REACT_APP_BOARD_GAME_VAL}`).then((response) => {
        console.log('similar games', response);
        setSimilarGames(response.data.games);
      });
    }
  }, [game])

  return (
    <div style={{width: '100%'}}>
      <div className={classes.mainDetails}>
        <img src={game?.images.large}/>

        <div className={classes.sideInfo}>
          <div className={classes.title}>{game?.name}</div>
          <UserRating userRating={game?.average_user_rating} ratingCount={game?.num_user_ratings} />

          <div className={classes.rowData} style={{marginTop: '16px', flexDirection: 'column'}}>
            <div className={classes.subTitle}>Category</div>
            <div>{game?.categories?.map(category => (
              <div key={category.id}>{allCategories[category.id]?.name}</div>
            ))}</div>
          </div>

          <div className={classes.rowData} style={{marginTop: '16px', flexDirection: 'column'}}>
            <div className={classes.subTitle}>Game Mechanics</div>
            <div>{game?.mechanics?.map(mechanic => (
              <div key={mechanic.id}>{allMechanics[mechanic.id]?.name}</div>
            ))}</div>
          </div>

          <div style={{marginTop: '16px'}}>
            <div className={classes.rowData}>
              <div className={classes.subTitle}>Minimum Age</div>
              <div>{game?.min_age}</div>
            </div>

            <div className={classes.rowData}>
              <div className={classes.subTitle}>Min Players</div>
              <div>{game?.min_players}</div>
            </div>

            <div className={classes.rowData}>
              <div className={classes.subTitle}>Max Players</div>
              <div>{game?.max_players}</div>
            </div>

            <div className={classes.rowData}>
              <div className={classes.subTitle}>Min Play Time</div>
              <div>{game?.min_playtime} minutes</div>
            </div>

            <div className={classes.rowData} style={{marginTop: '16px'}}>
              <div className={classes.subTitle}>Game Designer</div>
              <div>{game?.primary_designer.name}</div>
            </div>

            <div className={classes.artistContainer}>
              <div className={classes.subTitle}>Artists</div>
              <div style={{display: 'inherit', flexWrap: 'wrap'}}>
                {game?.artists.map((artist, index) => (
                  <div key={artist} className={classes.artist}>{artist}{game.artists.length > 1 && index !== game.artists.length -1 ? ', ' : ''}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <GameDetailControls />
      </div>

      <Divider />

      <div className={classes.lowerDetails}>
        <div className={classes.columnData}>
          <div className={classes.subTitle}>Description</div>
          <div>{game?.description_preview}</div>
        </div>
      </div>

      <Divider />

      <SimilarGames games={similarGames}/>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  mainDetails: {
    display: 'flex',
    '& > img': {
      width: '30%',
      height: 'auto',
      objectFit: 'contain'
      // height: '400px'
    },
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
  },
  sideInfo: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    textAlign: 'left'
  },
  title: {
    fontSize: '1.2em',
    fontWeight: 'bold'
  },
  rowData: {
    display: 'flex',
    fontSize: '.75em',
  },
  columnData: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '.75em',
    textAlign: 'left'
  },
  subTitle: {
    fontWeight: 'bold',
    marginRight: theme.spacing(1)
  },
  lowerDetails: {
    padding: `${theme.spacing(2)} 0px`
  },
  artistContainer: {
    display: 'flex',
    maxWidth: '300px',
    // overflow: 'hidden'
    fontSize: '.75em',
  },
  artist: {
    whiteSpace: 'nowrap',
    marginRight: theme.spacing(.5)
  },
}));