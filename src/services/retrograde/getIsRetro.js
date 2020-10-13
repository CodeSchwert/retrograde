import isRetroMonth from './isRetroMonth';
import retroData from '../../data/retro.json';

/**
 * @name getIsRetro
 * @description Calculate which planets are retro and returns the "isRetro" object.
 * @returns {Object} isRetro { planet: boolean }
 */
const getIsRetro = () => {
  const isRetro = {};

  for (const planet in retroData) {
    console.log('getIsRetro', planet);
    isRetro[planet.toLowerCase()] = isRetroMonth(retroData[planet]);
  }

  return isRetro;
};

export default getIsRetro;
