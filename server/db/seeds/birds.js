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
      fly: false,
      note: 'They are known for swimming skillfully in cold waters. They take turns caring for their young.',
      image: '/images/penguin.avif',
    },
    {
      id: 2,
      name: 'Kiwi',
      type: 'apterygidae',
      color: 'brown',
      size: 'small',
      habitat: 'New Zealand',
      fly: false,
      note: 'Native in NZ, known for their long beaks and nocturnal habits. Lay loong eggs relative to their size.',
      image: '',
    },
    {
      id: 3,
      name: 'Tui',
      type: 'Prosthemadera novaeseelandiae',
      color: 'dark green, white',
      size: 'medium',
      habitat: 'New Zealand',
      fly: true,
      note: 'Native in NZ, known for their iridescent feathers and unique song. They are great mimics and play a key role in pollinating native plants.',
      image: '/images/tui.avif',
    },
    {
      id: 4,
      name: 'Eagle',
      type: 'accipitridae',
      color: 'brown, white',
      size: 'large',
      habitat: 'mountains and forests',
      fly: true,
      note: 'Known for their sharp vision and powerful flight. They are apex predators in many environments.',
      image: '',
    },
  ])
}
