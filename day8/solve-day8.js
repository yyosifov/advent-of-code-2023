const fs = require('fs')
const _ = require('lodash');

let data = fs.readFileSync('./in-big.txt', 'utf8');
function splitLines(t) { return t.split(/\r\n|\r|\n/); }

const ll = splitLines(data);
const lines = input = _.filter(ll, l => l != '');

const moves = lines[0];
const n = lines[0].length;
const g = {};

for (let i=1;i<lines.length;i++) {
    const [from, toS] = lines[i].split(' = ');
    const [left, right] = toS.replace('(', '').replace(')', '').split(', ');
    g[from] = {
        left,
        right
    }
}

let current = 'AAA';
let mCount = 0;
let res = 0;
while(current !== 'ZZZ') {
    current = moves[mCount] === 'L' ? g[current].left : g[current].right;
    res++;

    mCount = (mCount + 1) % n;
    console.log(current);
}
console.log(res);