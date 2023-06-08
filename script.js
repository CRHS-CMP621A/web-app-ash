
//include api for history; if theres time, include time

//list of all items, levels
const fiveStandard = ['Diluc', 'Jean', 'Mona', 'Qiqi 💀', 'Keqing', 'Tighnari', 'Dehya :('];
const fourStandard = ['Amber', 'Kaeya', 'Lisa', 'Ningguang', 'Beidou', 'Surcrose', 'Bennett', 'Xiangling','Xingqiu', 'Chongyun', 'Razor', 'Fischl', 'Xinyan', 'Yunjin', 'Noelle', 'Barbara', 'Rosaria', 'Heizou', 'Gorou', 'Kuki Shinobu', 'Sayu', 'Thoma', 'Collei', 'Dori', 'Candace', 'Kujou Sara', 'Yanfei', 'rando weapon', 'Rust', 'Favonius Codex',  'Painslasher', 'trash (The Bell)', 'The Stringless', 'Favonius Sword', 'Oathsworn Eye'];
const three = ['Cool Steel', 'Debate Club', 'Thrilling Tales of Dragon Slayer', 'Harbinger of Dawn', 'Black Tassel', 'White Tassel', "Recurve Bow"];
const starType= [5,4,3];
const fourType = ['f','s'];

const input5 = document.querySelector('.chosen-limited5');
const input4a = document.querySelector('.chosen-ft4a');
const input4b = document.querySelector('.chosen-ft4b');
const input4c = document.querySelector('.chosen-ft4c');


function getTime (){
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time;
  return dateTime;
}

 

let completeHistory = [];
const data = JSON.parse(localStorage.getItem("completeHistory"));
if (data){
  console.log('saved');
  completeHistory = data;
  console.log(completeHistory);
  for (let i in completeHistory){
    let entry = completeHistory[i];
    let name = entry[0];
    let star = entry[1];
    let time = entry[2];
    htmlHistory(name, star, time);

  };
};
 
let dropArray = []
let fiveLimited = 'Venti';
let fourFeatured = ['Sucrose', 'Kaveh','Xingqui' ]

document.querySelector(".limited5").textContent = '★★★★★ '+fiveLimited;
document.querySelector(".ft4a").textContent = '★★★★ '+fourFeatured[0];
document.querySelector(".ft4b").textContent = '★★★★ '+fourFeatured[1];
document.querySelector(".ft4c").textContent = '★★★★ '+fourFeatured[2];

//global variables
let pity4 = 0;
let pitySoft = 0;
let pity5 = 0;
let guarantee = 0;

let dropDisplay = [];

document.querySelector(".pity").textContent = pity5;
if (guarantee == 0){
  document.querySelector(".guaranteeStatus").textContent = 'no';
}else{
  document.querySelector(".guaranteeStatus").textContent = 'yes!!';
};


///functions///
class dropEntry{
  constructor(name, star, item){
    this.name = name;
    this.star = star;
    this.item = item;
  }
}



const arrayRange = (start, stop, step) =>
    Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step
    );

function pullBtn(boundary){ //pull button

  document.querySelector(".list").innerHTML = "<li class = 'first'></li>";  
  pullRange = arrayRange(1, boundary, 1);
    for (i in pullRange){
        let index = i;
        drop(index);
    };
    document.querySelector(".pity").textContent = pity5;
    localStorage.setItem("completeHistory", JSON.stringify(completeHistory));
    console.log(completeHistory);
  
    
}
function drop(index){
    let dropName = null;
    let type5 = null;
    let pityLog = pity5+1;
    let time = null;
    
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
       dropName = determine4(weightFourStar);
       if (dropName == 'f'){
        dropName = get_random(fourFeatured);
       }else{
        dropName = get_random(fourStandard);
       };
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
        document.querySelector(".guaranteeStatus").textContent = 'no';
      } else if (type5 == 'standard'){
        dropName = get_random(fiveStandard);
        guarantee = 1;
        document.querySelector(".guaranteeStatus").textContent = 'yes!!';
      }else if (type == 3){
        dropName = get_random(three);
    };
    time = getTime()
  
    console.log(dropName)  
    console.log('guaranteed: ', guarantee);
    new dropEntry(dropName, type, time)
   
    dropArray = [dropName, type, time]
    completeHistory.push(dropArray);
 
    htmltemp(dropName, type, pityLog);
    htmlHistory(dropName, type, time);
    
    
  
    
   
    
    
}


//probabilities
const weightDefault = [0.6, 5.7, 100]
const weightCumulative = [20,25.1, 100]
const weightFourStar = [70,100]

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

function determine4(odds){
  let randomNumber = 100 * Math.random();
  for (let itemIndex = 0; itemIndex < fourType.length; itemIndex += 1) {
      if (odds[itemIndex] >= randomNumber) {
        return fourType[itemIndex];

      }
    }
}
function get_random (list) {
  return list[Math.floor((Math.random()*list.length))];
}
//add pulls into inventory



//edit banner

function confirmBtn (){
  console.log('click triggered')
  editBanner();
  closeWindow('.editbanner')

}

function editBanner(){
  fiveLimited = input5.value;
  four1 = input4a.value;
  four2 = input4b.value;
  four3 =  input4c.value;
  fourFeatured = [four1, four2, four3];
  document.querySelector(".limited5").textContent = '★★★★★ '+fiveLimited;
  document.querySelector(".ft4a").textContent = '★★★★ '+fourFeatured[0];
  document.querySelector(".ft4b").textContent = '★★★★ '+fourFeatured[1];
  document.querySelector(".ft4c").textContent = '★★★★ '+fourFeatured[2];
}
//print gacha results

function htmltemp (name, star, pity){ //dont want to clutter the above functions
  let html;
  let starType = star;
  let dropName = name;
  if (starType  == 5){
    html = `<li class = 'drop five'> ★★★★★ ${dropName} (${pity}) </li>`;
  }else if (starType == 4){
    html = `<li class = 'drop four'> ★★★★  ${dropName} (${pity})</li>`;
  }else{
    html = `<li class = 'drop three'> ★★★   ${dropName} (${pity})</li>`;
  };
  
  document.querySelector(".first").insertAdjacentHTML("afterend",html);
}


//pulling action

//open history & inventory
function showWindow(classname){
  let className = document.querySelector(classname);
  className.classList.remove('hidden');
};

function closeWindow(classname){
  let className = document.querySelector(classname);
  className.classList.add('hidden');
}


//the HISTORY
function htmlHistory (name, star, time){ //dont want to clutter the above functions
  let html;
  let starType = star;
  let dropName = name;
  if (starType  == 5){
    html = `<li class = 'drop five'>${time} | ★★★★★ ${dropName} </li>`;
  }else if (starType == 4){
    html = `<li class = 'drop four'>${time} | ★★★★  ${dropName} </li>`;
  }else{
    html = `<li class = 'drop three'>${time} | ★★★   ${dropName} </li>`;
  };
  
  document.querySelector('.history-drop').insertAdjacentHTML("afterend",html);
}

function wipeHistory(){
  localStorage.clear();
  document.querySelector('.history-list').innerHTML = " <li class = 'history-drop'></li>";
  console.log('deleted')
}
//inventory display(consts)