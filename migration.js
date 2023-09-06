const { Model } = require("objection");
const Knex = require("knex");


const knex = Knex({
client: 'mysql',
      connection: {
        host: "127.0.0.1",
        user: "root", // replace with your mysql username
        password: "123456", // replace with your mysql password
        database: "onboardingPlutos", // replace with your db name
      },
    //     migrations: {
    //       directory: './migrations'
    //       // tableName: 'users'
    //   },
});

Model.knex(knex);

async function createSchema() {
  if (await knex.schema.hasTable('customers')) {
    console.log("table exist");
    return;
  }

  // Create database schema. You should use knex migration files
  // to do this. We create it here for simplicity.
  await knex.schema
  .createTable('customers', table => {
    table.increments('id').primary();
    // table.integer('parentId').references('persons.id');
    table.string("email").notNullable().unique();
    table.string("name").notNullable();
    table.string("password").notNullable();
    table.string("role").notNullable();
    table.timestamps(true, true);
  })
  .createTable('vouchers', table => {
    table.increments('id').primary();
    // table.integer('parentId').references('persons.id');
    table.string("code").notNullable().unique();
    table.string("company_name").notNullable();
    table.string("description").notNullable();
    table.boolean("used").notNullable();
    table.string("type").notNullable();
    table.integer("usedBy").unsigned();
    table.foreign("usedBy").references("customers.id");
    table.string("expiry").notNullable();
    table.timestamps(true, true);
  });
}

createSchema()
  .then(() => knex.destroy())
  .catch(err => {
    console.error(err);
    return knex.destroy();
});