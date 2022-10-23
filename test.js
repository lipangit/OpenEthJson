

//测试字符串组合

var KeyWords = [1, 2, 3, 4, 5, 6]//这个数组的1-size的组合。从1，2，3，。。到123456 234567 1234567.
// var KeyWords = ['1', '2', '3', '4', '5', '6']
var password = '';//拼凑完的密码。

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

function backTrack() {

}

var result = firestStep(KeyWords)
var secResult = []
for (j = 0; j < result.length; j++) {
    if (result[j] != "") {
        var ret = removeEmptyItems(result[j])
        secResult.push(ret)
        // console.log(ret + " j " + j + " length:" + ret.length)
    } else {
        // console.log("kong:" + j)
    }
}
console.log(secResult)

