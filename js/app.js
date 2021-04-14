
'use strict'
let coantainer=document.getElementById('randomPic');

let image1Element= document.getElementById('image1');

let image2Element= document.getElementById('image2');

let image3Element= document.getElementById('image3');

let maxAttempts=25;
let userAttemptsCounter=0;

let Image1Index;
let Image2Index;
let Image3Index;


let nameArr=[];
let votesArr=[];
let displayArr=[];

function item(name,source) {
  this.name=name;
  this.source=source;
  this.votes=0;
  this.display=0;

  item.allItems.push(this)
  // localStorage.setItem('item' , JSON.stringify(item.allItems));
nameArr.push(this.name);
}


item.allItems=[];



new item ('bag','img/bag.jpg');
new item ('banana','img/banana.jpg');
new item ('bathroom','img/bathroom.jpg');
new item ('boots','img/boots.jpg');
new item ('breakfast','img/breakfast.jpg');
new item ('bubblegum','img/bubblegum.jpg');
new item ('chair','img/chair.jpg');
new item ('cthulhu','img/cthulhu.jpg');
new item ('dog-duck','img/dog-duck.jpg');
new item ('dragon','img/dragon.jpg');
new item ('pen','img/pen.jpg');
new item ('pet-sweep','img/pet-sweep.jpg');
new item ('scissors','img/scissors.jpg');
new item ('shark','img/shark.jpg');
new item ('sweep','img/sweep.png');
new item ('tauntaun','img/tauntaun.jpg');
new item ('unicorn','img/unicorn.jpg');
new item ('usb','img/usb.gif');
new item ('water-can','img/water-can.jpg');
new item ('wine-glass','img/wine-glass.jpg');



console.log(item.allItems);


function generateRandomIndex() {
 
  return Math.floor(Math.random() * item.allItems.length);
}

let displayPictures=[];

function renderThreeImages() {
  console.log('before' , displayPictures);

  Image1Index=generateRandomIndex();
  Image2Index=generateRandomIndex();
  Image3Index=generateRandomIndex();

 
  while (Image1Index===Image2Index ||Image1Index===Image3Index || Image3Index === Image2Index){

    Image1Index=generateRandomIndex();
    Image2Index=generateRandomIndex();
    Image3Index=generateRandomIndex();
  }

  


     console.log('after',displayPictures);


  image1Element.src=item.allItems[Image1Index].source;
  item.allItems[Image1Index].display++;

  image2Element.src=item.allItems[Image2Index].source;
  item.allItems[Image2Index].display++;

  image3Element.src=item.allItems[Image3Index].source;
  item.allItems[Image3Index].display++;

}


renderThreeImages();

coantainer.addEventListener('click',handleUserClick);



function handleUserClick(event) {
  console.log(event.target.id);

  userAttemptsCounter++;

  console.log(userAttemptsCounter);

  

  if (userAttemptsCounter<=maxAttempts) {

    if (event.target.id ==='image1') {
      item.allItems[Image1Index].votes++;
    }else if(event.target.id ==='image2'){
      item.allItems[Image2Index].votes++;
    }else if (event.target.id ==='image3')
      item.allItems[Image3Index].votes++;
    
    
    console.log(item.allItems);
    renderThreeImages();

    
  }else{
    let button=document.getElementById('button');
    
    button.addEventListener('click',showingList);
    button.hidden=false;

for (let i = 0; i < item.allItems.length; i++) {
votesArr.push(item.allItems[i].votes);
displayArr.push(item.allItems[i].display);
}
    showingChart();
coantainer.removeEventListener('click',handleUserClick)
}

console.log(votesArr);







function showingList() {
  let list=document.getElementById('results');

    let itemResult;

    for (let i = 0; i < item.allItems.length; i++) {
      itemResult=document.createElement('li');
      list.appendChild(itemResult);
      itemResult.textContent=`${item.allItems[i].name} has ${item.allItems[i].votes} votes and was seen ${item.allItems[i].display} times`
      
    }
    
    button.removeEventListener('click',showingList);
    
  }

}

function showingChart() {
  let ctx = document.getElementById('myChart').getContext('2d');
  
  let chart= new Chart(ctx,{
    
   type: 'bar',

   data:{
    
      labels: nameArr,
      
      datasets: [
        {
        label: 'votesArr',
        data: votesArr,
        backgroundColor: [
          'rgb(25,22,24)',
        ],
  
        borderWidth: 1
      },

      {
        label: 'displayArr',
        data: displayArr,
        backgroundColor: [
          'blue',
        ],
  
        borderWidth: 1
      }
      
    ]
    },
    options: {}
  });
  
}

