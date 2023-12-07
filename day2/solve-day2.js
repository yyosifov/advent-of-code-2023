// 12 red cubes, 13 green cubes, and 14 blue cubes?

const fs = require('fs')
const _ = require('lodash');

let data = fs.readFileSync('./in-big.txt', 'utf8');
function splitLines(t) { return t.split(/\r\n|\r|\n/); }

const ll = splitLines(data);
const lines = input = _.filter(ll, l => l != '');
const n = lines.length;

const lim = {
    'red': 12,
    'green': 13,
    'blue': 14
}

function m(s, ind) {
    s = s.replace(/Game(.*): /, '');
    const parts = s.split(/;/);
    
    console.log(s);
    console.log(parts);
    let isFine = true;
    const pile = {
        'red': 1,
        'green': 1,
        'blue': 1
    }
    for (const p of parts) {
        const subParts = p.split(', ');
        for (const sp of subParts) {
            const [num, color] = sp.trim().split(' ');

            console.log(`${num} - ${color}`);
            if (lim[color] < num) {
                isFine = false;
                //return 0;
            }
            pile[color] = Math.max(pile[color], num);
        }
    };
    const p = pile['red'] * pile['green'] * pile['blue'];
    return p;
    // return ind;
}

let sum = 0;
for (let i=0;i<n;i++) {
    const num = m(lines[i], i+1);
    sum += num;
}

console.log(sum);

