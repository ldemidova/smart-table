import React from 'react';
import { Layout } from './Layout';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    app: {
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'
    }
  })
);

function App() {
  const classes = useStyles();

  return (
    <div className={classes.app}>
      <Layout />
    </div>
  );
}

export { App };
