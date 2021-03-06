import { makeStyles } from '@mui/styles'
import Divider from '@mui/material/Divider'

export default function SimilarGames({games}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {games.map(game => (
        <div key={game.id} style={{display: 'flex'}}>
          <div className={classes.game}>
            <img src={game.images.small} alt="game thumbnail"/>
            <div>{game.name}</div>
          </div>
          <Divider orientation="vertical" sx={{height: '80%', margin: 'auto'}}/>
        </div>
      ))}
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      overflow: 'hidden',
      border: `1px solid lightgray`,
      marginTop: theme.spacing(2),
      borderRadius: '5px',
      overflowX: 'auto'
    },
    game: {
      width: '60px',
      fontSize: '.5em',
      padding: theme.spacing(1),
      margin: '0px 12px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      '& img': {
        objectFit: 'contain',
      },
      '&:hover': {
        cursor: 'pointer',
        transform: 'scale(1.2)',
        transitionDuration: '.5s'
      }
    }
}))
