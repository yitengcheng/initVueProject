/* eslint-disable no-console */
const moment = require('moment');
const _ = require('lodash');

// 手机号
export function isvalidPhone(phone) {
    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
    return reg.test(phone);
}

// 车牌号
export function isvalidPlate(plate) {
    const reg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
    return reg.test(plate);
}

// 正整数（不包含0,不包含小数）
export function isPositiveInteger(number) {
    const reg = /^[1-9]\d*$/;
    return reg.test(number);
}

// 正整数（包含0，不包含小数）
export function isPositiveIntegerHasZero(number) {
    const reg = /^[+]{0,1}(\d+)$/;
    return reg.test(number);
}

// 正整数(包括0，小数保留两位)
export function isIntegerHasZero(number) {
    const reg = /^((0{1}\.\d{1,2})|([1-9]\d*\.{1}\d{1,2})|([1-9]+\d*)|0)$/;
    return reg.test(number);
}

// 正整数（不包括0，小数保留两位）
export function isInteger(number) {
    const reg = /^((0{1}\.\d{1,2})|([1-9]\d*\.{1}\d{1,2})|([1-9]+\d*))$/;
    return reg.test(number);
}

export function judgeInputText(string) {
    const reg = /^[\u4e00-\u9fa5a-z]+$/gi;
    return reg.test(string);
}

// 获取年龄
export function getAge(birthday) {
    let birth = moment(birthday);
    let months = moment().diff(birth, 'months', true);
    let birthSpan = { year: Math.floor(months / 12), month: Math.floor(months) % 12, day: Math.round((months % 1) * moment().daysInMonth(), 0) };
    if (birthSpan.year < 1 && birthSpan.month < 1) {
        return birthSpan.day + ' 天';
    } else if (birthSpan.year < 1) {
        return birthSpan.month + ' 月' + birthSpan.day + ' 天';
    } else if (birthSpan.year < 2) {
        return birthSpan.year + ' 岁' + birthSpan.month + ' 月';
    } else {
        return birthSpan.year + ' 岁';
    }
}

// 判断是否拥有此权限
export function hasPermission(user, permission) {
    if (user) {
        if (_.intersection(user.permissions, permission).length !== 0 && user.permissions.length > 0) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

// 判断身份证
export function isIdentityCode(value) {
    let city = {
        11: '北京',
        12: '天津',
        13: '河北',
        14: '山西',
        15: '内蒙古',
        21: '辽宁',
        22: '吉林',
        23: '黑龙江 ',
        31: '上海',
        32: '江苏',
        33: '浙江',
        34: '安徽',
        35: '福建',
        36: '江西',
        37: '山东',
        41: '河南',
        42: '湖北 ',
        43: '湖南',
        44: '广东',
        45: '广西',
        46: '海南',
        50: '重庆',
        51: '四川',
        52: '贵州',
        53: '云南',
        54: '西藏 ',
        61: '陕西',
        62: '甘肃',
        63: '青海',
        64: '宁夏',
        65: '新疆',
        71: '台湾',
        81: '香港',
        82: '澳门',
        91: '国外 '
    };
    let pass = true;
    if (!value || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(value)) {
        console.log('身份证号格式错误');
        pass = false;
    } else if (!city[value.substr(0, 2)]) {
        console.log('地址编码错误');
        pass = false;
    } else {
        // 18位身份证需要验证最后一位校验位
        if (value.length === 18) {
            value = value.split('');
            // ∑(ai×Wi)(mod 11)
            // 加权因子
            let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            // 校验位
            let parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
            let sum = 0;
            let ai = 0;
            let wi = 0;
            for (let i = 0; i < 17; i++) {
                ai = value[i];
                wi = factor[i];
                sum += ai * wi;
            }
            let last = parity[sum % 11];
            if (last !== value[17] * 1) {
                console.log('校验位错误');
                pass = false;
            }
        }
    }
    return pass;
}
