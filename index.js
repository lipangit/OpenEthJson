var http = require('http');
const web3 = require('web3');
const fs = require('fs');
const { exit } = require('process');

var KeyPath = '';
var KeyData = '';
var KeyWords = new Array();
var times = '';
var password = '';

KeyPath = process.argv[2];
times = process.argv[3];
console.log('KeyPath', KeyPath);
console.log('times', times);
KeyWords.push('');
process.argv.forEach((val, index) => {
    if (index > 3) {
        KeyWords.push(val);
    }
});
console.log('KeyWords', KeyWords);

fs.readFile(KeyPath, 'utf-8', ((err, data) => {
    KeyData = data;
    console.log('KeyData', KeyData);
    var w3 = new web3(web3.givenProvider || "ws://localhost:8555");//密码正确和这个没有关系。

    KeyWords.forEach((key, index) => {
        KeyWords.forEach((keyword, index) => {
            for (var i = 0; i < times; i++) {
                password = password + key + keyword;
            }
            console.log(password);
            try {
                var ret = w3.eth.accounts.decrypt(KeyData, password);
                console.log("succ");
                exit(0);
            } catch (e) {
                console.log("failed");
            }
            password = '';
        })
    })
}));
