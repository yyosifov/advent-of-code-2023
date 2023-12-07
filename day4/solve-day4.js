const fs = require('fs')
const _ = require('lodash');

let data = fs.readFileSync('./in-big.txt', 'utf8');
function splitLines(t) { return t.split(/\r\n|\r|\n/); }

const ll = splitLines(data);
const lines = input = _.filter(ll, l => l != '');
const n = lines.length;

function calc(l) {
    l = l.replace(/Card(.*): /, '');
    const [w, yours] = l.split(' | ');
    const win = {};
    const wSplit = w.split(' ');
    _.each(wSplit, x => {
        let y = parseInt(x);
        if (_.isNumber(y) && !_.isNaN(y)) {
            // console.log(x);
            win[y] = true;
        }
    });

    const yy = yours.split(' ');
    let count = 0;
    _.each(yy, yyy => {
        let y = parseInt(yyy);
        if (_.isNumber(y) && !_.isNaN(y)) {
            if (win[yyy]) {
                count++;
            }
        }
    });
    console.log(win); console.log(count);
    if (count == 0) {
        return 0;
    }

    console.log(Math.pow(2, count));
    return Math.pow(2, count - 1);
}

function parse(l) {
    l = l.replace(/Card(.*): /, '');
    const [w, yours] = l.split(' | ');
    const win = {};
    const wSplit = w.split(' ');
    _.each(wSplit, x => {
        let y = parseInt(x);
        if (_.isNumber(y) && !_.isNaN(y)) {
            // console.log(x);
            win[y] = true;
        }
    });

    const yy = yours.split(' ');
    let count = 0;
    _.each(yy, yyy => {
        let y = parseInt(yyy);

        if (_.isNumber(y) && !_.isNaN(y)) {
            if (win[yyy]) {
                count++;
            }
        }
    });

    return count;
}

const linesWithIndex = {};
let pile = [];
for (let i = 0; i < lines.length; i++) {
    const count = parse(lines[i]);
    linesWithIndex[i] = count;
    pile.push({ ind: i, count });
}
console.log(linesWithIndex);

let i = 0;
while (i < pile.length) {
    const { ind, count } = pile[i];
    if(i == 0) { console.log(ind); console.log(count); }
    for (let j = 0; j < count; j++) {
        const nind = ind + j + 1;
        pile.push({ ind: nind, count: linesWithIndex[nind] })
        if(i == 0) {
            console.log({ ind: nind, count: linesWithIndex[nind] });
        }
    }
    i++;
}

console.log(pile.length);

// for (const l of lines) {
//     const csum = calc(l);
//     sum += csum;
// }
// console.log(sum);