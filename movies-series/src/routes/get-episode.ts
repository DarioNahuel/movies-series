import express, { Request, Response } from 'express';
import { Serie } from '../models/serie';

const router = express.Router();

router.get('/api/movies-series/series/:title/:season_number/:episode_number', async (req: Request, res: Response) => {
  const { title, season_number, episode_number } = req.params;
  
  const result: any = await Serie.findOne({ title }).populate('director').populate({
    path: 'seasons',
    select: '_id number',
    match: {
      number: season_number,
    },
    populate: {
      path: 'episodes',
      select: '_id number',
      match: {
        number: episode_number
      }
    },
  }).lean();

  const episodes = result?.seasons[0]?.episodes.length > 0 ? {
    serie_title: result.title,
    director: result.director.name,
    season: result.seasons[0].number,
    episode: result.seasons[0].episodes[0].number
  } : {};

  res.send(episodes);
});

export { router as getEpisodeRouter };
