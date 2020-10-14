/**
 * @name isRetroMonth
 * @description Determine if a planet is currently retrograde   
 *              given an array of retrograde period objecs.
 * @param {Array} retroPeriods - Array of retrograde periods
 * @returns {Boolean} true|false
 */
const isRetroMonth = (retroPeriods /** array */) => {
  let isRetro = false;
  const currentTime = new Date().getTime();
  
  for (const period of retroPeriods) {
    const { startDateTime, endDateTime } = period;

    if (
      currentTime >= startDateTime && 
      currentTime <= endDateTime
    ) {
      isRetro = true;
    }
  }

  return isRetro;
};

export default isRetroMonth;
