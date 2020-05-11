import React from 'react';
import { Header } from './Header';
import { BugsTable } from './BugsTable';
import { UserSelect } from './UserSelect';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    layout: {
      padding: '0 16px 16px 16px',
      marginTop: '64px',
      backgroundColor: '#f5f5f5',
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      [theme.breakpoints.up('sm')]: {
        padding: '0 24px 24px 24px',
      }
    }
  })
);



function Layout() {
  const classes = useStyles();

  return (
    <main className={classes.layout}>
      <Header />
      <UserSelect />
      <BugsTable />
    </main>
  );
}

export { Layout };
