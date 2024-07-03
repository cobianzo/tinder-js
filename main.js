"use strict";

const PROFILES = [
  {
    file: "./assets/imgs/perfil1.jpg",
    name: "V. Rubalcaba",
    description: "Estoy aqui para que me sigan en el ig",
  },
  {
    file: "./assets/imgs/perfil1.jpg",
    name: "Giuseppe Birra",
    description: "Juro que tengo 28 años",
  },
];

let currentProfileIndex = 0;
const $app = document.getElementById("app");
const $canvasFront = $app.querySelector("#swipe-canvas-front");

const loadProfile = function ($container = null, index = null) {
  let loadIndex = index === null ? currentProfileIndex : index;
  const currentProfile = PROFILES[loadIndex];

  // TODO validation. Does the current profile exist?
  const img = currentProfile.file;
  const $imageContainer = $container.querySelector("#image");
  console.log(img);
  $imageContainer.innerHTML =
    '<img src="' + img + '" alt="' + currentProfile.name + '"/>';
};

// The action:

loadProfile($canvasFront);
