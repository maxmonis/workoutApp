import React from 'react';

const PersonalBestApp = ({ personalBests }) => {
  const currentPersonalBests = personalBests.filter(
    personalBest => !personalBest.surpassed
  );
  const previousPersonalBests = personalBests.filter(
    personalBest => personalBest.surpassed
  );
  if (currentPersonalBests) {
    const sortPBs = PBs => {
      return PBs.sort((a, b) => {
        const textA = a.lift.toUpperCase();
        const textB = b.lift.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
    };
    const currentPBs = sortPBs(currentPersonalBests);
    const formerPBs = sortPBs(previousPersonalBests);
    return (
      <div>
        {currentPBs.length > 0 && <h2>Personal Bests</h2>}
        {currentPBs.length > 0 &&
          currentPBs.map(PB => (
            <h3 key={PB.id}>
              {PB.lift}: {PB.printout}
            </h3>
          ))}
        {formerPBs.length > 0 && <h2>Broken Records</h2>}
        {formerPBs.length > 0 &&
          formerPBs.map(PB => (
            <div key={PB.id}>
              <h3>
                {PB.lift}: {PB.printout}
              </h3>
              <h5>
                {PB.becamePersonalBest}-{PB.surpassed}
              </h5>
            </div>
          ))}
      </div>
    );
  }
  return null;
};

export default PersonalBestApp;