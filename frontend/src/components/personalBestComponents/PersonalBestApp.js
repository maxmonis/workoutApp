import React from 'react';

import alphabetize from '../../functions/alphabetize';

const PersonalBestApp = ({ personalBests, currentLift }) => {
  const currentPersonalBests = alphabetize(
    personalBests.filter(personalBest => !personalBest.surpassed),
    'lift'
  );
  const previousPersonalBests = alphabetize(
    personalBests.filter(personalBest => personalBest.surpassed),
    'lift'
  );
  const currentLiftPersonalBests = currentPersonalBests.filter(
    personalBest => personalBest.lift === currentLift
  );
  if (currentPersonalBests) {
    return (
      <div>
        {currentLiftPersonalBests.length > 0 && (
          <div>
            <h2>{currentLift} Personal Bests</h2>
            {currentLiftPersonalBests.map(personalBest => (
              <h3 key={personalBest.id}>{personalBest.printout}</h3>
            ))}
          </div>
        )}
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
