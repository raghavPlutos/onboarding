const { Model } = require('objection');
const Knex = require('knex');

var options = {
    staging: {
          client: 'mysql',
          connection: {
            host: "127.0.0.1",
            user: "root", // replace with your mysql username
            password: "123456", // replace with your mysql password
            database: "onboardingPlutos" // replace with your db name
          },
        // migrations: {
        //     directory: __dirname + '/migrations',
        //   },
        // seeds: {
        //     directory: __dirname + '/seeds',
        //   },
      },
    production: {
        client: 'mysql',
        connection: process.env.DATABASE_URL,
        // migrations: {
        //     directory: __dirname + '/migrations',
        //   },
        // seeds: {
        //     directory: __dirname + '/seeds/production',
        //   },
      },
  };


const environment = /*process.env.NODE_ENV ||*/ 'staging';
const config = options[environment];
const knex = Knex(config);
Model.knex(knex)
module.exports = knex;