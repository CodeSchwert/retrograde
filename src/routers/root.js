import { Router } from 'express';

const rootRouter = () => {
  const router = Router();
  
  router.get('/', (req, res) => {
    const { protocol, headers } = req;
    const url = `${protocol}://${headers.host}`;

    return res.status(200).json({
      links: {
        docs: {
          openapi: `${url}/openapi`
        },
        api: {
          retrograde: `${url}/api/astrology/retrograde`,
          is_retrograde: `${url}/api/astrology/is_retrograde`          
        }
      }
    });
  });

  return router;
};

export default rootRouter;
