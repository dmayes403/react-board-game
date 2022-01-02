import StarOutlineIcon from '@mui/icons-material/StarOutline'
import StarHalfIcon from '@mui/icons-material/StarHalf'
import StarIcon from '@mui/icons-material/Star'
import { makeStyles } from '@mui/styles'

export default function Rating({ userRating, ratingCount }) {
  const classes = useStyles();
  const fullStars = [];
  const halfStars = [];
  const emptyStars = [];
  console.log('userRating', userRating);

  if (ratingCount && userRating > 1) {
    for (let i = 1; i <= userRating.toString().split('.')[0]; i++) {
      console.log('i', i)
      fullStars.push(i);
    }

    if (userRating.toString().split('.')[1] > 0) {
      halfStars.push(1);
    }

    const emptyCount = 5 - (fullStars.length + halfStars.length);
    if (emptyCount >= 1) {
      for (let i = 1; i <= emptyCount; i++) {
        emptyStars.push(i);
      } 
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.stars}>
        {fullStars.map(starNum => <StarIcon fontSize='small' key={`full_${starNum}`}/>)}
        {halfStars.map(starNum => <StarHalfIcon fontSize='small' key={`half_${starNum}`}/>)}
        {emptyStars.map(starNum => <StarOutlineIcon fontSize='small' key={`outline_${starNum}`}/>)}
      </div>

      <div className={classes.count}>{ratingCount} ratings</div>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  stars: {
    display: 'flex'
  },
  count: {
    marginLeft: theme.spacing(2),
    fontSize: '.85em'
  }
}))
