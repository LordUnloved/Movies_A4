const knex = require("../db/connection");

function list() {
  return knex("reviews");
}

function read(reviewId) {
  return knex("reviews").where({ review_id: reviewId });
}

function update(updatedReview, reviewId) {
  return knex("reviews")
    .select("*")
    .where({ review_id: reviewId })
    .update({ ...updatedReview, updated_at: knex.fn.now() })
    .then((updatedRecords) => updatedRecords[0]);
}

function getCritic(criticId) {
  return knex("critics").where({ critic_id: criticId }).select();
}

function destroy(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).del();
}

module.exports = {
  list,
  read,
  update,
  getCritic,
  destroy,
};
