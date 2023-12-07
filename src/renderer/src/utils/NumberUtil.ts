//数字转为阿拉伯数字
export function intToRoman(num:number):string {
    let map = {
        1: 'I',
        5: 'V',
        10: 'X',
        50: 'L',
        100: 'C',
        500: 'D',
        1000: 'M'
    }
    // 标识位数
    let digits = 1
    // 结果
    let result = ''
    while(num) {
        let current = num % 10
        if (current < 4) {
            result = map[digits].repeat(current) + result
        } else if (current === 4) {
            result = map[digits] + map[digits * 5] + result
        } else if (current > 4 && current < 9) {
            result = map[digits * 5] + map[digits].repeat(current - 5) + result
        } else {
            result = map[digits] + map[digits * 10] + result
        }
        digits *= 10
        num = Math.trunc(num/10)
    }
    return result
}

//阿拉伯数字转为数字
export function romanToInt(s:string):number {
    let map = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M':1000
    }
    let index = 0
    let result = 0
    let len = s.length
    while(index < len) {
        let current = map[s[index]]
        result += current
        if (index > 0) {
            let before = map[s[index-1]]
            if ((current === 5 || current === 10) && before === 1) {
                result -= 2
            }
            if ((current === 50 || current === 100) && before === 10) {
                result -= 20
            }
            if ((current === 500 || current === 1000) && before === 100) {
                result -= 200
            }
        }
        index++
    }
    return result
}
