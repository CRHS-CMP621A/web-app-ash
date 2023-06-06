
//include api for history; if theres time, include time

//list of all items, levels
const fiveStandard = ['5chara1', '5chara2', '5chara3'];
const fourStandard = ['4chara1', '4chara2', '4chara3', '4weapon1'];
const three = ['weapon1', 'weapon2', 'weapon3'];
const starType= [5,4,3];

let fiveLimited = 'limited 5 star!!!';
let fourFeatured = ['featured 4 star 1', 'featured four star 2','featured four star 3' ]

//global variables
let pity4 = 0;
let pitySoft = 0;
let pity5 = 0;
let guarantee = 0;


///functions///
class dropEntry{
  constructor(name, star, item){
    this.name = name;
    this.star = star;
    this.item = item;
  }
}

let dropDisplay = []

const arrayRange = (start, stop, step) =>
    Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step
    );

function pullBtn(boundary){ //pull button
  dropDisplay = []//empty the display before showing the pulls  
  pullRange = arrayRange(1, boundary, 1);
    for (i in pullRange){
        let index = i;
        drop(index);
    };
    for (let i in dropDisplay){
      htmltemp1();
    }
    
}
function drop(index){
    let dropName = null;
    let type5 = null;
    
    
    console.log(index);
    if (pitySoft == 1){
      rolled = determineType(weightCumulative);
      weightCumulative[0] += 5.6;
      weightCumulative[1] += 5.6;
      console.log(weightCumulative);
    }else {
      rolled = determineType(weightDefault);
    };
    type = rolled.item
    num = rolled.randomNumber
    console.log(rolled);

    if (pity4 == 9){
      type = 4;
    }
    if (pity5 == 89){
      type = 5;
    }

    if (type != 5){
      pity5 += 1;
    };
    if  (type != 4){
      pity4 +=1;
    };

    if (type==4){
      pity4 = 0;
    }else if (type == 5){
      pity5 = 0;
      pitySoft = 0;
      weightCumulative[0] = 0.6;
      weightCumulative[1] = 5.7;
    }
    if (pity5 == 75){
      pitySoft = 1;
    }
    console.log('type:', type)
    console.log('4 star:',pity4);
    console.log('5 star:', pity5);
    console.log('soft pity:', pitySoft) //determing the final drop type

    if (type == 4){
       dropName = get_random(fourStandard);
    }else if (type == 5){
      if (guarantee == 0){
        type5 = get_random(['limited','standard']);
      }else{
        type5 = 'limited';
      }
    };
      
      if (type5 == 'limited'){
        dropName = fiveLimited;
        guarantee = 0;
      } else if (type5 == 'standard'){
        dropName = get_random(fiveStandard);
        guarantee = 1;
      }else if (type == 3){
        dropName = get_random(three);
    };
    console.log(dropName)  
    console.log('guaranteed: ', guarantee);
    new dropEntry(dropName, type, 'pass')
    dropDisplay.push(dropEntry);
    console.log(dropDisplay);
    
   
    
    
}


//probabilities
const weightDefault = [0.6, 5.7, 100]
const weightCumulative = [20,25.1, 100]

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

function get_random (list) {
  return list[Math.floor((Math.random()*list.length))];
}
//add pulls into inventory

//add pulls into history

//pity resetter

//50/50 status

//edit banner

//print gacha results

function htmltemp (){ //dont want to clutter the above functions
  let html;
  html = `<li class = drop> testing </li>`;
  document.querySelector(".first").insertAdjacentHTML("afterend",html);
}
function htmltemp1(){
  let html;
  html = '<p>test</p>'
  document.querySelector(".first").innerHTML = html;
}

//pulling action

//open history

//open inventory

//the HISTORY

//inventory display(consts)