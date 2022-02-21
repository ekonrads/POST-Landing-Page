var canvas, ctx;
var n = 80,a=0;
// var p=[10,10,10,10,10,10];
// Length of each segment of the snake
var segLength = 15;
var snakeColor;
var segColor;

// Arrays of x,y positions of each coordinate system 
// one for each segment
// Trick to create arrays filled with zero values
var x = Array.apply(null, Array(n)).map(Number.prototype.valueOf,0);
var y = Array.apply(null, Array(n)).map(Number.prototype.valueOf,0);
var mousePos;
var canvas = document.getElementById("snake");

window.onload = function() {
    // Get screen width
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)

    // Adding eventlisteners to footnotes
    console.log('vw', vw)
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
        //             segColor = '#FF6B00'
        //         } else if (card.classList.contains("title__footnote--locations")) {
        //             segColor = '#FF0000'
        //         }
        //         console.log('segColor', segColor)
        //     }, true);
        // })
        init();
    }
    function init() {
        const mainBody = document.querySelector('html')
           ctx = canvas.getContext('2d');
           segColor = "rgba(95, 167, 243, 255)"
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
        
        function animate() {
         if(a==0)
          {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          // draw the snake, only when the mouse entered at
          if(mousePos !== undefined) {
            //If snake eats food then change length & update food
             drawSnake(mousePos.x, mousePos.y);
          }
          requestAnimationFrame(animate);
          }
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
    snakeColor = '#FF6B00'
  } else if (item === 'locations') {
    snakeColor = '#FF0000'
  }
}