/* jslint es6 */
/* jslint node */
const request = require('supertest');
const app = require('../controller');

// Get testing

describe('Get /fetch', () => {
    it('Should return set of data', async() => {
        const res= await request(app).get('/getuserdata')
        expect(res.status).toBe(200);
    })

    it('Response time should be less than 200ms', async() => {
        const startTime = Date.now();
        const res = await request(app).get('/getuserdata')
        const endTime = Date.now();
        const resTime = endTime - startTime; 
        expect(res.status).toBe(200);
        expect(resTime).toBeLessThan(200);
    })

    it('Response data should be an array', async() => {
        const res = await request(app).get('/getuserdata');
        expect(Array.isArray(res.body)).toBe(true);
    })
})

// update testing 

describe("Update /edit data", () => {

    it('Should edit the data in the backend', async() => {
        const payload = {"role" : "Reviewer", "id" : 2}
        const res = await request(app).put('/updateuserdata/:id').send(payload);
        expect(res.status).toBe(200);
    })

    it('Should edit data within 200ms', async() => {
        const payload = {"role" : "Reviewer", "id" : 3}
        const startTime = Date.now();
        const res = await request(app).put('/updateuserdata/:id').send(payload);
        const endTime = Date.now();
        const resTime = endTime - startTime;
        expect(res.status).toBe(200);
        expect(resTime).toBeLessThan(200);
    })

    it('Error -> ID does exists', async() => {
        const payload = {"role" : "Reviewer", "id" : 7}
        const res = await request(app).put('/updateuserdata/:id').send(payload);
        expect(res.status).toBe(404);
    })
})

// delete testing

describe('Delete /remove data', () => {

    it('Should delete a data', async() => {
        const payload = { "id" : 3}
        const res = await request(app).delete('/deleteuserdata').send(payload);
        expect(res.status).toBe(200);
    })

    it('Should delete data within 200ms', async() => {
        const payload = { "id" : 1}
        const startTime = Date.now();
        const res = await request(app).delete('/deleteuserdata').send(payload);
        const endTime = Date.now();
        const resTime = endTime - startTime;
        expect(res.status).toBe(200);
        expect(resTime).toBeLessThan(200);
    })

    it('Error -> id does not exist', async() => {
        const payload = {"id" : 26}
        const res = await request(app).delete('/deleteuserdata').send(payload);
        expect(res.status).toBe(404);
    })

})