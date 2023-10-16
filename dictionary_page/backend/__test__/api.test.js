const request = require('supertest');
const app = require('../controller');

// Test cases for getting the data

describe('Get /fetch', () => {
    it('Should return the datas',async() => {
        const res = await request(app).get('/getcategory');
        expect(res.status).toBe(200);
    })

    it('Response time should be less than 200ms', async() => {
        const startTime = Date.now();
        const res = await request(app).get('/getcategory');
        const endTime = Date.now();
        const resTime = endTime - startTime;
        expect(res.status).toBe(200);
        expect(resTime).toBeLessThan(200);
    })

    it('Response data should be an array', async() => {
        const res = await request(app).get('/getcategory');
        expect(Array.isArray(res.body)).toBe(true);
    })
})

describe('Get /fetch', () => {
    it('Should return the datas',async() => {
        const res = await request(app).get('/getdictionary');
        expect(res.status).toBe(200);
    })

    it('Response time should be less than 200ms', async() => {
        const startTime = Date.now();
        const res = await request(app).get('/getdictionary');
        const endTime = Date.now();
        const resTime = endTime - startTime;
        expect(res.status).toBe(200);
        expect(resTime).toBeLessThan(200);
    })

    it('Response data should be an array', async() => {
        const res = await request(app).get('/getdictionary');
        expect(Array.isArray(res.body)).toBe(true);
    })
})

describe('Get /fetch', () => {
    it('Should return the datas',async() => {
        const res = await request(app).get('/getlanguage');
        expect(res.status).toBe(200);
    })

    it('Response time should be less than 200ms', async() => {
        const startTime = Date.now();
        const res = await request(app).get('/getlanguage');
        const endTime = Date.now();
        const resTime = endTime - startTime;
        expect(res.status).toBe(200);
        expect(resTime).toBeLessThan(200);
    })

    it('Response data should be an array', async() => {
        const res = await request(app).get('/getlanguage');
        expect(Array.isArray(res.body)).toBe(true);
    })
})

describe('Get /fetch', () => {
    it('Should return the datas',async() => {
        const res = await request(app).get('/getsubcategory');
        expect(res.status).toBe(200);
    })

    it('Response time should be less than 200ms', async() => {
        const startTime = Date.now();
        const res = await request(app).get('/getsubcategory');
        const endTime = Date.now();
        const resTime = endTime - startTime;
        expect(res.status).toBe(200);
        expect(resTime).toBeLessThan(200);
    })

    it('Response data should be an array', async() => {
        const res = await request(app).get('/getsubcategory');
        expect(Array.isArray(res.body)).toBe(true);
    })
})

