import React from 'react';

import alphabetize from '../../functions/alphabetize';
import organizeWorkout from '../../functions/organizeWorkout';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const PersonalBestApp = ({ personalBests }) => {
  const currentPersonalBests = organizeWorkout(
    alphabetize(
      personalBests.filter(personalBest => !personalBest.surpassed),
      'lift'
    )
  );
  const previousPersonalBests = alphabetize(
    personalBests.filter(personalBest => personalBest.surpassed),
    'lift'
  );
  if (currentPersonalBests) {
    return (
      <div style={{ width: '450px', marginTop: '20px' }}>
        <Paper style={{ padding: '20px' }}>
          {currentPersonalBests.length > 0 && (
            <div>
              <Typography variant='h4'>Personal Bests</Typography>
              {currentPersonalBests.map(personalBest => (
                <Typography variant='h5' key={personalBest.id}>
                  {personalBest.lift}: {personalBest.printout}
                </Typography>
              ))}
            </div>
          )}
          {previousPersonalBests.length > 0 && (
            <div>
              <Typography variant='h4'>Broken Records</Typography>
              {previousPersonalBests.map(personalBest => (
                <div key={personalBest.id}>
                  <Typography variant='h5'>
                    {personalBest.lift}: {personalBest.printout}
                  </Typography>
                  <Typography variant='h6'>
                    {personalBest.becamePersonalBest}-{personalBest.surpassed}
                  </Typography>
                </div>
              ))}
            </div>
          )}
        </Paper>
      </div>
    );
  }
  return null;
};

export default PersonalBestApp;
