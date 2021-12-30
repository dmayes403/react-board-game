import { makeStyles } from '@mui/styles';


export default function Dashboard() {
    const classes = useStyles();

    return (
        <div className={classes.text}>Dashboard</div>
    )
}

const useStyles = makeStyles({
    root: {},
    text: {
      fontSize: '10px'
    }
  });