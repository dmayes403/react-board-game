import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from '@mui/styles';
import { useEffect, useState, useCallback } from 'react';
import debounce from 'lodash.debounce';

export default function SearchControls({
  setSearchObj,
}) {
  const classes = useStyles();
  const [minPlayers, setMinPlayers] = useState(1);
  const [maxPlayers, setMaxPlayers] = useState(1);
  const [searchText, setSearchText] = useState();

  const handleSearchChange = (change) => {
    if (searchText !== change.target.value) {
      setSearchText(change.target.value);
    }
  }

  const debouncedChangeHandler = useCallback(
    debounce(handleSearchChange, 500)
  , []);

  useEffect(() => {
    setSearchObj(curr => {
      return {
        ...curr,
        minPlayers,
        maxPlayers,
        searchText
      }
    })
  }, [minPlayers, maxPlayers, searchText]);

  const playerOptns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="root">
      <TextField
          sx={{ width: '50%' }}
          onChange={debouncedChangeHandler}
          id="outlined-basic"
          label="Search"
          variant="outlined"
          size="small"
      />

      <FormControl className={classes.playerInput} sx={{marginLeft: '8px'}}>
        <InputLabel>Min Players</InputLabel>
        <Select 
          id="min-players" 
          label="Min Players" 
          onChange={e => setMinPlayers(e.target.value)} value={minPlayers}
        >
          {playerOptns.map(optn => 
            <MenuItem key={optn} value={optn}>{optn}</MenuItem>
          )}
        </Select>
      </FormControl>

      <FormControl className={classes.playerInput} sx={{marginLeft: '8px'}}>
        <InputLabel htmlFor="max-players">Max Players</InputLabel>
        <Select 
          id="max-players" 
          label="Max Players" 
          onChange={e => setMaxPlayers(e.target.value)} value={maxPlayers}
        >
          {playerOptns.map(optn => 
            <MenuItem key={optn} value={optn}>{optn}</MenuItem>)
          }
        </Select>
      </FormControl>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  playerInput: {
    marginLeft: theme.spacing(1),
    width: '100px',
    '& .MuiOutlinedInput-root': {
      maxHeight: '40px'
    }
  }
}));