

// console.log(majors);
// console.log(des);

const firebaseConfig = {
  apiKey: "AIzaSyCLRllBmm3Cmiw8ljR4pjYFkxvGegXvmM4",
  authDomain: "stud-accomplishment-showcase.firebaseapp.com",
  projectId: "stud-accomplishment-showcase",
  storageBucket: "stud-accomplishment-showcase.appspot.com",
  messagingSenderId: "161248142119",
  appId: "1:161248142119:web:fdc53cb0be9f4381113f02"
};

// Initialize Firebase
//  const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

//   var majorobjects = [];
//   var poslist=[];
//   var majorsubmit="nomajor";
//var majors=["Others"]
  var des={};
  var majors = [
    "General",
    "Biology",
    "BF",
    "BM",
    "CSE",
    "Chemistry",
    "CS",
    "DS",
    "Economics",
    "ESE",
    "GCS",
    "HM",
    "Humanities",
    "IMB",
    "IMA",
    "Math",
    "Neural Science",
    "Physics",
    "Social Science",
    "SDHM",
    "Others"
];
var majorsdisplay=[
  "General",
    "Biology",
    "Business and Finance",
    "Business and Marketing",
    "Computer Systems Engineering",
    "Chemistry",
    "Computer Science",
    "Data Science",
    "Economics",
    "Electrical and Systems Engineering",
    "Global China Studies",
    "Honors Mathematics",
    "Humanities",
    "Interactive Media and Business",
    "Interactive Media Arts",
    "Math",
    "Neural Science",
    "Physics",
    "Social Science",
    "Self-Designed Honors Major (SDHM)",
    "Others"
]


for (var i = 0; i < majors.length; i++) {
    des[majors[i]]=[majorsdisplay[i]]
}

db.collection("display").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
      
    var id = doc.id;
    if (id!="Please do not delete this doc请不要删除这个"){
      var data = doc.data();
      var field=data.Field;
      var content=data.Displaycontent
      //var netid=data.NetID
      if (! majorsdisplay.includes(field)){
        majors.push(field);
        des[field]=[content];
      }else{
        des[majors[majorsdisplay.indexOf(field)]].push(content)
      }
    }
  
  })
  setupP5();
  })
  var majorobjects = [];
  var poslist=[];
  var majorsubmit="nomajor";

  //var des={"Others":[]};
//var majors = ["Maths", "Computer Science", "Art", "Physics", "Chemistry","Humanities","NS","BF","Others"];
//var majors=["Maths","Computer Science","Others"] 

// var des = {
//    "Maths": ["sample1"],
//    "Computer Science": ["sample1"],
//   "Art": ["sample1"],
//   "Physics": ["sample1"],
//   "Chemistry": ["sample1", 2, 3, 4],
//   "Humanities":["sample1",2],
//   "Others":["sample1"],
//   "BF":["sample1",2,3,4,5,6],
//   "NS":["sample1",2,3,4,5],
//  };

// // var pressedBol=0;







function setupP5() {
  let canvas = createCanvas(windowWidth, windowHeight*0.98);
  canvas.parent("canvasContainer");
    // background(255,255,255,100);
    colorMode(HSB,360,100,100,100);
    var squareSizes = majors.map(major => sqrt(des[major].length) * 65); // Adjust as necessary
  // var totalSize = squareSizes.reduce((a, b) => a + b);
  //var gap = (min(width, height) - totalSize) / (majors.length + 1);
  //var currentPos = gap;
  for (let i = 0; i < majors.length; i++) {
    let x, y;
    let s = squareSizes[i];
    let attempts = 0;

    do {
      x = random(s * sqrt(2) / 2, width - s * sqrt(2) / 2);
      y = random(s * sqrt(2) / 2, height - s * sqrt(2) / 2);
      attempts++;
      if (attempts > 10000) {
        majorobjects = [];
        i = 0;
        attempts = 0;
      }
    } while (isOverlapping(x, y, s));
    majorobjects[i] = new Major(majors[i], x, y, s, des[majors[i]]);
  }
  for(let i=0;i<majors.length;i++){
    poslist[i]=[majorobjects[i].x,majorobjects[i].y,majorobjects[i].s];
  }
  sketchInstance = this;
  // ...
  // Your existing setup code
  // ...
}

