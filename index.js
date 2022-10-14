var http = require('http');
const web3 = require('web3');
const fs = require('fs');

var KeyPath = '';
var KeyData = '';
var KeyWords = new Array();
var times = '';
var password = '';

KeyPath = process.argv[2];
times = process.argv[3];
console.log('KeyPath', KeyPath);
console.log('times', times);
process.argv.forEach((val, index) => {
    if (index > 2) {
        KeyWords.push(val);
    }
});
console.log('KeyWords', KeyWords);

fs.readFile(KeyPath, 'utf-8', ((err, data) => {
    // console.log('KeyData', data);
    KeyData = data;
    var web33 = new web3(web3.givenProvider || "ws://localhost:8555");//密码正确和这个没有关系。



    try {
        var ret = web33.eth.accounts.decrypt(KeyData, password);
        console.log("succ");
    }
    catch (e) {
        console.log("failed");
    }

    console.log("final");
}));



