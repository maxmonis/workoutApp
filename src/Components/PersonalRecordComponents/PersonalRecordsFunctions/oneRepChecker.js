export default (personalRecords, currentLift, currentWeight) => {
  let ruledOut = false;
  const sameLift = personalRecords.filter(PR => PR.lift === currentLift);
  sameLift.forEach(PR => {
    if (PR.weight >= currentWeight) {
      ruledOut = true;
      return;
    }
  });
  if (!ruledOut) {
    const date = new Date();
    const currentDate = date.toLocaleDateString();
    const currentId = `${currentLift}: ${currentWeight}`;
    return {
      id: currentId,
      type: 'oneRepPR',
      lift: currentLift,
      weight: currentWeight,
      date: currentDate,
      broken: false
    };
  }
  return false;
};
