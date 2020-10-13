import { Router } from 'express';
import Retrograde from '../services/retrograde';

const retrogradeRouter = (RetroData) => {
  const router = Router();

  router.get('/retrograde', (req, res) => {
    const isRetro = Retrograde.getIsRetro();
    const retroPeriods = Retrograde.getRetroPeriods();

    return res.status(200).json({ isRetro, retroPeriods });
  });

  router.get('/is_retrograde', (req, res) => {
    const isRetro = Retrograde.getIsRetro();

    return res.status(200).json(isRetro);
  });

  return router;
};

export default retrogradeRouter;
