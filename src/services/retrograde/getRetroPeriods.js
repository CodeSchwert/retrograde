import retroData from '../../data/retro.json';

/**
 * @name getRetroPeriod
 * @description This is like a data service interface.
 * @returns {Object} retroPeriods { planet: [] }
 */
const getRetroPeriod = () => {
  return retroData;
};

export default getRetroPeriod;
