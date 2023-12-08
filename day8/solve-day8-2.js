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

let current = _.filter(_.keys(g), x => x.endsWith('A'));

function gcd(a, b) { 
    for (let temp = b; b !== 0;) { 
        b = a % b; 
        a = temp; 
        temp = b; 
    } 
    return a; 
} 
  
function lcm(a, b) { 
    const gcdValue = gcd(a, b); 
    return (a * b) / gcdValue; 
} 

function move(c) {
    let current = c;
    let mCount = 0;
    let res = 0;
    while(!_.endsWith(current, 'Z')) {
        current = moves[mCount] === 'L' ? g[current].left : g[current].right;
        res++;

        mCount = (mCount + 1) % n;
    }
    console.log(res);
    return res;
}

console.log('here');
let l = -1;
for (const x of current) {
    const y = move(x);
    if (l === -1) {
        l = y;
    } else {
        l = lcm(l, y);
    }
}

console.log(l);
