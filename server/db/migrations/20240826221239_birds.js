/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('birds', (table) => {
    table.increments('id')
    table.string('name')
    table.string('type')
    table.string('color')
    table.string('size')
    table.string('habitat')
    table.boolean('can_fly')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('birds')
}
