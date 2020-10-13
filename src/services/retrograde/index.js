import getIsRetro from './getIsRetro';
import getRetroPeriods from './getRetroPeriods';
import retroData from '../../data/retro.json';

if (!retroData) {
  throw new Error('Failed to load retro data.');
}

export default {
  getIsRetro,
  getRetroPeriods
};
