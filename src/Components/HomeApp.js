import React, { useEffect, useState } from 'react';
import useLiftState from '../Hooks/useLiftState';
import LiftApp from './LiftComponents/LiftApp';
import PersonalRecordApp from './PersonalRecordComponents/PersonalRecordApp';
import uuid from 'uuid/v4';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

const drawerWidth = 500;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: drawerWidth
  },
  title: {
    flexGrow: 1
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginRight: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: 0
  }
}));

export default function HomeApp() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const defaultLifts = [
    { id: uuid(), liftName: 'Bench Press' },
    { id: uuid(), liftName: 'Deadlift' },
    { id: uuid(), liftName: 'Squat' }
  ];
  const initialLifts =
    JSON.parse(window.localStorage.getItem('lifts')) || defaultLifts;

  const { lifts, addLift, removeLift, editLift } = useLiftState(initialLifts);

  useEffect(() => {
    window.localStorage.setItem('lifts', JSON.stringify(lifts));
  }, [lifts]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <Typography variant='h4' noWrap className={classes.title}>
            maxWellness
          </Typography>
          <IconButton
            color='inherit'
            aria-label='edit lifts'
            onClick={handleDrawerOpen}
            edge='end'
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <Typography variant='h6' noWrap>
              Edit Lifts
            </Typography>
          </IconButton>
        </Toolbar>
      </AppBar>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerHeader} />
        <PersonalRecordApp
          lifts={lifts}
        />
      </main>
      <Drawer
        className={classes.drawer}
        color='inherit'
        variant='persistent'
        anchor='right'
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton
            color='inherit'
            aria-label='close drawer'
            onClick={handleDrawerClose}
          >
            <Typography variant='h6' noWrap>
              Save Lifts
            </Typography>
          </IconButton>
        </div>
        <Divider />
        <LiftApp
          lifts={lifts}
          removeLift={removeLift}
          editLift={editLift}
          addLift={addLift}
        />
      </Drawer>
    </div>
  );
}
