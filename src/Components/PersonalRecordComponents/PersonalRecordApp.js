import React from 'react';

export default function PersonalRecordDisplay({ personalRecords }) {
  const sortPRs = PRs => {
    return PRs.sort((a, b) => {
      const textA = a.lift.toUpperCase();
      const textB = b.lift.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
  };
  const currentPRs = sortPRs(personalRecords.filter(PR => !PR.surpassed));
  const formerPRs = sortPRs(personalRecords.filter(PR => PR.surpassed));
  return (
    <div>
      {currentPRs.length > 0 && <h2>Personal Bests</h2>}
      {currentPRs.length > 0 &&
        currentPRs.map(PR => <h3 key={PR.id}>{PR.printout}</h3>)}
      {formerPRs.length > 0 && <h2>Broken Records</h2>}
      {formerPRs.length > 0 &&
        formerPRs.map(PR => (
          <div key={PR.id}>
            <h3>{PR.printout}</h3>
            <h5>
              {PR.acheived}-{PR.surpassed}
            </h5>
          </div>
        ))}
    </div>
  );
}
