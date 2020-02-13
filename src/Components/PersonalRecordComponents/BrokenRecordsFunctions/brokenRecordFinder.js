import brokenMultiSetFinder from './brokenMultiSetFinder';
import brokenOneSetFinder from './brokenOneSetFinder';
import brokenOneRepFinder from './brokenOneRepFinder';

export default (personalRecords, newPR) => {
  switch (newPR.type) {
    case 'multiRepPR':
      return brokenMultiSetFinder(personalRecords, newPR);
    case 'oneSetPR':
      return brokenOneSetFinder(personalRecords, newPR);
    case 'oneRepPR':
      return brokenOneRepFinder(personalRecords, newPR);
    default:
      return;
  }
};
