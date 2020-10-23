// aggiungere bottoni con classe

//let angle = 0;
let w = 20;
let maxD;
let song;
let analyzer;
let volume;
let buttonplay;
let buttonplayTexture;

function preload() {
  song = loadSound('./assets/Woodkid - Goliath.mp3');
  buttonplayTexture = loadImage("./assets/playbutton.png");
}

function setup() {
  let cnv = createCanvas(600, 600, WEBGL);
  let xCnv = (windowWidth - width) / 2;
  let yCnv = (windowHeight - height) / 2;
  cnv.position(xCnv, yCnv);

  buttonplay = new Button(0 ,0 , 500, 50, 50, buttonplayTexture);

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
  pointLight(0, 255, 255, 1000, 0, 0);
  pointLight(0, 255, 255, -1000, 0, 0);
  pointLight(255, 0, 0, 0, 1000, 0);
  pointLight(255, 0, 0, 0, -1000, 0);


  buttonplay.display();

  // push();
  // noStroke();
  // specularMaterial(255);
  // translate(0, 0, 500);
  // texture(buttonplayTexture);
  // plane(50, 50);
  // pop();

  volume = analyzer.getLevel();
  volume = map(volume, 0, 1, 0, 50);

  push();
  rotateX(-PI / 4 * 3);
  rotateY(-PI / 4 * 3 );
  let offset = 0;

  for (let z = 0; z < height; z += w) {
    for (let x = 0; x < width; x += w) {
      push();
      let d = dist(x, z, width / 2, height / 2);
      let offset = map(d, 0, maxD, -PI, PI);
      // let a = angle + offset;
      // if per cambiare colore all'altezza massima!!!!!!!!!!!
      //classe box!!!!!!!!!!!!!!!!!
      let a = volume + offset;
      let h = floor(map(sin(a), -1, 1, 100, 300));
      noStroke();
      specularMaterial(255, 0, 255, 170);
      shininess(2);
      translate(x - width / 2, 0, z - height / 2);
      box(w - 5, h, w);
      pop();
    }
    offset += 0.2;
  }
  pop();
  // angle += 0.1;
  //orbitControl(10, 10, 10);
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

    // class Box{
    //   constructor(temp_w, temp_h, temp_d, temp_shader, temp_opacity, temp_shininess) {
    //   this.w = temp_w;
    //   this.h = temp_h;
    //   this.d = temp_d;
    //   this.color = temp_color;
    //   this.opacity = temp_opacity;
    //   this.shininess = temp_shininess;
    // }
    //
    // display() {
    //   push();
    //
    //   pop();
    // }






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




// let myTinyRectangle;
//
// function preload(){
//   // put preload code here
// }
//
// function setup() {
//   createCanvas(windowWidth,windowHeight)
//   myTinyRectangle = new MyRect(200, 300, 70, 35);
// }
//
// function draw() {
//   myTinyRectangle.show();
//   }
//
// function mouseDragged(){
//
// }
//
// function mouseReleased(){
//
// }
//
//
// class MyRect {
//   constuctor ( temp_x, temp_y, temp_width, temp_height) {
//     this.x = temp_x;
//     this.y = temp_y;
//     this.width = temp_width;
//     this.height = temp_height;
//   }
//
//   show(){
//     push();
//     rectMode(CENTER);
//     rect(this.x, this.y, this.width, this.height);
//     pop();
//   }
//
//   move(){
//     this.x=mouseX;
//     this.y=mouseY;
//
//   }
// }
