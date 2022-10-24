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

//测试字符串组合
// var KeyWords = [1, 2, 3]//这个数组的1-size的组合。从1，2，3，。。到123456 234567 1234567.
var KeyWords = ['1', '2', '3', '4', '5', '6']
// var password = '';//拼凑完的密码。

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

var result1 = firestStep(KeyWords)
var result2 = []
for (j = 0; j < result1.length; j++) {
    if (result1[j] != "") {
        var ret = removeEmptyItems(result1[j])
        result2.push(ret)
        // console.log(ret + " j " + j + " length:" + ret.length)
    } else {
        // console.log("kong:" + j)
    }
}
console.log(result2)
// var finalResult = []
// for (i = 0; i < result2.length; i++) {
//     backtrack(resultOut, boardOut, result2[i])
//     var temp = resultOut.slice(0)
//     boardOut = []
//     resultOut = []
//     console.log("temp: " + temp)
// }