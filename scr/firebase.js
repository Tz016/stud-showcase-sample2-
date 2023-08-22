//import { initializeApp } from "/node_modules/@firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//import firebase from "firebase/app";
//import "firebase/firestore";
//import { submitbutton } from './sketch';
var scusubmitPara = document.getElementById("scusubmit");
var notesPara=document.getElementById("notes");

// const firebaseConfig = {
//     apiKey: "AIzaSyAxUtvPh9s66LWZcPi7dTfG3twyq_xMCSg",
//     authDomain: "facts-page-d0761.firebaseapp.com",
//     projectId: "facts-page-d0761",
//     storageBucket: "facts-page-d0761.appspot.com",
//     messagingSenderId: "503978391208",
//     appId: "1:503978391208:web:ef2067e1bbc6f92c25f49d",
//     measurementId: "G-F5N4K7D71C"
//   };
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


var form = document.getElementById("myForm");
var email = document.getElementById("email");
var honorstype=document.getElementById("honorstype");
var honorsfield=document.getElementById("honorsfield");
var description=document.getElementById("description");
var netid=document.getElementById("netid");
var availability=document.getElementById("availability");
// var ul = document.getElementById("dataList");

// 监听表单的提交事件
form.addEventListener("submit", function(event) {
  event.preventDefault(); // 阻止表单默认的提交行为
  submitbutton()
  var emailValue = email.value; // 获取输入框的值
  var honorstypeValue=honorstype.value;
  var honorsfieldValue=honorsfield.value;
  var descriptionValue=description.value;
  var netidValue=netid.value;
  var availabilityValue=availability.value;
  console.log(availability);
  if (honorstypeValue=="Other (please specify)"){
    honorstypleValue="Others"
  }
  if (honorsfieldValue=="Other (please specify)"){
    honorsfieldValue="Others"
  }
  // 将输入的内容存储到 Firebase Firestore 中
  db.collection("users").doc(emailValue+Math.random()).set({
    Email: emailValue,
    Field: honorsfieldValue,
    Type: honorstypeValue,
    Description:descriptionValue,
    Netid:netidValue,
    Availability:availabilityValue,
  })
  if(availability=="named"){
    if(description!=""){
    var displaycontent=`${honorstypeValue}: ${descriptionValue}, provided by ${email}`;
    }else{
    var displaycontent=`${honorstypeValue}, provided by ${email}`;}
  }else{
    if(description!=""){
    var displaycontent=`${honorstypeValue}: ${descriptionValue}, anonymous`;
  }else{
    var displaycontent=`${honorstypeValue}, provided by ${email}`;}}
  db.collection("temporarystore").doc(emailValue+Math.random()).set({
    Email: emailValue,
    Field: honorsfieldValue,
    Type: honorstypeValue,
    Description:descriptionValue,
    NetID:netidValue,
    Availability:availabilityValue,
    Displaycontent:displaycontent,
  })
  .then(function(docRef) {
    console.log("数据已成功存储到 Firebase Firestore 中，文档 ID");
    scusubmitPara.style.display="block";
    notesPara.style.display="none";
    //alert("Successfully Submit!");
    //successSubmit();
    // 清空输入框
    email.value = "";
    honorstype.value="";
    honorsfield.value="";
    description.value="";
    netid.value="";
    availability.value="";
    document.getElementById("terms").value="";
  })
  .catch(function(error) {
    alert("Error!")
    console.error("存储数据到 Firebase Firestore 时发生错误：", error);
  });
});


setTimeout(function() {
  scusubmitPara.style.display = "none";
  notesPara.style.display="block";
}, 3000);
// // 监听数据的变化
// db.collection("mycollection").onSnapshot(function(snapshot) {
//   ul.innerHTML = ""; // 清空现有的列表

//   snapshot.forEach(function(doc) {
//     var li = document.createElement("li");
//     li.textContent = doc.data().text;
//     ul.appendChild(li);
//   });
// });

