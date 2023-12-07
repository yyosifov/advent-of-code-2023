const fs = require('fs')
const _ = require('lodash');

let data = fs.readFileSync('./in-big.txt', 'utf8');
function splitLines(t) { return t.split(/\r\n|\r|\n/); }

const ll = splitLines(data);
const lines = input = _.filter(ll, l => l != '');
const n = lines.length;
const m = lines[0].length;

const dx = [1, 1, 1, 0, 0, -1, -1, -1];
const dy = [0, -1, 1, -1, 1, 0, -1, 1];
function k(x, y) { return `${x}-${y}`; }
function isIn(x, y) { return x >= 0 && y >= 0 && x < n && y < m; }
function isNum(c) {
    return c >= '0' && c <= '9';
}
function toNum(c) { return c - '0'; }
function isSym(c) {
    return !isNum(c) && c !== '.';
}

let sum = 0;
function check(x, y) {
    let hasNonSym = false;
    let coords = [];
    for (let i = 0; i < dx.length; i++) {
        let nx = x + dx[i];
        let ny = y + dy[i];
        //console.log(nx, ny);
        if (isIn(nx, ny)) {
            if (isSym(lines[nx][ny])) {
                hasNonSym = true;
                coords.push({ x: nx, y: ny });
            }
        }
    }
    return [hasNonSym, coords];
}

const adj = {};
function mapCoords(num, coords) {
    const un = _.uniqBy(coords, c => k(c.x, c.y));
    _.each(un, c => {
        const key = k(c.x, c.y);
        adj[key] = adj[key] || [];
        adj[key].push(num);
    });
}

for (let i = 0; i < n; i++) {
    let j = 0;
    const l = lines[i];
    let cnum = 0;
    let hasNonSymbol = false;
    let allCoords = [];
    while (j < m) {
        if (isNum(l[j])) {
            const [hasNonSym, coords] = check(i,j);
            hasNonSymbol = hasNonSymbol || hasNonSym; // check(i, j);
            cnum = cnum * 10 + toNum(l[j]);
            if (coords.length) {
                console.log(coords);
                allCoords = [...allCoords, ...coords];
            }
        } else {
            if (cnum > 0 && hasNonSymbol) {
                console.log(cnum);
                sum += cnum;
                mapCoords(cnum, allCoords);
            }
            cnum = 0;
            hasNonSymbol = false;
            allCoords = [];
        }
        j++;
    }

    if (cnum > 0 && hasNonSymbol) {
        //console.log(cnum);
        sum += cnum;
        mapCoords(cnum, allCoords);
        allCoords = [];
    }
}

sum = 0;
_.each(_.keys(adj), kk => {
    if (adj[kk].length == 2) {
        console.log(adj[kk][0], adj[kk][1]);
        sum += adj[kk][0] * adj[kk][1];
    }
});
console.log(adj);
console.log(sum);

