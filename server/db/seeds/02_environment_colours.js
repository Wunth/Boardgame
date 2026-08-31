export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('environment_colours').del()

  // Inserts seed entries
  await knex('environment_colours').insert([
    { id: 1, name: 'red' },
    { id: 2, name: 'yellow' },
    { id: 3, name: 'green' },
    { id: 4, name: 'blue' },
    { id: 5, name: 'white' },
  ])
}
