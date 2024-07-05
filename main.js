'use strict';
const PROFILES = [
  {
    file: './assets/imgs/perfil1.jpg',
    name: 'V. Rubalcaba',
    age: 33,
    description: 'Me gusta sobre todo la kizomba',
  },
  {
    file: './assets/imgs/perfil2.png',
    name: 'Giuseppe Birra',
    age: 28,
    description: 'Juro que tengo 28 años',
  },
  {
    file: './assets/imgs/perfil3.png',
    name: 'Wild but sentitive',
    age: 29,
    description: 'Como demuestra la imagen soy #Aventurero. #Destino. #Energia. #Wholistico',
  },
  {
    file: './assets/imgs/perfil4.png',
    name: 'Life coach',
    age: 29.8,
    description: 'Whenever you don\'t know what way to follow, take the path of my dick',
  }
]

window.currentProfileIndex = 0
const $app = document.querySelector('#app')
const $canvasFront = $app.querySelector('#swipe-canvas-front')
const $canvasBack = $app.querySelector('#swipe-canvas-back')
const template = document.getElementById('card-template');

// loads the current image and data of the current profile
window.loadProfile = function($canvasContainer = null, profileIndex = null) {
  $canvasContainer = $canvasContainer === null ? $canvasFront : $canvasContainer;
  profileIndex = (profileIndex === null) ? window.currentProfileIndex : profileIndex
  const { file, name, description, age } = PROFILES[profileIndex]

  // Clona el contenido del template
  const $clone = template.content.cloneNode(true);

  // Modifica el contenido del clon
  $clone.querySelector('img').src = file
  $clone.querySelector('.profile-info h3').textContent = name
  $clone.querySelector('.profile-info .description span').textContent = description
  $clone.querySelector('.profile-info .description small').textContent = age + ' años'

  // We move the container away to make the update and avoid seeing it in the screen (there is a flick)
  // $canvasContainer.style.transform = 'translate(1000px,0)';
// TODO: this deosnt fix the flick


  // Añade el clon al contenedor
  $canvasContainer.innerHTML = ''
  $canvasContainer.appendChild($clone);

  // setTimeout(resetTransform, 200);
}

function moveToNextProfile() {
  console.log('%c Move to next current', 'font-size:2rem; color:orange', window.currentProfileIndex);
  window.currentProfileIndex++;

  window.loadProfile($canvasFront);
  setTimeout(() => window.loadProfile($canvasBack, window.currentProfileIndex + 1), 500)
  
  
}

// The action:
window.loadProfile($canvasFront);
window.loadProfile($canvasBack, window.currentProfileIndex + 1);


function resetTransform(callback = null) {
  dragging = false;
  setTimeout(()=> {
    document.querySelectorAll('.card').forEach( c => {
      c.style.transition = 'none';
      c.style.transform = 'none';
      c.style.setProperty("WebkitTransform", "none");
    } );
    if (callback)
      callback();
  }, 1000)
}

// Swipe 
function swipe(dir) {
  if (! dragging)  {
    dragging = $canvasFront;
    dragging.style.transition = 'none';
  }
  console.log('%cSupero el threshold', 'font-size:2rem;', dragging);
  dragging.style.transform = 'translateX('+( (dir < 0) ? '-' : '' )+'1000px)';
  resetTransform(moveToNextProfile);
}
window.swipeLeft = function() {
  swipe(-1);
}
window.swipeRight = function() {
  swipe(1);
}

// $commands = $app.querySelectorAll('#commands');

let dragging = false; // false or the card element which is being dragged
let startDragX = 0;
let delta = 0;
let threshold = 120;

window.startDrag = function(event) {
  
  const card = event.target.closest('.card');
  if (card.id !== 'swipe-canvas-front') return false;
  if (dragging) return false;

  console.log('start dragging ',card.id, event);
  
  dragging = card;
  dragging.style.transition = 'none';
  startDragX = event.pageX;
  delta = 0;
  document.addEventListener('mousemove', window.drag);
  document.addEventListener('mouseup', window.stopDrag);
};



window.drag = function(event) {
  if (!dragging) {
    document.removeEventListener('mousemove', window.drag)
    document.removeEventListener('mouseup', window.stopDrag);
    return;
  }
  delta = event.pageX - startDragX;
  
  const translate = 'translateX(' + delta + 'px) ';
  const rotateDeg = delta*40*4/(3*document.querySelector('#app').clientWidth)
  const rotate = 'rotate(' + rotateDeg + 'deg)';
  dragging.style.transform = translate + rotate;
  // console.log('desplacement', dragging.style.transform);
  
  const desplacement = delta;
  // const desplacement = document.querySelector('#app').clientWidth



}
window.stopDrag = function(event) {
  
  dragging.style.transition = 'transform 1s ease';
  if ( Math.abs(delta) > threshold ) {
    if (delta < 0) swipeLeft();    
    else swipeRight();
  } else {    
    resetTransform();
  }
  dragging = false;
  delta = 0;
}
