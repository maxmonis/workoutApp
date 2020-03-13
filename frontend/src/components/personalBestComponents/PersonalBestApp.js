import React from 'react';

const PersonalBestApp = ({ personalBests, currentLift }) => {
  const sortPersonalBests = personalBests => {
    return personalBests.sort((a, b) => {
      const textA = a.lift.toUpperCase();
      const textB = b.lift.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
  };
  const currentPersonalBests = sortPersonalBests(
    personalBests.filter(personalBest => !personalBest.surpassed)
  );
  const previousPersonalBests = sortPersonalBests(
    personalBests.filter(personalBest => personalBest.surpassed)
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
