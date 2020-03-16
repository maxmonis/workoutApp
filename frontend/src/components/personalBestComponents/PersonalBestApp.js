import React from 'react';

import alphabetize from '../../functions/alphabetize';
import organizeWorkout from '../../functions/organizeWorkout';

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
      <div>
        {currentPersonalBests.length > 0 && (
          <div>
            <h2>Personal Bests</h2>
            {currentPersonalBests.map(personalBest => (
              <h3 key={personalBest.id}>
                {personalBest.lift}: {personalBest.printout}
              </h3>
            ))}
          </div>
        )}
        {previousPersonalBests.length > 0 && (
          <div>
            <h2>Broken Records</h2>
            {previousPersonalBests.map(personalBest => (
              <div key={personalBest.id}>
                <h3>
                  {personalBest.lift}: {personalBest.printout}
                </h3>
                <h5>
                  {personalBest.becamePersonalBest}-{personalBest.surpassed}
                </h5>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
  return null;
};

export default PersonalBestApp;
