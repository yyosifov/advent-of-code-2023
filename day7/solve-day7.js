const fs = require('fs')
const _ = require('lodash');

let data = fs.readFileSync('./in.txt', 'utf8');
function splitLines(t) { return t.split(/\r\n|\r|\n/); }

const ll = splitLines(data);
const lines = input = _.filter(ll, l => l != '');

const weights = {};
_.each(_.reverse(['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']), (x, ind) => weights[x] = ind);

function rankHand(x) {
    const vals = _.reverse(_.sortBy(_.values(x)));
    if (vals[0] === 5) {
        return 7;
    }
    if (vals[0] === 4) {
        return 6;
    }

    if (vals[0] ===3 && vals[1] === 2) {
        return 5;
    }

    if (vals[0] === 3) {
        return 4;
    }

    if (vals[0] == vals[1] && vals[0] === 2) {
        return 3;
    }

    if (vals[0] === 2) {
        return 2;
    }

    return 1;
}
function parse(l) {
    let [hand, bid] = l.split(' ');
    bid = +bid;

    const x = {};
    _.each(hand, c => x[c] = (x[c] || 0) + 1);
    const rank = rankHand(x);
    return {
        rank,
        bid,
        hand
    }
}

const hands = _.map(lines, l => parse(l));

function compareFn(a, b) {
    if (a.rank != b.rank) {
        return a.rank < b.rank ? -1 : 1;
    }

    for (let i=0;i<a.hand.length;i++) {
        const wa = weights[a.hand[i]];
        const wb = weights[b.hand[i]];
        if (wa != wb) {
            return wa < wb ? -1 : 1;
        }
    }
    return 0;
}

console.log(weights);
console.log(hands);
const res = hands.sort(compareFn);
let sum = 0;
for (let i=0;i<res.length;i++) {
    sum += (i+1) * res[i].bid;
}

console.log(res);