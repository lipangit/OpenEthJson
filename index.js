var http = require('http');
const web3 = require('web3');
const fs = require('fs');
const { exit } = require('process');


// *** FUNCTIONS ***
Array.prototype.contains = function (a) {
    if ("string" == typeof a || "number" == typeof a) {
        for (var b in this) {
            if (a == this[b]) {
                return !0;
            };
        }
    }
    return !1
};

var resultOut = []
var boardOut = []
function backtrack(result, board, nums) {
    if (board.length == nums.length) {
        var temp = board.slice(0)
        result.push(temp)
        return
    }
    nums.forEach((num, index) => {
        if (board.contains(num)) {
            return true;
        }
        board.push(num)
        backtrack(result, board, nums)
        board.pop()
    });
}
// backtrack(resultOut, boardOut, KeyWords)
// console.log(resultOut)

//分成两步骤，
function firestStep(originArray) {
    var result = []
    var len = originArray.length
    var retSize = (1 << len) - 1
    for (i = 0; i < retSize; i++) {
        var singleArray = []
        var curPosition = len - 1
        var number = i
        while (number != 0) {
            if ((number & 1) == 1) {
                singleArray[curPosition] = originArray[curPosition];
            }
            number = number >>> 1;  //无符号右移去除低位
            curPosition--;  //记录下一位
        }
        result.push(singleArray)
    }
    return result
}

function removeEmptyItems(originArray) {
    var result = []
    for (i = 0; i < originArray.length; i++) {
        if (originArray[i] != null) {
            result.push(originArray[i])
        }
    }
    return result
}

function finalFunction(KeyWords) {
    var result1 = firestStep(KeyWords)
    var result2 = []
    for (j = 0; j < result1.length; j++) {
        if (result1[j] != "") {
            var ret = removeEmptyItems(result1[j])
            result2.push(ret)
        } else {
            // console.log("kong:" + j)
        }
    }
    // console.log(result2)
    var finalResult = []
    for (i = 0; i < result2.length; i++) {
        backtrack(resultOut, boardOut, result2[i])
        for (j = 0; j < resultOut.length; j++) {
            var tempArray = resultOut[j].slice(0)
            // var temp
            // tempArray.forEach(item => {
            //     if (item != null) {
            //         temp += item
            //     }
            // })
            finalResult.push(tempArray);
        }
        boardOut = []
        resultOut = []
    }
    return finalResult
}
// **** START ****
var KeyPath = '';
var KeyData = '';
var KeyWords = new Array();
var FinalKeyWords = new Array();
var times = '';

KeyPath = process.argv[2];
times = process.argv[3];
console.log('KeyPath', KeyPath);
console.log('times', times);
// KeyWords.push('');
process.argv.forEach((val, index) => {
    if (index > 3) {
        KeyWords.push(val);
    }
});
console.log('KeyWords', KeyWords);

FinalKeyWords = finalFunction(KeyWords)
console.log('FinalKeyWords', FinalKeyWords)

KeyData = fs.readFileSync(KeyPath, { encoding: 'utf-8', flag: 'r' });
console.log('KeyData:', KeyData);
var w3 = new web3(web3.givenProvider || "ws://localhost:8555");


FinalKeyWords.forEach(password => {
    try {
        var ret = w3.eth.accounts.decrypt(KeyData, password);
        console.log("succ:" + password);
        exit(0);
    } catch (e) {
        // console.log("failed:" + password);
    }
})


//             for (var i = 0; i < times; i++) {
//                 password = repeat(key + keyword, 3);
//                 console.log(password);

//                 password = '';
//             }


