import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import { makeStyles } from '@mui/styles';
import { Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import clsx from 'clsx';

const Item = ({game}) => {
  const classes = useStyles();
  const [displayMoreId, setDisplayMoreId] = useState();
  let navigate = useNavigate();

  return (
    <Grid item>
        <Card className={clsx({[classes.defaultHeight]: displayMoreId !== game.id, [classes.extendedHeight]: displayMoreId === game.id, [classes.cardContainer]: true})} onClick={() => navigate(`/game-details/${game.id}`)}>
          <img className={classes.images} src={game.thumb_url} alt="game thumnail"/>

          <div className={classes.details}>
            <Typography variant="subtitle2">{game.name}</Typography>

            <div>
              {game.description_preview.length > 80 && displayMoreId !== game.id ? game.description_preview.slice(0, 80) + '... ' : game.description_preview}
              {game?.description_preview.length > 80 && displayMoreId !== game.id && (
                <div className={classes.displayMore} onClick={e => {e.stopPropagation(); setDisplayMoreId(game.id)}}>Read more</div>
              )}
              {displayMoreId === game.id && (
                <div className={classes.displayMore} onClick={e => {e.stopPropagation(); setDisplayMoreId(null)}}>Read less</div>
              )}
            </div>
          </div>
        </Card>
    </Grid>
  )
}

export default function SearchedGameList({
  games
}) {
  const classes = useStyles();

  console.log('games', games);

  return (
    <Grid 
      justifyContent="center" 
      container 
      rowSpacing={1} 
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      className={classes.mainGrid}
    >
      {games.map(game => <Item key={game.id} game={game}/>)}
    </Grid>
  )
}

const useStyles = makeStyles(theme => ({
  images: {
    height: '200px',
    width: '200px',
  },
  mainGrid: {
    marginTop: theme.spacing(3)
  },
  cardContainer: {
    padding: theme.spacing(1),
    '&:hover': {
      cursor: 'pointer'
    }
  },
  defaultHeight: {
    height: '325px'
  },
  extendedHeight: {
    height: 'flex'
  },
  details: {
    maxWidth: '200px',
    fontSize: '.6em'
  },
  displayMore: {
    color: 'blue',
    '&:hover': {
      cursor: 'pointer'
    }
  }
}));