const request = require('supertest');
const app = require('../app');
const { describe } = require('test');

// Sample Testcases
describe('GET /', () => {
    it('sample test to check the backend connection',async() => {
        const res=await request(app).get('/');
        expect(res.status).toBe(200);
    });
});

//GET / fetch endpoint testing
describe('GET /fetch', () => {
    it('Should return set of data',async() => {
        const res=await request(app).get('/data')
        expect(res.status).toBe(200);
    })
    
    it('Response time should be less than 200ms',async() => {
        const startTime=Date.now();
        const res=await request(app).get('/data');
        const endTime=Date.now();
        const resTime=(endTime-startTime);
        expect(res.status).toBe(200);
        expect(resTime).toBeLessThan(200);
    })
    
    it('Response data should be in the correct format', async() => {
        const res=await request(app).get('/data');
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.objectContaining([{
            username: expect.any(String),
            password: expect.any(String),
            id: expect.any(Number),       
        }]))
    })
    
    it('Response data should be an array',async() => {
        const res=await request(app).get('/data');
        expect(Array.isArray(res.body)).toBe(true);
    })    
})


// post testing

describe('POST /create', () => {
    it('Should POST data to backend', async() => {
        const payload = {"username" : "Damon" , "password" : "damon11", "id" : 5}
        const res = await request(app).post('/createUser').send(payload);
        expect(res.status).toBe(201);
    })

    it("Response time should be less than 200ms", async() => {
        const payload = {"username" : "Klaus" , "password" : "klaus11", "id" : 6};
        const startTime = Date.now();
        const res = await request(app).post('/createUser').send(payload);
        const endTime = Date.now();
        const resTime = endTime - startTime;
        expect(res.status).toBe(201);
        expect(resTime).toBeLessThan(200);
    })

    it('Error -> Length exceeds the limit', async() => {
        const payload = {"username" : "Damon" , "password" : "kbysgiguggutfthfhgfytfytfdyttfytsfuysfxtasd"}
        const res=await request(app).post('/createUser').send(payload);
        expect(res.status).toBe(400);
    })
})

// update testing

describe('PUT /update', () => {

    it('Should update the entries in the database', async() => {
        const payload = {"username" : "Rithick" , "id": 2}
        const res= await request(app).put('/updateUser').send(payload);
        expect(res.status).toBe(200);
    })

    it('Should update less than 200ms',async() => {
        const payload = {"username" : "Arun" , "id" : 3}
        const startTime = Date.now();
        const res = await request(app).put('/updateUser').send(payload);
        const endTime = Date.now();
        const resTime = endTime - startTime;
        expect(res.status).toBe(200);
        expect(resTime).toBeLessThan(200);
    })

    it('Error -> Length exceeds the limit', async() => {
        const payload = {"username" : "qwertyuiopasdfghjkl;zxcvbnm" , "id" : 6}
        const res = await request(app).put('/updateUser').send(payload);
        expect(res.status).toBe(400);
    })
})

// Delete testing

describe("DELETE /remove", () => {

    it("Should delete entries in the database", async() => {
        const payload = {"id" : 5}
        const res= await request(app).delete('/removeUser').send(payload);
        expect(res.status).toBe(200);
    })

    it("Should remove within 200ms", async() => {
        const payload = {"id" : 6};
        const startTime = Date.now();
        const res = await request(app).delete('/removeUser').send(payload);
        const endTime = Date.now();
        const resTime = endTime - startTime;
        expect (res.status).toBe(200);
        expect (resTime).toBeLessThan(200);
    })

    it("Error-> id does not exist", async() => {
        const payload={"id" : 6};
        const res=await request(app).delete('/removeUser').send(payload);
        expect (res.status).toBe(404);
    })
})

// post for authentication 

describe('POST /authData', () => {

    it('Should check the datas in database', async() => {
        const payload = {"username" : "Gowtham" , "password" : "gowtham11"}
        const res = await request(app).post('/authData').send(payload);
        expect (res.status).toBe(200);
    })

    it('Should chech within 200ms', async() => {
        const payload = {"username" : "Arun" , "password" : "arun11"}
        const startTime = Date.now();
        const res = await request(app).post('/authData').send(payload);
        const endTime = Date.now();
        const resTime = endTime - startTime;
        expect (res.status).toBe(200)
        expect (resTime).toBeLessThan(200);
        })

        it('Error -> Username or Password is incorrect', async() => {
            const payload={"username" : "John" , "password" : "johnjohjdbh"}
            const res=await request(app).post('/authData').send(payload);
            expect (res.status).toBe(401);
        })
})