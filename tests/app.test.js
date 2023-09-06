const request = require("supertest");
const router = require("../routes/customerRoutes");
const knex = require("../config/db");
const express = require("express");
afterAll(() => knex.destroy());
const app = express();



app.use(express.json());
app.use(router);

test("Checking login", async () =>{
    await request(app)
        .post("/login")
        .send({email:"raghav1@gmail.com", password:"abcdef"})
        .set('Accept', 'application/json')
        .then(response => {
            expect(response.statusCode).toBe(200);
            expect(typeof response.body.id).toBe("number");
            expect(typeof response.body.name).toBe("string");
        })
})