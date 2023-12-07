const fs = require('fs')
const _ = require('lodash');

// const digits = {
//     'one': '1one',
//     'two': '2two',
//     'three': '3three',
//     'four': '4four',
//     'five': '5five',
//     'six': '6six',
//     'seven': '7seven',
//     'eight': '8eight',
//     'nine': '9nine'
// };

const digits = {
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9,
    '0': 0,
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9
};


function m(s) {
    let arr = [];
    _.each(_.keys(digits), d => {
        
        const matches = s.matchAll(d);

        for (const match of matches) {
            arr.push({
                ind: match.index,
                num: digits[d]
            });
        }


    });
    //console.log(arr);
    arr = _.sortBy(arr, a => a.ind);
    //console.log(arr);
    const x = _.first(arr).num;
    const y = _.last(arr).num;
    //console.log(x, y);
    return x * 10 + y;
}

let data = fs.readFileSync('./in-big.txt', 'utf8');
function splitLines(t) { return t.split(/\r\n|\r|\n/); }

const ll = splitLines(data);
const lines = input = _.filter(ll, l => l != '');
const n = lines.length;


let sum = 0;
for (let i=0;i<n;i++) {

    const num = m(lines[i]);
    sum += num;
}

console.log(sum);




// const nl = clean(lines[i]);
// let first = undefined, second = undefined;

// for (let j=0;j<nl.length;j++) {
//     const c = nl[j];
//     if (c >= '0' && c<='9') {
//         const x = c-'0';
//         if (first === undefined) {
//             first = x;
//             second = x;
//         } else {
//             second = x;
//         }
//     }
// }