import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("compras", (table) => {
    table.increments("id").primary();
    table.integer("quantidade").notNullable();
    table.decimal("valor").notNullable();
    table.string("data").notNullable();
    table.string("anotacao");

    table
      .integer("produto_id")
      .notNullable()
      .references("id")
      .inTable("produtos")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("compras");
}
