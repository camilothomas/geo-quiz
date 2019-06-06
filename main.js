// main.js for mapApp
// B - CR - ES - G - H - N - P <-- initials for the countries of Central America are used for file names, etc
// all of the map images have dimensions: 1193 x 873
// file names used for pickRightMap function:
/* ['A.png', 'B.png', 'BCR.png', 'BCRES.png', 'BCRESG.png', 'BCRESGH.png',
    'BCRESGHN.png', 'BCRESGHNP.png', 'BCRESGHP.png', 'BCRESGN.png', 'BCRESGNP.png',
	  ...,
	 'GHN.png', 'GHNP.png', 'GHP.png', 'GN.png', 'GNP.png', 'GP.png',
	 'H.png', 'HN.png', 'HNP.png', 'HP.png', 'N.png', 'NP.png', 'P.png']; */

var canvas = document.querySelector('.myCanvas');
var width = window.innerWidth;
var height = window.innerHeight;

var ctx = canvas.getContext('2d');
let image = new Image();
let endImage = new Image();
endImage.src = 'img/tucan.png';

let newW;
let newH;

let gameOver = false;

// let countries = [[name string, ifFound (bool), nameX]]
let countries = [['B', 'Belize', false, 75],
				['CR', 'Costa Rica', false, 130],
				['ES', 'El Salvador', false, 145],
				['G', 'Guatemala', false, 135],
				['H', 'Honduras', false, 125],
				['N', 'Nicaragua', false, 145],
				['P', 'Panama', false, 120]]; 
/*****************
 * mouse related *
 *****************/
var pressed = false;
var curX;
var curY;
let id;

canvas.ontouchstart = function() {
};

/*************
 * functions *
 *************/
function imgSetter(picString) {
  image.src = 'img/' + picString;
  image.onload = function() {
    ctx.drawImage(image, 0, 0, 1193, 873, 0, 0, newW, newH);
  }
}

function setNewWH() {
  if (873/1193 < height/width) {
    newW = width * .95;
    newH = 873 * newW / 1193;
  } else {
    newH =  height * .95;
    newW = newH * 1193 / 873;
  }
  canvas.width = newW;
  canvas.height = newH;
}

// layout unfound country names on the bottom left corner of the screen
// needs a lot of work

function drawNames() {
  // set colors and font
  ctx.fillStyle = 'rgb(255,255,255)';
  ctx.font = '28px Fredoka One';

  for (let i = 0; i < countries.length; i++) {
  	if (!countries[i][2]) {
      ctx.fillText(countries[i][1], 50, newH * (.93 - (i * .07)));
  	  ctx.lineWidth = 2.5;
      ctx.strokeStyle = 'rgb(0,155,215)';
      ctx.strokeText(countries[i][1], 50, newH * (.93 - (i * .07)));
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = 'rgb(0,0,50)';
      ctx.strokeText(countries[i][1], 50, newH * (.93 - (i * .07)));
    }
  }
}

function drawMap() {
  //paintBGblack();
  // draw whatever map has been set
  ctx.drawImage(image, 0, 0, 1193, 873, 0, 0, newW, newH);
  drawNames();
  
  if (image.src.includes("img/BCRESGHNP.png")) {
    console.log("passesTest");
    drawTucan();
  }
}

function pickRightMap() {
  let imgName = '';
  for(let y = 0; y < countries.length; y++) {
  	if (countries[y][2]) {
  		imgName += countries[y][0];
  	}
  }
  imgName += '.png';
  return imgName;
}

window.onresize = function() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  setNewWH();
  //paintBGblack();
  drawMap();
}

canvas.onmousedown = function() {
  pressed = true;
};
canvas.onmouseup = function() {
  pressed = false;
};

// update mouse pointer coordinates

canvas.onmousemove = function(e) {
  curX = (window.Event) ? e.pageX : e.clientX + (document.documentElement.scrollLeft ? 
    document.documentElement.scrollLeft : document.body.scrollLeft);
  curY = (window.Event) ? e.pageY : e.clientY + (document.documentElement.scrollTop ?
    document.documentElement.scrollTop : document.body.scrollTop);
}

