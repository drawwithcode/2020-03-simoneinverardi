let w = 15;
let maxD;

let song;
let analyzer;
let volume;

let buttonPlay;
let buttonPlayTexture;

let boxStandard;
let boxColored;

let isTheMouseClicked = false;


function preload() {
  song = loadSound('./assets/Woodkid - Goliath.mp3');
  buttonPlayTexture = loadImage("./assets/playbutton.svg");
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

function draw() {

  background(255);
  ortho(-500, 500, 500, -500, 0, 10000);
  ambientLight(30, 30, 30);
  pointLight(0, 255, 255, 1000, 0, 0);
  pointLight(0, 255, 255, -1000, 0, 0);
  pointLight(255, 0, 0, 0, 1000, 0);
  pointLight(255, 0, 0, 0, -1000, 0);

  if (isTheMouseClicked == false) {
    buttonPlay = new Button(0 , 450 , 500, 100, 100, buttonPlayTexture);
    buttonPlay.display();
  } else {
    if (song.isPlaying() == false) {
      song.loop();
    }
  }

  volume = analyzer.getLevel();
  volume = map(volume, 0, 1, 0, 20);

  push();
  rotateX(-PI / 4 * 3);
  rotateY(PI / 4 * 3);
  let offset = 0;

  for (let z = 0; z < height; z += w) {
    for (let x = 0; x < width; x += w) {
      push();
      let d = dist(x, z, width / 2, height / 2);
      let offset = map(d, 0, maxD, -PI, PI);

      let a = volume + offset;
      let h = floor(map(sin(a), -1, 1, 100, 300));

      if (h >= 295 & d < maxD - 170){
        boxColored = new Box(x - width / 2, 0, z - height / 2, w - 5, h, w, 255, 0, 255, 200, 2);
        boxColored.display();
      } else{
        boxStandard = new Box(x - width / 2, 0, z - height / 2, w - 5, h, w, 255, 0, 255, 150, 2);
        boxStandard.display();
      }

    }
    offset += 0.2;
  }
  pop();
  if (isTheMouseClicked == true) {
  orbitControl(10, 10, 10);
}
}
class Button{
  constructor (temp_x, temp_y, temp_z, temp_width, temp_height, temp_texture) {
    this.x = temp_x;
    this.y = temp_y;
    this.z = temp_z;
    this.width = temp_width;
    this.heigth = temp_height;
    this.texture = temp_texture;
  }
  display() {
    push();
    noStroke();
    specularMaterial(255);
    translate(this.x, this.y, this.z);
    texture(this.texture);
    plane(this.width, this.height);
    pop();
  }
}

class Box{
  constructor(temp_x, temp_y, temp_z, temp_w, temp_h, temp_d, temp_color1, temp_color2, temp_color3, temp_opacity, temp_shininess) {
    this.x = temp_x;
    this.y = temp_y;
    this.z = temp_z;
    this.w = temp_w;
    this.h = temp_h;
    this.d = temp_d;
    this.color1 = temp_color1;
    this.color2 = temp_color2;
    this.color3 = temp_color3;
    this.opacity = temp_opacity;
    this.shininess = temp_shininess;
  }

  display() {
    push();
    noStroke();
    specularMaterial(this.color1, this.color2, this.color3, this.opacity);
    shininess(this.shininess);
    translate(this.x, this.y, this.z);
    box(this.w, this.h, this.d);
    pop();
  }
}

function mouseClicked() {
  isTheMouseClicked = true;
}
