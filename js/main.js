var canvas, ctx;
var n = 100,a=1;
// var p=[10,10,10,10,10,10];
// Length of each segment of the snake
var segLength = 15;
var snakeColor;
var segColor;

 // Get screen height & width
 const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
 const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

// AutoDraw 
var firstLoop = true
var posLoop = 0
var posInnerLoop = 0
// var xPos = [vw*0.1, vw*0.25, vw*0.50, vw*0.75, vw]
// var yPos = [vh*0.1, vh*0.25, vh*0.50, vh*0.75, vh]
console.log('vw*0.25', vw*0.25)
 var xPos = [0, vw*0.25, vw*0.75, vw*0.60, vw*0.15, vw*0.25, vw*0.65, vw*0.75, 0]
var yPos = [vh*0.15, vh*0.55, vh*0.60, vh*0.15, vh*0.25, vh*0.60, vh*0.95, vh*0.15, 0]

// Arrays of x,y positions of each coordinate system 
// one for each segment
// Trick to create arrays filled with zero values
var x = Array.apply(null, Array(n)).map(Number.prototype.valueOf,0);
var y = Array.apply(null, Array(n)).map(Number.prototype.valueOf,0);
var mousePos;
var canvas = document.getElementById("snake");

var idleTime = 0;
function timerIncrement() {
    idleTime = idleTime + 1;
    if (idleTime > 4) { // 5 sec
        a = 1
    }
}
window.onload = function() {

  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    console.log('helloooo', )
    a=1
  }else{
    a=0
    var idleInterval = setInterval(timerIncrement, 1000);
    document.addEventListener('mousemove', e => {
      idleTime = 0;
      a=0
    })
    document.addEventListener('keydown', function(e) {
      idleTime = 0;
      a=0
    });
  }
    // Adding eventlisteners to footnotes
    const footnotes = document.querySelectorAll(".title__wrapp");
    if (vw < 1200) {
        footnotes.forEach((footnote) => {
            // Seting card position
            if (vw < 767) {
                const card = footnote.querySelector('.title__card')
                console.log('card', card)
                card.style.left =  0 - footnote.offsetLeft + 'px'
            }

            // Adding EventListener
            footnote.addEventListener("click", (e) => {
                const parent = e.target.parentNode;
                console.log('parent', parent)
                const footnote = parent.querySelector('.title__card')
                if (footnote) {
                    if (!footnote.classList.contains("title__card--open")) {
                        document.querySelectorAll('.title__card--open').forEach((item) => {
                            item.classList.remove('title__card--open')
                        })
                        document.querySelectorAll('.title__wrapp--open').forEach((item) => {
                            item.classList.remove('title__wrapp--open')
                        })
                        parent.classList.add('title__wrapp--open')
                        footnote.classList.add('title__card--open')
                    }
                }
            }, false);
        })
        const closeFootnotes = document.querySelectorAll('.title__close')
        closeFootnotes.forEach((closeElem) => {
            closeElem.addEventListener("click", (e) => {
                const parent = e.target.parentNode.parentNode;
                if (parent) {
                    if (parent.classList.contains("title__card--open")) {
                        parent.classList.remove('title__card--open')
                        parent.parentNode.classList.remove('title__wrapp--open')
                    }
                }
            }, false);
        })
    } else {
        // footnotes.forEach((footnote) => {
        //     footnote.addEventListener('mousemove', function (e) {
        //         const card = e.target.parentNode.querySelector('.title__card')
        //         console.log('e.target', e.target.parentNode.querySelector('.title__card').classList)
        //         if (card.classList.contains("title__footnote--post")) {
        //             segColor = 'rgba(255, 255, 255, 255)'
        //         } else if (card.classList.contains("title__footnote--design")) {
        //             segColor = 'rgba(255, 51, 210, 1)'
        //         } else if (card.classList.contains("title__footnote--tangle")) {
        //             segColor = '#FF9900c'
        //         } else if (card.classList.contains("title__footnote--locations")) {
        //             segColor = '#FF0000'
        //         }
        //         console.log('segColor', segColor)
        //     }, true);
        // })
      }
      init();
    function init() {
      const mainBody = document.querySelector('html')
      ctx = canvas.getContext('2d');
      
      mainBody.addEventListener('mousemove', function (evt) {
        mousePos = getMousePos(mainBody, evt);
      }, true);
        
        // starts animation
      requestAnimationFrame(animate);
    }
        
        function getMousePos(canvas, evt) {
          // necessary to take into account CSS boundaries
          var rect = canvas.getBoundingClientRect();
          p = ctx.getImageData(evt.clientX - rect.left, evt.clientY - rect.top, 1, 1).data;
          return {
              x: evt.clientX - rect.left,
              y: evt.clientY - rect.top
          };
        }
        var storeX = vw/2
        var storeY = vh/2
        function animate() {
        if(a==0) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          // draw the snake, only when the mouse entered at
          if(mousePos !== undefined) {
            //If snake eats food then change length & update food
             drawSnake(mousePos.x, mousePos.y);
          }
          requestAnimationFrame(animate);
        } else {
            let tempX, tempY, lastPos
            if (posLoop > 0) {
              lastPos = posLoop - 1
            } else {
              lastPos = xPos.length - 1
            }
            tempX = (((xPos[posLoop] - xPos[lastPos]) / 20) * posInnerLoop) + xPos[lastPos]
            tempY = (((yPos[posLoop] - yPos[lastPos]) / 20) * posInnerLoop) + yPos[lastPos]

            if (posInnerLoop < 20) {
              posInnerLoop++
            } else {
              if (xPos.length - 1 > posLoop) {
                posLoop++
              } else {
                posLoop = 0
              }
              posInnerLoop = 0
            }
            
            tempX = Math.abs(parseFloat(tempX).toFixed(0))
            tempY = parseFloat(tempY).toFixed(0)
            tempY = Math.abs(tempY)
            firstLoop = false
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawSnake(tempX, tempY)
            setTimeout(() => {
              requestAnimationFrame(animate);
            }, 75)
          }
        }

        function getRandomArbitrary(min, max) {
          return Math.random() * (max - min) + min;
        }
        function getRandomInt(min, max) {
          min = Math.ceil(min);
          max = Math.floor(max);
          return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        
        function drawSnake(posX, posY) {
          dragSegment(0, posX, posY);
          for(var i=0; i < x.length-1; i++) {
            dragSegment(i+1, x[i], y[i]);
          }  
        }
        
        function dragSegment(i,  xin,  yin) {
           dx = xin - x[i];
           dy = yin - y[i];
          //calculate inclination of co-ordinate system based on the gradient
           angle = Math.atan2(dy, dx);
          //set new origins
           x[i] = xin - Math.cos(angle) * segLength;
           y[i] = yin - Math.sin(angle) * segLength;
          
          ctx.save();
          ctx.translate(x[i], y[i]);
          ctx.rotate(angle);
        
          drawLine(0, 0, segLength, 0, 100);
          
          ctx.restore();
        }
        
        function drawLine(x1, y1, x2, y2, width) {
          ctx.save();
          if (snakeColor) {
            ctx.strokeStyle = snakeColor
          } else {
            ctx. strokeStyle = "rgba(95, 167, 243, 255)"
          }
          ctx.lineWidth = width;
          
          ctx.beginPath();
          ctx.moveTo(x1-0.5, y1);
          ctx.lineTo(x2+0.5, y2);
          ctx.stroke();
          
          ctx.restore();
        }
};

const changeSnakeColor = (item) => {
  if (!item) {
    snakeColor = 'rgba(95, 167, 243, 255)'
  } else if (item === 'post') {
    snakeColor = '#00DE24'
  } else if (item === 'design') {
    snakeColor = '#FF33D2'
  } else if (item === 'tangle') {
    snakeColor = '#FF9900'
  } else if (item === 'locations') {
    snakeColor = '#FF0000'
  }
}