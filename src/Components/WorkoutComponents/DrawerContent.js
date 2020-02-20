import React from 'react';

import PersonalBestApp from '../PersonalBestComponents/PersonalBestApp';
import PreviousWorkoutApp from './PreviousWorkoutApp';

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const DrawerContent = ({
  previousWorkouts,
  currentPersonalBests,
  previousPersonalBests
}) => {
  return (
    <div>
      <List>
        <ListItem button key='Previous Workouts'>
          <ListItemIcon>
            <span role='img' aria-label='weightlifter'>
              🏋️
            </span>
          </ListItemIcon>
          <ListItemText primary='Previous Workouts' />
        </ListItem>
        <ListItem button key='Personal Bests'>
          <ListItemIcon>
            <span role='img' aria-label='flexed arm'>
              💪
            </span>
          </ListItemIcon>
          <ListItemText primary='Personal Bests' />
        </ListItem>
      </List>
      <Divider />
      <PreviousWorkoutApp previousWorkouts={previousWorkouts} />
      <PersonalBestApp
        currentPersonalBests={currentPersonalBests}
        previousPersonalBests={previousPersonalBests}
      />
    </div>
  );
};

export default DrawerContent;
