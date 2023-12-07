const fs = require('fs')
const _ = require('lodash');

let data = fs.readFileSync('./in-big.txt', 'utf8');
function splitLines(t) { return t.split(/\r\n|\r|\n/); }

const ll = splitLines(data);
const lines = input = _.filter(ll, l => l != '');

const times = lines[0].replace(/Time(.*): /, '').trim().split(' ').filter(x => x != '').map(x => parseInt(x));
const dists = lines[1].replace(/Distance(.*): /, '').trim().split(' ').filter(x => x != '').map(x => parseInt(x));
console.log(times);
console.log(dists);

const mult = [];
for (let i=0;i<times.length;i++) {
    const t = times[i];
    const d = dists[i];
    let ways = 0;
    for (let j=1;j<=t;j++) {
        // hold j
        const res = j + (t - j - 1) * j;
        console.log(res);
        if (res > d) {
            ways++;
        }
    }
    mult.push(ways);
}
console.log(mult);
console.log(_.reduce(mult, (acc, currentValue) => acc * currentValue, 1));