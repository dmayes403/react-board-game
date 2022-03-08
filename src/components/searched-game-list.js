import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import { makeStyles } from '@mui/styles';
import { Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

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

            <div className={classes.spacer}></div>

            <div className={classes.actionIcons}>
              <IconButton onClick={e => {e.stopPropagation()}}>
                <CheckCircleIcon />
              </IconButton>
              <IconButton onClick={e => {e.stopPropagation()}}>
                <AutoAwesomeIcon />
              </IconButton>
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
    marginTop: theme.spacing(3),
  },
  cardContainer: {
    padding: theme.spacing(1),
    '&:hover': {
      cursor: 'pointer'
    },
  },
  defaultHeight: {
    height: '350px'
  },
  extendedHeight: {
    height: 'flex'
  },
  details: {
    maxWidth: '200px',
    fontSize: '.6em',
    display: 'flex',
    flexDirection: 'column',
    height: '38%'
  },
  displayMore: {
    color: 'blue',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  spacer: {
    flexGrow: 1
  },
  actionIcons: {
    display: 'flex',
    justifyContent: 'space-around'
  }
}), {name: 'SearchedGameList'});