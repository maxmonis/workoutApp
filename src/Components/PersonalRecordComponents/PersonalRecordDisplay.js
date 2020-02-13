import React from 'react';

export default function PersonalRecordDisplay({
  personalRecords
}) {
  const sortPRs = PRs => {
    return PRs.sort((a, b) => {
      const textA = a.lift.toUpperCase();
      const textB = b.lift.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
  };
  const sortedPRs = sortPRs(personalRecords);
  return (
    <div>
      {sortedPRs.map(PR => (
        <h3 key={PR.id}>{PR.id}</h3>
      ))}
    </div>
  );
}
