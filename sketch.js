// aggiungere bottoni con classe

let angle = 0;
let w = 20;
let maxD;
let song;
let analyzer;
let volume;
function preload() {
   song = loadSound('./assets/Woodkid - Goliath.mp3');
}

function setup() {
  let cnv = createCanvas(600, 600, WEBGL);
  let xCnv = (windowWidth - width) / 2;
  let yCnv = (windowHeight - height) / 2;
  cnv.position(xCnv, yCnv);

  maxD = dist(0, 0, 300, 300);

  analyzer = new p5.Amplitude();
  analyzer.setInput(song);
  frameRate(12);
}
function mouseClicked() {
  if (song.isPlaying() == false) {
    song.loop();
    //song.play();
  }
}

function draw() {

  background(255);
  ortho(-500, 500, 500, -500, 0, 10000);
  ambientLight(30, 30, 30);
  pointLight(0, 255, 255, 10000, 0, 0);
  pointLight(0, 255, 255, -10000, 0, 0);
  pointLight(255, 0, 0, 0, 10000, 0);
  pointLight(255, 0, 0, 0, -10000, 0);
  rotateX(-PI / 4 * 3);
  rotateY(-PI / 4 * 3);



  volume = analyzer.getLevel();
  volume = map(volume, 0, 1, 0, 20);

  let offset = 0;

  for (let z = 0; z < height; z += w) {
    for (let x = 0; x < width; x += w) {
      push();
      let d = dist(x, z, width / 2, height / 2);
      let offset = map(d, 0, maxD, -PI, PI);
      // let a = angle + offset;
      let a = volume + offset;
      let h = floor(map(sin(a), -1, 1, 100, 300));
      noStroke();
      specularMaterial(255,200);
      shininess(20);
      translate(x - width / 2, 0, z - height / 2);
      box(w - 5, h, w);
      pop();
    }
    offset += 0.2;
  }
  // angle += 0.1;
  orbitControl(10, 10, 10);
}





// function addBox(){
//   aNewBox = new Box(w - 2, h, w, 255, 200, 20);
// }
//
// class Box {
//   constructor(temp_w, temp_h, temp_d, temp_shader, temp_opacity, temp_shininess) {
//     this.w = temp_w;
//     this.h = temp_h;
//     this.d = temp_d;
//     this.color = temp_color;
//     this.opacity = temp_opacity;
//     this.shininess = temp_shininess;
//   }
//
//   display() {
//     push();
//     noStroke();
//     specularMaterial(255,200);
//     shininess(20);
//     translate(x - width / 2, 0, z - height / 2);
//     box(w - 2, h, w);
//     pop();
//   }
//
// }
