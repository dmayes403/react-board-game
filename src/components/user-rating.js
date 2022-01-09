import StarOutlineIcon from '@mui/icons-material/StarOutline'
import StarHalfIcon from '@mui/icons-material/StarHalf'
import StarIcon from '@mui/icons-material/Star'
import { makeStyles } from '@mui/styles'
import Rating from '@mui/material/Rating';
import { useState } from 'react';

const Star = ({version}) => {
  const classes = useStyles();

  switch (version) {
    case 'full':
      return (
        <StarIcon
          className={classes.star}
          sx={{color: '#FBAF01'}} 
          fontSize='small' 
        />
      );
    case 'half':
      return (
        <StarHalfIcon 
          className={classes.star}
          sx={{color: '#FBAF01'}} 
          fontSize='small' 
        />
      );
    default:
      return (
        <StarOutlineIcon 
          className={classes.star}
          sx={{color: '#C0C0C0'}} 
          fontSize='small' 
        />
      );
  }
}

export default function UserRating({ userRating, ratingCount }) {
  const classes = useStyles();
  const [newRating, setNewRating] = useState(userRating);

  const fullStars = [];
  const halfStars = [];
  const emptyStars = [];

  if (ratingCount && userRating > 1) {
    for (let i = 1; i <= userRating.toString().split('.')[0]; i++) {
      fullStars.push(i);
    }

    if (userRating.toString().split('.')[1] > 0) {
      halfStars.push(fullStars.length + 1);
    }

    const emptyCount = 5 - (fullStars.length + halfStars.length);
    if (emptyCount >= 1) {
      for (let i = 1; i <= emptyCount; i++) {
        emptyStars.push(fullStars.length + halfStars.length + i);
      } 
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.stars}>
        {fullStars.map(starNum => <Star key={starNum} version={'full'} starNum={starNum}/>)}
        {halfStars.map(starNum => <Star key={starNum} version={'half'} starNum={starNum}/>)}
        {emptyStars.map(starNum => <Star key={starNum} version={'empty'} starNum={starNum}/>)}
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
  },
  star: {
    '&:hover': {
      cursor: 'pointer',
      transform: 'scale(1.2)'
    }
  }
}))
