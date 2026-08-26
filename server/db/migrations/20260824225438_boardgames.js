/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('boardgames', function (table) {
    table.increments('id')
    table.string('name')
    table.string('player_count')
    table.string('play_time')
    table.string('category')
    table.string('personal_rating')
    table.string('bgg_rating')
    table.string('status')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTableIfExists('boardgames')
};