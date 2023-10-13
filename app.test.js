const axios = require('axios');

describe('Test if there is a connection by looking for a 404 page', () =>{
    test('Test app connection', ()=>{
        axios.get('http://localhost:5500').then(p => {
            expect(p).not.toBeNull();
            expect(p.data.status).toEqual(404);
            expect(p.data.message).toEqual('page not found');
            //This line keeps axios from printing a bunch of stuff to the console
        }).catch(err => (expect(err.status).toEqual(undefined)));
    });
});

describe('Test mean functionality',()=>{
    test('Test mean with valid numbers', ()=>{
        axios.get('http://localhost:5500/mean?nums=3,3,3').then(p=>{
            expect(p).not.toBeNull();
            expect(p.status).toEqual(200);
            expect(p.data.operation).toEqual('mean');
            expect(p.data.value).toEqual(3);
        });
    });
    test('Test mean with no numbers', ()=>{
        axios.get('http://localhost:5500/mean?nums=').then(p=>{
            expect(p).not.toBeNull();
            expect(p.status).toEqual(400);
            expect(p.data.message).toEqual('nums are required');
            expect(p.data.status).toEqual(400);
        }).catch(err => (expect(err.status).toEqual(undefined)));
    });
    test('Test mean with invalid numbers', ()=>{
        axios.get('http://localhost:5500/mean?nums=3,3,three').then(p=>{
            expect(p).not.toBeNull();
            expect(p.status).toEqual(400);
            expect(p.data.message).toEqual('three is not a number');
            expect(p.data.status).toEqual(400);
        }).catch(err => (expect(err.status).toEqual(undefined)));
    });
});

describe('Test median functionality',()=>{
    test('Test mean with odd amount valid numbers', ()=>{
        axios.get('http://localhost:5500/median?nums=1,2,3,4,5').then(p=>{
            expect(p).not.toBeNull();
            expect(p.status).toEqual(200);
            expect(p.data.operation).toEqual('median');
            expect(p.data.value).toEqual(3);
        });
    });
    test('Test mean with even amount valid numbers', ()=>{
        axios.get('http://localhost:5500/median?nums=1,2,3,4').then(p=>{
            expect(p).not.toBeNull();
            expect(p.status).toEqual(200);
            expect(p.data.operation).toEqual('median');
            expect(p.data.value).toEqual(2.5);
        });
    });
    test('Test mean with no numbers', ()=>{
        axios.get('http://localhost:5500/median?nums=').then(p=>{
            expect(p).not.toBeNull();
            expect(p.status).toEqual(400);
            expect(p.data.message).toEqual('nums are required');
            expect(p.data.status).toEqual(400);
        }).catch(err => (expect(err.status).toEqual(undefined)));
    });
    test('Test mean with invalid numbers', ()=>{
        axios.get('http://localhost:5500/median?nums=1,2,3,4,five').then(p=>{
            expect(p).not.toBeNull();
            expect(p.status).toEqual(400);
            expect(p.data.message).toEqual('five is not a number');
            expect(p.data.status).toEqual(400);
        }).catch(err => (expect(err.status).toEqual(undefined)));
    });
});

describe('Test mode functionality',()=>{
    test('Test mode with only one mode', ()=>{
        axios.get('http://localhost:5500/mode?nums=1,2,2,3').then(p=>{
            expect(p).not.toBeNull();
            expect(p.status).toEqual(200);
            expect(p.data.operation).toEqual('mode');
            expect(p.data.value).toEqual(2);
        });
    });
    test('Test mean with a tie for mode', ()=>{
        axios.get('http://localhost:5500/mode?nums=1,2,2,3,3,4').then(p=>{
            expect(p).not.toBeNull();
            expect(p.status).toEqual(200);
            expect(p.data.operation).toEqual('mode');
            expect(p.data.value).toEqual([2,3]);
        });
    });
    test('Test mean with no numbers', ()=>{
        axios.get('http://localhost:5500/mode?nums=').then(p=>{
            expect(p).not.toBeNull();
            expect(p.status).toEqual(400);
            expect(p.data.message).toEqual('nums are required');
            expect(p.data.status).toEqual(400);
        }).catch(err => (expect(err.status).toEqual(undefined)));
    });
    test('Test mean with invalid numbers', ()=>{
        axios.get('http://localhost:5500/mode?nums=1,2,2,3,four').then(p=>{
            expect(p).not.toBeNull();
            expect(p.status).toEqual(400);
            expect(p.data.message).toEqual('four is not a number');
            expect(p.data.status).toEqual(400);
        }).catch(err => (expect(err.status).toEqual(undefined)));
    });
});