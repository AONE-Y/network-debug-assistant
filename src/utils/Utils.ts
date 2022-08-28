function arrToHex(arr: Uint8Array) {
    let res = ""
    arr.forEach((v) => {
        if (v != 0) {
            if (v >= 16) {
                res += v.toString(16) + " "
            } else {
                res += "0" + v.toString(16) + " "
            }
        }
    })
    return res;
}

export {
    arrToHex
}