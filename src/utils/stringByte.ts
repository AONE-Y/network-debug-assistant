function utf8ToByte(str: string) {
    var bytes = new Array();
    var len, c;
    len = str.length;
    for (var i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if (c >= 0x010000 && c <= 0x10FFFF) {
            bytes.push((((c >> 18) & 0x07) | 0xF0).toString(16));
            bytes.push(((((c >> 12) & 0x3F) | 0x80)).toString(16));
            bytes.push((((c >> 6) & 0x3F) | 0x80).toString(16));
            bytes.push(((c & 0x3F) | 0x80).toString(16));
        } else if (c >= 0x000800 && c <= 0x00FFFF) {
            bytes.push((((c >> 12) & 0x0F) | 0xE0).toString(16));
            bytes.push((((c >> 6) & 0x3F) | 0x80).toString(16));
            bytes.push(((c & 0x3F) | 0x80).toString(16));
        } else if (c >= 0x000080 && c <= 0x0007FF) {
            bytes.push((((c >> 6) & 0x1F) | 0xC0).toString(16));
            bytes.push(((c & 0x3F) | 0x80).toString(16));
        } else {
            bytes.push((c & 0xFF).toString(16));
        }
    }

    return bytes;


}


function byteToUtf8(arr: Array<string>) {
    if (typeof arr === 'string') {
        return arr;
    }
    var str = '',
        _arr = arr.map((v) => {
            return new Number("0x" + v).valueOf();
        })
    for (var i = 0; i < _arr.length; i++) {
        var one = _arr[i].toString(2),
            v = one.match(/^1+?(?=0)/);
        if (v && one.length == 8) {
            var bytesLength = v[0].length;
            var store = _arr[i].toString(2).slice(7 - bytesLength);
            for (var st = 1; st < bytesLength; st++) {
                store += _arr[st + i].toString(2).slice(2);
            }
            str += String.fromCharCode(parseInt(store, 2));
            i += bytesLength - 1;
        } else {
            str += String.fromCharCode(_arr[i]);
        }
    }
    return str;
}

function asciiToByte(str: string) {
    let arr = str.split("")
    let res = new Array();
    arr.forEach((s) => {
        res.push(s.charCodeAt(0).toString(16));
    })
    return res;
}

function byteToAscii(arr: Array<string>) {
    let res = ""
    arr.forEach((s) => {
        res += String.fromCharCode(new Number("0x" + s).valueOf());
    })
    return res;
}

function utf16ToUtf8(utf16Str:string) {
    var utf8Arr = new Array();
    var byteSize = 0;
    for (var i = 0; i < utf16Str.length; i++) {
        //获取字符Unicode码值
        const code = utf16Str.charCodeAt(i);

        //如果码值是1个字节的范围，则直接写入
        if (code >= 0x00 && code <= 0x7f) {
            byteSize += 1;
            utf8Arr.push(code);

            //如果码值是2个字节以上的范围，则按规则进行填充补码转换
        } else if (code >= 0x80 && code <= 0x7ff) {
            byteSize += 2;
            utf8Arr.push((192 | (31 & (code >> 6))));
            utf8Arr.push((128 | (63 & code)))
        } else if ((code >= 0x800 && code <= 0xd7ff)
            || (code >= 0xe000 && code <= 0xffff)) {
            byteSize += 3;
            utf8Arr.push((224 | (15 & (code >> 12))));
            utf8Arr.push((128 | (63 & (code >> 6))));
            utf8Arr.push((128 | (63 & code)))
        } else if(code >= 0x10000 && code <= 0x10ffff ){
            byteSize += 4;
            utf8Arr.push((240 | (7 & (code >> 18))));
            utf8Arr.push((128 | (63 & (code >> 12))));
            utf8Arr.push((128 | (63 & (code >> 6))));
            utf8Arr.push((128 | (63 & code)))
        }
    }
    return utf8Arr
}

function utf8ToUtf16(utf8Arrn:Array<string>) {
    var utf16Str = '';
    const utf8Arr=utf8Arrn.map((s)=>{
       return  new Number("0x"+s).valueOf();
    });
    for (var i = 0; i < utf8Arr.length; i++) {
        //每个字节都转换为2进制字符串进行判断
        var one = utf8Arr[i].toString(2);
        //正则表达式判断该字节是否符合>=2个1和1个0的情况
        var v = one.match(/^1+?(?=0)/);

        //多个字节编码
        if (v && one.length == 8) {
            //获取该编码是多少个字节长度
            var bytesLength = v[0].length;

            //首个字节中的数据,因为首字节有效数据长度为8位减去1个0位，再减去bytesLength位的剩余位数
            var store = utf8Arr[i].toString(2).slice(7 - bytesLength);
            for (var st = 1; st < bytesLength; st++) {
                //后面剩余字节中的数据，因为后面字节都是10xxxxxxx，所以slice中的2指的是去除10
                store += utf8Arr[st + i].toString(2).slice(2)
            }

            //转换为Unicode码值
            utf16Str += String.fromCharCode(parseInt(store, 2));

            //调整剩余字节数
            i += bytesLength - 1
        } else {
            //单个字节编码，和Unicode码值一致，直接将该字节转换为UTF-16
            utf16Str += String.fromCharCode(utf8Arr[i])
        }
    }
    return utf16Str
}

export {
    utf8ToByte, byteToUtf8, asciiToByte, byteToAscii
}