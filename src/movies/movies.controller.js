const service = require("./movies.service");
const asyncErrorBoundary = require("../utils/errors/asyncErrorBoundary");

//MIDWARE
async function movieExists(req, res, next){
  const { movieId } = req.params;
  const match = await service.read(Number(movieId));
  if (match.length === 0 || !movieId)
    return next({
      status: 404,
      message: `movieId: ${movieId} does not exist in the database`,
    });
  res.locals.movie = match[0];
  next();
};

//ROUTES

async function list(req, res) {
  const { is_showing = false } = req.query;
  const data = is_showing ? (await service.listShowing()).slice(0, 15) : await service.list();
  
  return res.status(200).json({ data });
  }

async function read(req, res) {
  res.status(200).json({ data: res.locals.movie });
}

async function listReviews(req, res) {
  const movieId = res.locals.movie.movie_id;
  const reviews = await service.listReviews(movieId);
  const allReviews = [];
  for (let i = 0; i < reviews.length; i++) {
    const review = reviews[i];
    const critic = await service.getCritics(review.critic_id);
    review.critic = critic[0];
    allReviews.push(review);
  }
  res.status(200).json({ data: allReviews });
}

async function listTheaters(req, res) {
  const movieId = res.locals.movie.movie_id;
  const result = await service.listTheaters(movieId);
  res.status(200).json({ data: result });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
  listReviews: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(listReviews),
  ],
  listTheaters: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(listTheaters),
  ],
};
