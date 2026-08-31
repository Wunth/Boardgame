  // npm run knex migrate:latest
export async function up(knex) {
  return knex.schema
  .createTable('suits', (table) => {
    table.increments('id')
    table.string('name')
  })
  .createTable('gem_colours', (table) => {
    table.increments('id')
    table.string('name')
  })
  .createTable('environment_colours', (table) => {
    table.increments('id')
    table.string('name')
  })
  .createTable('environment_deck', (table) => {
    table.increments('id')
    table.integer('suit_id').references('suits.id')
    table.integer('environment_colour_id').references('environment_colours.id')
  })
}

export async function down(knex) {
  return knex.schema
  .dropTable('environment_deck')
  .dropTable('environment_colours')
  .dropTable('gem_colours')
  .dropTable('suits')
}