// function setup() {
//     //let canvas = createCanvas(500, 400);
//     console.log(majors)
//     let canvas = createCanvas(windowWidth, windowHeight*0.9);
//     canvas.parent("canvasContainer");
//     // background(255,255,255,100);
//     colorMode(HSB,360,100,100,100);
//     var squareSizes = majors.map(major => sqrt(des[major].length) * 65); // Adjust as necessary
//   // var totalSize = squareSizes.reduce((a, b) => a + b);
//   //var gap = (min(width, height) - totalSize) / (majors.length + 1);
//   //var currentPos = gap;
//   for (let i = 0; i < majors.length; i++) {
//     let x, y;
//     let s = squareSizes[i];
//     let attempts = 0;

//     do {
//       x = random(s * sqrt(2) / 2, width - s * sqrt(2) / 2);
//       y = random(s * sqrt(2) / 2, height - s * sqrt(2) / 2);
//       attempts++;
//       if (attempts > 10000) {
//         majorobjects = [];
//         i = 0;
//         attempts = 0;
//       }
//     } while (isOverlapping(x, y, s));
//     majorobjects[i] = new Major(majors[i], x, y, s, des[majors[i]]);
//   }
//   for(let i=0;i<majors.length;i++){
//     poslist[i]=[majorobjects[i].x,majorobjects[i].y,majorobjects[i].s];
//   }
//   sketchInstance = this;
//   }
  


  

