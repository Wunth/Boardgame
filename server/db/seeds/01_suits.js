export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('suits').del()

  // Inserts seed entries
  await knex('suits').insert([
    { id: 1, name: 'spades' },
    { id: 2, name: 'clubs' },
    { id: 3, name: 'hearts' },
    { id: 4, name: 'diamonds' },
    { id: 5, name: 'wild' },
  ])
}
