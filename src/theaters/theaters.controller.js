const asyncErrorBoundary = require("../utils/errors/asyncErrorBoundary");
const service = require("./theaters.service");

async function list(req, res) {
  const theaters = await service.list();
  const theatersAndMovies = await Promise.all(
  theaters.map(async theater => {
  const { theater_id } = theater;
  const movies = await service.getMovies(theater_id);
  return { ...theater, movies };
  })
  );
  return res.status(200).json({ data: theatersAndMovies });
  }
  
module.exports = {
  list: [asyncErrorBoundary(list)],
};
