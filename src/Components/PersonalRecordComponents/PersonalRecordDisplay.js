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
      {currentPRs.length > 0 && <h2>Current Personal Records</h2>}
      {currentPRs.length > 0 &&
        currentPRs.map(PR => <h3 key={PR.id}>{PR.id}</h3>)}
      {formerPRs.length > 0 && <h2>Former Personal Records</h2>}
      {formerPRs.length > 0 &&
        formerPRs.map(PR => (
          <div key={PR.id}>
            <h3>{PR.id}</h3>
            <h4>
              {PR.acheived}-{PR.surpassed}
            </h4>
          </div>
        ))}
    </div>
  );
}
