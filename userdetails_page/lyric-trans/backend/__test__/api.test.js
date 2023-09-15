const request = require('supertest');
const app = require('../app');

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

// Post testing

describe("POst /addData", () => {
    
    it('Should post data to backend', async() => {
        const payload = {"Username" : "Raj" , "Email" : "raj@gmail.com" , "Phone" :3009086220 , "Password" : "Raj@123", "Language" : "English" , "Role" : "Reviewer"}
        const res = await request(app).post('/userdata').send(payload);
        expect(res.status).toBe(201)
    })

    it('Should post data within 200ms', async() => {
        const payload = {"Username" : "Roja" , "Email" : "roja@gmail.com" , "Phone" : 7905505069 , "Password" : "Roja@123" , "Language" : "Tamil", "Role" : "Reviewer"}
        const startTime = Date.now();
        const res = await request(app).post('/userdata').send(payload);
        const endTime = Date.now();
        const resTime = endTime - startTime;
        // console.log(resTime);
        expect(res.status).toBe(201);
        expect(resTime).toBeLessThan(200); 
    })

    it('Error -> Length exceeds the limit', async() => {
        const payload = {"Username" : "BalaBalaBalaBalaBalaBala" , "email" : "bala@gmail.com" , "phone" : 1111111111 , "password" : "kjbfkgdjygfege" , "language" : "Tamil", "role" : "Translator"}
        const res = await request(app).post('/userdata').send(payload);
        expect(res.status).toBe(400);
    })
})

// // update testing 

// describe("Update /edit data", () => {

//     it('Should edit the data in the backend', async() => {
//         const payload = {"name" : "Mendix" , "email" : "mendix@gmail.com" , "phone" : 9906669898 , "language" : "Tamil" , "role" : "Reviewer", "id" : 19}
//         const res = await request(app).put('/editdata').send(payload);
//         expect(res.status).toBe(200);
//     })

//     it('Should edit data within 200ms', async() => {
//         const payload = {"name" : "Rajam" , "email" : "Rajam@gmail.com" , "phone" : 7799970076 , "language" : "English" , "role" : "Reviewer", "id" : 20}
//         const startTime = Date.now();
//         const res = await request(app).put('/editdata').send(payload);
//         const endTime = Date.now();
//         const resTime = endTime - startTime;
//         expect(res.status).toBe(200);
//         expect(resTime).toBeLessThan(200);
//     })

//     it('Error -> Length exceeds the limit', async() => {
//         const payload = {"name" : "BalakumarBalakumarBalakumar" , "email" : "balakumar@gmail.com" , "phone" : 9999999999 , "language" : "English" , "role" : "Reviewer", "id" : 4}
//         const res = await request(app).put('/editdata').send(payload);
//         expect(res.status).toBe(400);
//     })
// })

// // delete testing

// describe('Delete /remove data', () => {

//     it('Should delete a data', async() => {
//         const payload = { "id" : 19 }
//         const res = await request(app).delete('/deletedata').send(payload);
//         expect(res.status).toBe(200);
//     })

//     it('Should delete data within 200ms', async() => {
//         const payload = { "id" : 20}
//         const startTime = Date.now();
//         const res = await request(app).delete('/deletedata').send(payload);
//         const endTime = Date.now();
//         const resTime = endTime - startTime;
//         expect(res.status).toBe(200);
//         expect(resTime).toBeLessThan(200);
//     })

//     it('Error -> id does not exist', async() => {
//         const payload = {"id" : 13}
//         const res = await request(app).delete('/deletedata').send(payload);
//         expect(res.status).toBe(404);
//     })

// })

// // another get testing

// describe ('Get /fetch', () => {
    
//     it('Should return set of data', async() => {
//         const res = await request(app).get('/userdetails/8');
//         expect(res.status).toBe(200);
//     })

//     it('Should return data within 200ms', async() => {
//         const startTime = Date.now();
//         const res = await request(app).get('/userdetails/9');
//         const endTime = Date.now();
//         const resTime = endTime - startTime;
//         expect(res.status).toBe(200);
//         expect(resTime).toBeLessThan(200);
//     })

//     it('Error -> id not found', async() => {
//         const res = await request(app).get('/userdetails/24');
//         expect(res.status).toBe(404);
//     })

// })