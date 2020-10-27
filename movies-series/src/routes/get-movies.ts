import express, { Request, Response } from 'express';
import { Movie } from '../models/movie';

const router = express.Router();

router.get('/api/movies-series/movies', async (req: Request, res: Response) => {
    // TODO - create a filter handler in the model - Movie.filters(req.query).
    const filters: { category?: string } = {};

    const category = req.query.category as string;
    if (category) {
      filters.category = category;
    }

    const query = Movie.find(filters).populate('actors').populate('director');

    const sort_by = req.query.sort_by as string;
    if (sort_by && ['rate', '-rate'].includes(sort_by)) {
      query.sort(sort_by)
    }

    const movies = await query.exec()

    res.send(movies);
});

export { router as getMoviesRouter };
