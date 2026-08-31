export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('gem_colours').del()

  // Inserts seed entries
  await knex('gem_colours').insert([
    { id: 1, name: 'red' },
    { id: 2, name: 'white' },
    { id: 3, name: 'yellow' },
    { id: 4, name: 'green' },
    { id: 5, name: 'blue' },
    { id: 6, name: 'orange' },
    { id: 7, name: 'purple' },
    { id: 8, name: 'black' },
  ])
}
