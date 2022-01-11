import { makeStyles } from '@mui/styles'
import Button from '@mui/material/Button'

export default function GameDetailControls() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button variant="contained" size="small" color="primary">Mark As Played</Button>
      <Button variant="contained" size="small" color="primary">Mark As Owned</Button>
      <Button variant="contained" size="small" color="primary">Add To Wishlist</Button>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    marginLeft: '16px',
    borderRadius: '5px',
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.primary.main}`,
    display: 'flex',
    flexDirection: 'column',
    '& Button': {
      marginBottom: theme.spacing(1),
      textTransform: 'none'
    }
  }
}));
