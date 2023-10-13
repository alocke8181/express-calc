const express = require('express');
const ExpError = require('./expError');
const math = require('mathjs');
const app = express();


app.get('/mean',(req, res, next) =>{
    console.log('mean');
    let numsString = req.query.nums;
    if (!numsString){
        const e = new ExpError('nums are required',400);
        return next(e);
    };
    let numStrArray = numsString.split(',');
    let sum = 0;
    for (let i = 0; i < numStrArray.length; i++){
        let eachNumStr = numStrArray[i]
        let eachNum = parseInt(eachNumStr);
        console.log(eachNum);
        if(math.isNaN(eachNum)){
            console.log('nan');
            const e = new ExpError(`${eachNumStr} is not a number`,400);
            return next(e);
        }else{
            sum = sum + eachNum;
        };
    };
    let mean = parseFloat(sum/numStrArray.length);
    return res.json({operation : 'mean', value : mean});
});

app.get('/median',(req,res,next)=>{
    console.log('median');
    let numsString = req.query.nums;
    if (!numsString){
        const e = new ExpError('nums are required',400);
        return next(e);
    };
    let numStrArray = numsString.split(',');
    let numArray = [];
    for (let i = 0; i < numStrArray.length; i++){
        let eachNumStr = numStrArray[i]
        let eachNum = parseInt(eachNumStr);
        if(math.isNaN(eachNum)){
            const e = new ExpError(`${eachNumStr} is not a number`,400);
            return next(e);
        }else{
            numArray.push(eachNum);
        };
    };
    let len = numArray.length;
    if (len%2 ==0){
        let numOne = numArray[(len/2)-1];
        let numTwo = numArray[(len/2)];
        let median = parseFloat((numOne+numTwo)/2);
        return res.json({operation : 'median', value : median});
    }else{
        let median = numArray[Math.floor(len/2)];
        return res.json({operation : 'median', value : median});
    };
});

app.get('/mode', (req,res,next)=>{
    console.log('mode');
    let numsString = req.query.nums;
    if (!numsString){
        const e = new ExpError('nums are required',400);
        return next(e);
    };
    let numStrArray = numsString.split(',');
    let numObj = {};
    for (let i = 0; i < numStrArray.length; i++){
        let eachNumStr = numStrArray[i]
        let eachNum = parseInt(eachNumStr);
        if(math.isNaN(eachNum)){
            const e = new ExpError(`${eachNumStr} is not a number`,400);
            return next(e);
        }else{
            if(eachNum in numObj){
                numObj[eachNum] = numObj[eachNum] + 1;
            }else{
                numObj[eachNum] = 1;
            };
        };
    };

    let mode = Object.keys(numObj)[0];
    let modeTies = [];
    for (eachKey in numObj){
        if(numObj[eachKey] > numObj[mode]){
            mode = parseInt(eachKey);
            modeTies = [];
        }else if(numObj[eachKey] == numObj[mode] && eachKey != mode){
            modeTies.push(parseInt(mode));
            modeTies.push(parseInt(eachKey));
            mode = null;
        };
    };
    if (mode){
        return res.json({operation : 'mode', value : mode});
    };
    if (modeTies){
        return res.json({operation : 'mode', value : modeTies});
    };

});

app.use((req,res,next) =>{
    const e = new ExpError('page not found',404);
    return next(e);
});

app.use((error,req,res,next)=>{
    console.log(error);
    return res.status(error.status).json({message : error.message, status : error.status});
});

app.listen(5500, () =>{console.log('Server running on port 5500')});