function mainAnimation() {
  drawMap();
  let flag = false;
  if (pressed && gameOver) {
    if (curX  < newW*.3 && curY > newH*.8)
    resetGame();
  }
  if (pressed) {
    if (id === undefined) {  
      if (!countries[6][2] && curX > 55 && curX < (countries[6][3] + 50)
      	  && curY < newH * .53 && curY > newH * .47) {
        id = 6;
      } else if (!countries[5][2] && curX > 55 && curX < (countries[5][3] + 50)
      	         && curY < newH * .60 && curY > newH * .54) {
        id = 5;
      } else if (!countries[4][2] && curX > 55 && curX < (countries[4][3] + 50)
      	         && curY < newH * .67 && curY > newH * .61) {
        id = 4;
      } else if (!countries[3][2] && curX > 55 && curX < (countries[3][3] + 50)
      	         && curY < newH * .74 && curY > newH * .68) {
        id = 3;
      } else if (!countries[2][2] && curX > 55 && curX < (countries[2][3] + 50)
      	         && curY < newH * .81 && curY > newH * .75) {
        id = 2;
      } else if (!countries[1][2] && curX > 55 && curX < (countries[1][3] + 50)
      	         && curY < newH * .88 && curY > newH * .82) {
        id = 1;
      } else if (!countries[0][2] && curX > 55 && curX < (countries[0][3] + 50)
      	         && curY < newH * .95 && curY > newH * .89) {
        id = 0;
      }
    }
    drawDragged(id);
  }
  // at release, was it dragged to right place?  y=mx+b at its finest
  if (!pressed) {
    if (id === 6 && curX >= newW *.625 && curX <= newW *.92 &&
        curY >= newH*.675 && curY <= newH*.84) {
  	  countries[id][2] = flag = true;
    } else if (id === 5 && curX >= newW *.385 && curX <= newW *.615 &&
               curY >= newH*.305 && curY <= newH*.6) {
      if (curX <= newW*.5425 && curY <= newH*.4325) {
        let m = (newH*.1275)/(newW*.1575);
        if (m*(curX-.385*newW) < -(curY-newH*.4325)) {
        } else { countries[id][2] = flag = true; }
      } else { countries[id][2] = flag = true; }
    } else if (id === 4 && curX >= newW *.3025 && curX <= newW *.615 &&
               curY >= newH*.2375 && curY <= newH*.449) {
      if (curX >= newW*.4155 && curY >= newH*.3075) {
        m = .1415*newH/(.1995*newW);
        if (m*(curX-.4155*newW) > -(curY-newH*.449)) {
        } else { countries[id][2] = flag = true; }
      } else if (curX <= newW*.41 && curY >= newH*.3525) {
        m = -(.0965*newH)/(.1075*newW);
        if (-(m*(curX-.3025*newW)) < (curY-newH*.3525)) {
        } else { countries[id][2] = flag = true; }
      } else { countries[id][2] = flag = true; }
    } else if (id === 3 && curX >= newW *.1575 && curX <= newW *.361 &&
               curY >= newH*.115 && curY <= newH*.3925) {
      if (curX >= newW*.3135 && curY <= newH*.245) {
      } else if (curX <= newW*.196 && curY <= newH*.2325) {
      } else if (curX >= newW*.285 && curY >= newH*.26) {
        m = (newH*.1325)/(newW*.076);
        if (m*(curX-.285*newW) > -(curY-newH*.3925)) {
        } else { countries[id][2] = flag = true; }
      } else {
  	    countries[id][2] = flag = true; }
    } else if (id === 2 && curX >= newW *.2625 && curX <= newW *.3875 &&
               curY >= newH*.348 && curY <= newH*.4355) {
      if (curX >= newW*.3075 && curY <= newH*.3835) {
        m = (newH*.0355)/(newW*.08);
        if (m*(curX - newW*.3075) > (curY - newH*.348)) {
        } else { countries[id][2] = flag = true; }
      } else {
  	    countries[id][2] = flag = true; } 	    
    } else if (id === 1 && curX >= newW *.475 && curX <= newW *.6475 &&
        curY >= newH*.5625 && curY <= newH*.784) {
      if (curX <= newW*.625 && curY >= newH*.6425) {
        m = (newH*.1415)/(newW*.15);
        if (m*(curX - newW*.475) < (curY - newH*.6425)) {
        } else {
          countries[id][2] = flag = true;  
        }
      } else { countries[id][2] = flag = true; }
    } else if (id === 0 && curX >= newW *.31 && curX <= newW *.3825 &&
        curY >= newH*.0675 && curY <= newH*.2475) {
      countries[id][2] = flag = true;
    } 
    id = undefined;
    if (flag) {
      imgSetter(pickRightMap());
    }
    flag = false;
  }
  //countryCoord();
  requestAnimationFrame(mainAnimation);
}

function drawDragged(x) {
  if (id >= 0) {
    ctx.fillText(countries[id][1], curX - Math.floor(countries[id][3]/2), curY);
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = 'rgb(155,215,0)';
    ctx.strokeText(countries[id][1], curX - Math.floor(countries[id][3]/2), curY);
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = 'rgb(0,50,0)';
    ctx.strokeText(countries[id][1], curX - Math.floor(countries[id][3]/2), curY);
  }
}
//*****TESTING COORDINATES*****
function countryCoord() {
  ctx.strokeStyle = 'rgb(0,0,0)';
  ctx.lineWidth = 1;
  ctx.strokeRect(newW*.1, newH*.85, 150, 35);
  //curX > newW*.1 && curX < newW*.1+150 && curY < newH*.85+35 && curY > newH*.85    
}
// let's get active
//paintBGblack();
setNewWH();
imgSetter('A.png');
image.onload = mainAnimation;

// after successfully completing the quiz
// toucan animations begin and include a reset button

let endCounter = 0;
let xyz = 1;
let dimmer = 0;

function drawTucan() {
  
  
  if (endCounter < 225) {
    if (endCounter % 1 === 0) {
      xyz = xyz - .004;
    }
    if (endCounter % 5 === 0) {
      dimmer = dimmer + .015;
    }
    ctx.fillStyle = 'rgba(255,255,255,'+dimmer+')';
    ctx.fillRect(0, 0, newW, newH);
    ctx.drawImage(endImage, newW * xyz, newH * xyz, newW, newH);  
    endCounter++;
  } else {
    ctx.fillStyle = 'rgba(255,255,255,.675)';
    ctx.fillRect(0, 0, newW, newH);
    ctx.drawImage(endImage, newW * .1, newH * .1, newW, newH);
    //
    ctx.fillText('Play Again', newW*.1, newH * .9);
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = 'rgb(0,155,215)';
    ctx.strokeText('Play Again', newW*.1, newH * .9);
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = 'rgb(0,0,50)';
    ctx.strokeText('Play Again', newW*.1, newH * .9);
    //

    gameOver = true;
  }
  
}

function resetGame() {
  imgSetter('A.png');
  gameOver = false;
  endCounter = 0;
  xyz = 1;
  dimmer = 0;
  countries.forEach(country => {
    country[2] = false;
  });
}