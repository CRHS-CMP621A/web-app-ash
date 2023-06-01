
//include api for history; if theres time, include time

//list of all items, levels
const fiveStandard = ['chara1', 'chara2', 'chara3'];
const fourStandard = ['chara1', 'chara2', 'chara3', 'weapon1'];
const three = ['weapon1', 'weapon2', 'weapon3'];
const starType= [5,4,3];

//global variables
let pity4 = 0;
let pitySoft = 0;
let pity5 = 0;
let guarantee = 0;

///functions///

const arrayRange = (start, stop, step) =>
    Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step
    );

function pullBtn(boundary){ //pull button
    pullRange = arrayRange(1, boundary, 1);
    for (i in pullRange){
        let index = i;
        drop(index);
    }
    
}
function drop(index){
    console.log(index);
    console.log(determineType(weightDefault));
    
}


//probabilities
const weightDefault = [0.6, 5.7, 100]

function determineType(odds){
    let randomNumber = 100 * Math.random();
    for (let itemIndex = 0; itemIndex < starType.length; itemIndex += 1) {
        if (odds[itemIndex] >= randomNumber) {
          return {
            randomNumber,
            item: starType[itemIndex],
            index: itemIndex,
          };
        }
      }
}
//add pulls into inventory

//add pulls into history

//pity resetter

//50/50 status

//edit banner

//print gacha results

//pulling action

//open history

//open inventory

//the HISTORY

//inventory display(consts)