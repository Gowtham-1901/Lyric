const request = require('supertest');
const app = require('../app');
 
// Get testing
 
describe('Get /fetch', () => {

    it('Should return set of data', async() => {
        const res= await request(app).get('/')
        expect(res.status).toBe(200);
    })
 
    it('Response time should be less than 200ms', async() => {
        const startTime = Date.now();
        const res = await request(app).get('/')
        const endTime = Date.now();
        const resTime = endTime - startTime;
        expect(res.status).toBe(200);
        expect(resTime).toBeLessThan(200);
    })

    it('Response data should be an array', async() => {
        const res = await request(app).get('/');
        expect(Array.isArray(res.body)).toBe(true);
    })

})

// update testing

describe("Update /edit data", () => {

    it('Should edit the data in the backend', async() => {
        const payload = { "firstname" : "Arun" , "lastname" : "Kumar" , "email" : "arunkumar@gmail.com" , "phone" :8747754526 , "language" : "English", "role" : "Translator" , "id" : 2} 
        const res = await request(app).put('/editdata').send(payload);
        expect(res.status).toBe(200);
    })

    it('Should edit data within 200ms', async() => {
        const payload = {"firstname" : "Rithi" , "lastname" : "Ram" , "email" : "rithiram@gmail.com" , "phone" :8727659556 , "language" : "Tamil", "role" : "Reviewer" , "id" : 1}
        const startTime = Date.now();
        const res = await request(app).put('/editdata').send(payload);
        const endTime = Date.now();
        const resTime = endTime - startTime;
        expect(res.status).toBe(200);
        expect(resTime).toBeLessThan(200);
    })

    it('Error -> ID does exists', async() => {
        const payload = {"firstname" : "Pubg" , "lastname" : "Game" , "email" : "pubg@gmail.com" , "phone" :8747658556 , "language" : "English", "role" : "Translator" , "id" : 5}
        const res = await request(app).put('/editdata').send(payload);
        expect(res.status).toBe(404);
    })

})