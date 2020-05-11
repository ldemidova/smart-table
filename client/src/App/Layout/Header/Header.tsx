import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Search } from './Search';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      flex: '0 0 auto',
      height: '64px'
    },
    headerToolbar: {
      display: 'flex',
      justifyContent: 'flex-end',
      height: '100%',
      [theme.breakpoints.up('sm')]: {
        justifyContent: 'space-between'
      }
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block'
      }
    }
  })
);

function Header() {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <AppBar
        className={classes.header}
        position="fixed"
      >
        <Toolbar className={classes.headerToolbar}>
          <Typography
            className={classes.title}
            variant="h6"
            noWrap
          >
            Smart Table
          </Typography>
          <Search />
        </Toolbar>
      </AppBar>
    </>
  );
}

export { Header };
