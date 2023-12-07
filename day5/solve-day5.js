const fs = require('fs')
const _ = require('lodash');

let data = fs.readFileSync('./in.txt', 'utf8');
function splitLines(t) { return t.split(/\r\n|\r|\n/); }

const ll = splitLines(data);
const lines = input = _.filter(ll, l => l != '');
const n = lines.length;

function parseMap(mapString) {
    let lines = mapString.trim().split('\n');
    const numbers = lines.map(line => line.split(' ').map(Number));
    return numbers;
}

const seeds = ll[0].replace(/seeds(.*): /, '').split(' ').map(x => parseInt(x));

//console.log(seeds);

const seedToSoilMap = parseMap(/seed-to-soil map:(.*?)(?=\w+-|$)/s.exec(data)[1]);
const soilToFertilizerMap = parseMap(/soil-to-fertilizer map:(.*?)(?=\w+-|$)/s.exec(data)[1]);
const fertilizerToWaterMap = parseMap(/fertilizer-to-water map:(.*?)(?=\w+-|$)/s.exec(data)[1]);
const waterToLightMap = parseMap(/water-to-light map:(.*?)(?=\w+-|$)/s.exec(data)[1]);
const lightToTemperatureMap = parseMap(/light-to-temperature map:(.*?)(?=\w+-|$)/s.exec(data)[1]);
const temperatureToHumidityMap = parseMap(/temperature-to-humidity map:(.*?)(?=\w+-|$)/s.exec(data)[1]);
const humidityToLocationMap = parseMap(/humidity-to-location map:(.*?)(?=\w+-|$)/s.exec(data)[1]);

//console.log(seedToSoilMap);
const maps = [
    seedToSoilMap,
    soilToFertilizerMap,
    fertilizerToWaterMap,
    waterToLightMap,
    lightToTemperatureMap,
    temperatureToHumidityMap,
    humidityToLocationMap
]
function eval(s) {
    let seed = s;
    for (const m of maps) {
        for (const [x,y,z] of m) {
            if (seed >= y && seed <= y+z-1) {
                // it's in range, update it
                // console.log(x,y,z);
                const absDiff = x-y;
                // console.log(`remap ${seed} to ${seed+absDiff}`);
                seed = seed + absDiff; // remap
                break;
            }
        }
    }
    return seed;
}

let min = -1;
for (let i=0;i<seeds.length;i+=2) {
    let from = seeds[i];
    const len = seeds[i+1];
    let to = from + len - 1
    const ranges = [];
    for (let seed = from; seed <= to; seed++) {
         const res = eval(seed);
         if (min === -1) min = res;
         if (min > res) min = res;
    }
}
/*
for (let i=0;i<seeds.length;i+=2) {
    let from = seeds[i];
    const len = seeds[i+1];
    let to = from + len - 1;
    let cmin = -1;
    while (from <= to) {
        let midR = parseInt((from + to) / 2 + 1);
        let midL = parseInt(midR - 1);

        if (from == to-1) {
            midL = from;
            midR = to;
        }

        let res = eval(midL);
        let res2 = eval(midR);
        if (res < res2) {
            to = midR - 1;
        } else {
            from = midL + 1;
        }
        if (cmin === -1) cmin = res;
        console.log(midL, midR, res, res2);
        cmin = Math.min(cmin, Math.min(res, res2));

        if (from == to-1) {
            break;
        }
        // const seed = mid;
        // let res = eval(seed);
        // if (cmin === -1) cmin = res;
        // if (cmin > res) {
        //     cmin = res;
        //     from = mid + 1;
        // } else {
        //     to = mid - 1;
        // }
    }
    // for (let seed = from; seed <= to; seed++) {
    //     const res = eval(seed);
    //     if (min === -1) min = res;
    //     if (min > res) min = res;
    //     // console.log(`${seed} - ${res}`);
    // }
    if (min === -1) min = cmin;
    if (min > cmin) min = cmin;
}
/*for (const seed of seeds) {
    const res = eval(seed);
    if (min === -1) min = res;
    if (min > res) min = res;
    console.log(`${seed} - ${res}`);
}*/

console.log(min);