//function draw() {
  //textSize(32);
  //text('随便写写', mouseX, mouseY);
  //fill(126, 10, 203,70)
  function draw() {
    background(255);
    for (let i = 0; i < majorobjects.length; i++) {
      majorobjects[i].drawRec();
    }
    // if(mouseIsPressed){
    //     majorobjects[majorsubmit].controlsubmit=1;
    //   }
    if(majorsubmit!="nomajor"){
    if (majorobjects[majorsubmit].controlsubmit!=0){
      for(let i=0;i<majorobjects.length;i++){
        if(i!=majorsubmit){ majorobjects[i].attracted(majorobjects[majorsubmit].x,majorobjects[majorsubmit].y,0.003)
        majorobjects[i].s-=poslist[i][2]/300;
                          }
      }
    }else if(majorobjects[majorsubmit].controlsubmit==0){
      //console.log(majorobjects[majorsubmit].controlsubmit)
      for(let i=0;i<majorobjects.length;i++){
        if(i!=majorsubmit && abs(majorobjects[i].s-poslist[i][2])>3){ 
          majorobjects[i].x+=(poslist[i][0]-majorobjects[i].x)/100;
          majorobjects[i].y+=(poslist[i][1]-majorobjects[i].y)/100;
          majorobjects[i].s+=(poslist[i][2]-majorobjects[i].s)/100;
        }else if(i!=majorsubmit){
          majorsubmit="nomajor";
        }
        }
      }
    }
  }
  
  
  function isOverlapping(x, y, s) {
    for (let i = 0; i < majorobjects.length; i++) {
      let dx = majorobjects[i].x - x;
      let dy = majorobjects[i].y - y;
      let distance = sqrt(dx * dx + dy * dy);
      if (distance < majorobjects[i].s / 2 + s / 2) {
        return true;
      }
    }
    return false;
  }
  
  // Class and other functions remain the same




  class Major {
    constructor(major, x, y, s,des) {
      this.des=des;
      this.major = major;
      this.x = x;
      this.y = y;
      this.s = s;
      this.angle = random(TWO_PI);
      this.colorOffset = 0;
      this.anglecontrol=0;
      this.c=0;
      this.speed=300;
      this.shrink=s;
      this.texts=10;
      this.controlsubmit=0;
      this.acceleration = createVector();
      this.topspeed = 5;
      this.velocity = createVector();
    }
  
    drawRec() {
      let angle = this.angle + frameCount/this.speed;
      if(this.s>900){
        push();
        translate(this.x, this.y);
        //rotate(-(angle+this.anglecontrol+this.c));这里没办法动
        this.texts=13000/this.shrink;
        pop();
      }else{
      this.texts=10*(this.s/this.shrink)
      }
      push();
      translate(this.x, this.y);
      rotate(angle+this.anglecontrol+this.c);
  
      let rad = angle;
      let rotatedX = (mouseX - this.x) * cos(rad) - (mouseY - this.y) * sin(rad);
      let rotatedY = (mouseY - this.y) * cos(rad) + (mouseX - this.x) * sin(rad);
  
      
  
      for (let i = 0; i < this.s * 1.5; i += 4) {
        //stroke(278, 34 - i * 0.3, 85 + i * 0.5 + 3*this.colorOffset, 100 - i * 0.8); // Modify the alpha value for the center white
        stroke(278, 34 - i * 0.3, 84 + i * 0.5 + 3*this.colorOffset, 100 - i * 0.8); 
        noFill();
        square(-this.s / 2 + i / 2, -this.s / 2 + i / 2, this.s - i);
      }
      fill(266,46,65);
      stroke(266,46,65);
      strokeWeight(0.1*this.texts);
      textAlign(CENTER, CENTER);
      textSize(this.texts);
      text(this.major, 0, 0);
      pop();
      if (abs(rotatedX) <= this.s / 2 && abs(rotatedY) <= this.s / 2) {
        if(this.anglecontrol==0){
          this.anglecontrol=angle;
        }
        this.c=-angle;
        this.colorOffset = random(-5, 20); // Change color when mouse is over
        if(this.controlsubmit==0){
        this.ref();
        }
      } else {
        this.colorOffset = 0;
        this.anglecontrol=0;
        this.c=0;
      }
      this.submit();
    }
      ref(){
      push();
      stroke(255);
      strokeWeight(3);
      rectMode(CENTER);
      fill(278,4,98,100);
      rect(width/2,height/2,width/2,this.s,3);
      textAlign(CENTER)
      var textheight=this.s/this.des.length
      for(let i=0;i<this.des.length;i++){
        fill(266,46,65);
        stroke(266,46,65);
        strokeWeight(1);
        text(this.des[i],width/2,height/2-this.s/2+textheight*(i+0.6));
      }
      pop();
    }
    
    submit(){
      if(this.controlsubmit==1){
         this.colorOffset = random(-25, 100); // Change color when mouse is over
      this.speed-=1;
      this.s-=this.shrink/299;
        if(this.s<=0){
          this.controlsubmit=2;
        }
      }else if(this.controlsubmit==2){
        //this.speed+=0.1;
        this.s=(this.s+1)*1.05;
        if(this.s>=2200){
          
          this.controlsubmit=0;
          this.s=this.shrink;
          this.speed=300;
          //this.controlref=0;
        }else if(this.s>=1500){
          background(269, 94, 38);
        }
      }
    }
    
    attracted(x, y, z) {
      //var mouse = createVector(mouseX,mouseY);
      var mouse = createVector(x, y);
      let vposition = createVector(this.x, this.y);
      this.acceleration = p5.Vector.sub(mouse, vposition);
      this.acceleration.setMag(z);
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.topspeed);
      this.x += this.velocity.x;
      this.y += this.velocity.y;
    }
  }



  
    
    
function submitbutton(){
  var hf=document.getElementById("honorsfield").value
  if (majorsdisplay.includes(hf)){
  majorsubmit=majorsdisplay.indexOf(hf);
  }else{
    majorsubmit=majors.indexOf("Others")
  }
  majorobjects[majorsubmit].controlsubmit=1;
}
window.submitbutton=submitbutton
