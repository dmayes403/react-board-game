import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import { makeStyles } from '@mui/styles';
import { Typography } from '@mui/material';
import { useState } from 'react';

const Item = ({game}) => {
  const classes = useStyles();
  const [displayMoreId, setDisplayMoreId] = useState();
  
  return (
    <Grid item>
      <Card variant="outlined" className={classes.cardContainer}>
        <img className={classes.images} src={game.thumb_url} />

        <div className={classes.details}>
          <Typography variant="subtitle2">{game.name}</Typography>

          <div>
            {game.description_preview.length > 80 && displayMoreId != game.id ? game.description_preview.slice(0, 80) + '... ' : game.description_preview}
            {game?.description_preview.length > 80 && displayMoreId != game.id && (
              <div className={classes.displayMore} onClick={e => setDisplayMoreId(game.id)}>Read more</div>
            )}
            {displayMoreId == game.id && (
              <div className={classes.displayMore} onClick={e => setDisplayMoreId(null)}>Read less</div>
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
    padding: theme.spacing(1)
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