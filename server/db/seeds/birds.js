/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('birds').del()
  await knex('birds').insert([
    {
      id: 1,
      name: 'Penguin',
      type: 'spheniscidae',
      color: 'black, white',
      size: 'medium',
      habitat: 'antarctic',
      can_fly: false,
    },
    {
      id: 2,
      name: 'Kiwi',
      type: 'apterygidae',
      color: 'brown',
      size: 'small',
      habitat: 'New Nealand',
      can_fly: false,
    },
    {
      id: 3,
      name: 'Tui',
      type: 'Prosthemadera novaeseelandiae',
      color: 'dark green, white',
      size: 'medium',
      habitat: 'New Zealand',
      can_fly: true,
    },
  ])
}
