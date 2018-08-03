const gameWindow = document.getElementById('main-container');
const skyBox = document.getElementById('sky');
const roadBox = document.getElementById('road');
const roadRectangleBox = document.getElementById('road-rectangle-box');
const overlayDiv = document.getElementById('overlay');
const gameHeight = 480;
const gameWidth = 720;
const roadHeight = roadBox.style.top;
const roadWidth = roadBox.style.right;
const charSprite = document.getElementById('char-sprite');
const willLoseBlock = document.getElementById('safe-or-no');
const spriteOptionArray = ["./gameSprites/gameSpriteNeutral.png", "./gameSprites/gameSpriteRight.png", "./gameSprites/gameSpriteNeutral.png", "./gameSprites/gameSpriteLeft.png"]
let spriteOptionIndex = 0;

///////////////////////////////////////////////////////////////////////
// Starting and ending the game
// "Start" functionality

  function startGame() {
    initializeTimer();
    listen();
    animateMainCharacter();
    setInterval(function(){
      createRoadRectangle();
    }, 500);
    setInterval(function(){
      createClouds();
    }, 3500);
    setInterval(function(){
      createObstacle();
    }, 5000);
  }

// "Game Over" functionality
  function gameOver() {
    alert("YOU LOSE");
    clearInterval(startGame);
    location.reload();
  }

////////////////////////////////////////////////////////////////////////
// Changing the size of a passed-through item.

  function changeSize(targetItem, horizontalFactorOfChange, verticalFactorOfChange) {
    let oldWidth = parseInt(window.getComputedStyle(targetItem).width);
    let oldHeight = parseInt(window.getComputedStyle(targetItem).height);

    targetItem.style.width = `${Math.ceil(oldWidth * horizontalFactorOfChange)}px`;
    targetItem.style.height = `${Math.ceil(oldHeight * verticalFactorOfChange)}px`;
  }

//////////////////////////////////////////////////////////////////////
// Road rectangle creation and propagation.

function createRoadRectangle() {
  const roadRectangle = document.createElement("div");
  roadRectangle.className = 'road-rectangle';
  var top = roadRectangle.style.top = 144;
  skyBox.appendChild(roadRectangle);

  let counter = 0;

  function moveRoadRectangle() {

    if (counter % 50 === 0) {
      changeSize(roadRectangle, 1.0005, 1);
      roadRectangle.style.top = `${top += 1}px`;
    }

    if (counter % 25 === 0) {
      changeSize(roadRectangle, 1, 1.000005);
      roadRectangle.style.top = `${top += 1}px`;
    }

    roadRectangle.style.top = `${top += 3}px`;
    counter += 1;

    if (top < gameHeight) {
      window.requestAnimationFrame(moveRoadRectangle);
    } else {
      roadRectangle.remove();
    }
  }

  window.requestAnimationFrame(moveRoadRectangle);
  return roadRectangle;
}
////////////////////////////////////////////////////////////////////
// OBSTACLES //

function createObstacle() {
  const obstacle = document.createElement("div");
  obstacle.className = 'obstacle';
  var top = obstacle.style.top = 144;
  skyBox.appendChild(obstacle);

  function moveObstacle() {
   obstacle.style.top = `${top += 2}px`;
   changeSize(obstacle, 1.00000005, 1.00000005);
   if (top < gameHeight) {
     window.requestAnimationFrame(moveObstacle);
   } else {
     obstacle.remove();
   }
 }
  window.requestAnimationFrame(moveObstacle);
  return obstacle;
}

///////////////////////////////////////////////////////////////////////
// MAIN CHARACTER SPRITE ANIMATION
  function animateMainCharacter() {
    let counter = 0;
    function step() {
      window.requestAnimationFrame(step)
      if (spriteOptionIndex == 3) {
        spriteOptionIndex = -1;
      }
      if (counter % 6 == 0) {
        charSprite.src = spriteOptionArray[spriteOptionIndex += 1];
      }
      counter++;
    }
    window.requestAnimationFrame(step)
  }

///////////////////////////////////////////////////////////////////
// CLOUDS //

function createClouds() {
  const cloud = document.createElement("div");
  cloud.className = 'cloud';
  cloud.style.top = `${0}px`;
  cloud.style.top = `${-Math.floor((Math.random() * 90) + 1)}px`;
  var left = cloud.style.left = 5;
  overlayDiv.appendChild(cloud);

  function moveCloud() {
   cloud.style.left = `${left += 0.5}px`;

   if (left < gameWidth) {
     window.requestAnimationFrame(moveCloud);
   } else {
     cloud.remove();
   }
 }
  window.requestAnimationFrame(moveCloud);
  return cloud;
}

////////////////////////////////////////////////////////////////////////////
// Sun creation & appending to DOM
  let sun = document.createElement("img");
  sun.src = "./gameSprites/sun.png";
  sun.className = "sun";
  skyBox.appendChild(sun);

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
// API Functionality


  // document.addEventListener('DOMContentLoaded', () => {
//   const endPoint = 'http://localhost:3000/api/v1/users';
//   fetch(endPoint)
//     .then(res => res.json())
//     .then(json =>
//       json.forEach(user => {
//         const markup = `
//           <h3>${user.name} : ${user.points}
//           </h3>
//         `;
//
//         document.getElementById('sky').innerHTML += markup;
//       })
//     );
//     // createUser()
// });

function updateScore() {
let bodyJSON = {name: "Sang", points: 89}
fetch(`http://localhost:3000/api/v1/users/1`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(bodyJSON),
    }).then(res => res.json()).then(updatedNote => console.log(updatedNote));
      // our backend responds with the updated note instance represented as JSON
  };

function createUser() {
let bodyJSON = {name: "Issac", points: 39}
fetch(`http://localhost:3000/api/v1/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(bodyJSON),
    }).then(res => res.json()).then(data => console.log(data));
      // our backend responds with the updated note instance represented as JSON
}