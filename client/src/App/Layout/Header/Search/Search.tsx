import React, { useEffect, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { StoreState } from '../../../../types';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { searchBugs } from '../../../../store/actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: theme.spacing(3),
      width: 'auto'
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    inputRoot: {
      color: 'inherit'
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch'
      }
    }
  })
);


type Props = {
  searchBugs: (payload: string) => void,
  searchBy: string
};

const Component: React.FC<Props> = ({
  searchBugs,
  searchBy
}) => {
  const classes = useStyles();

  const [value, setValue] = useState<string>(searchBy);
  const [debouncedValue, setDebouncedValue] = useState<string>(searchBy);

  const [onSearch$] = useState(() => new Subject());

  useEffect(() => {
    onSearch$
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(next => updateDebouncedValue(next as string));
  }, [onSearch$]);

  useEffect(() => {
    searchBugs(debouncedValue);
  }, [
    searchBugs,
    debouncedValue
  ]);

  const updateDebouncedValue = (next: string) => {
    setDebouncedValue(next);
  };

  const handleSearch = (event: React.ChangeEvent<{ value: unknown }>) => {
    const str = event.target.value as string

    setValue(str);

    onSearch$.next(str);
  };

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
        value={value}
        onChange={handleSearch}
      />
    </div>
  );
}

const mapStateToProps = ({ bugs: { searchBy } }: StoreState) => ({
  searchBy
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    searchBugs: (payload: string) => { dispatch(searchBugs(payload)) }
  }
};

export const Search = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
