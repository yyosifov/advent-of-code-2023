const fs = require('fs')
const _ = require('lodash');

let data = fs.readFileSync('./in-big.txt', 'utf8');
function splitLines(t) { return t.split(/\r\n|\r|\n/); }

const ll = splitLines(data);
const lines = input = _.filter(ll, l => l != '');

const times = lines[0].replace(/Time(.*): /, '').trim().split(' ').filter(x => x != '').join('');
const dists = lines[1].replace(/Distance(.*): /, '').trim().split(' ').filter(x => x != '').join('');
console.log(times);
console.log(dists);

const t = parseInt(times);
const d = parseInt(dists);
function calc(j) {
    return j + (t - j - 1) * j;
}

let ways = 0;
// for (let j = 1; j <= t; j++) {
//     // hold j
//     const res = j + (t - j - 1) * j;
//     console.log(res);
//     if (res > d) {
//         ways++;
//     }
// }

function lower() {
    let left = 1;
    let right = t;
    while (left <= right) {
        const mid = left + Math.floor((right - left + 1) / 2);
        const f = calc(mid);
        if (f < d) {
            left = mid + 1;
        } else if (f > d) {
            right = mid - 1;
        } else {
            right = mid - 1;
        }
    }

    console.log('left = ' + left);
    console.log('right = ' + right);
    const a = Math.min(left, right);
    const b = Math.max(left, right);
    if (calc(a) > d) return a;
    return b;
}

function upper() {
    let left = 1;
    let right = t;
    while (left <= right) {
        const mid = left + Math.floor((right - left + 1) / 2);
        const f = calc(mid);
        if (f > d) {
            left = mid + 1;
        } else if (f < d) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    console.log('left = ' + left);
    console.log('right = ' + right);
    const a = Math.min(left, right);
    const b = Math.max(left, right);
    if (calc(a) > d) return a;
    return b;
}

const l = lower();
const u = upper();
console.log(u - l + 1);
// console.log(lower());
// console.log(upper());
// console.log(ways);
