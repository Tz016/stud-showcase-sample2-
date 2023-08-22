const firebaseConfig = {
  apiKey: "AIzaSyCLRllBmm3Cmiw8ljR4pjYFkxvGegXvmM4",
  authDomain: "stud-accomplishment-showcase.firebaseapp.com",
  projectId: "stud-accomplishment-showcase",
  storageBucket: "stud-accomplishment-showcase.appspot.com",
  messagingSenderId: "161248142119",
  appId: "1:161248142119:web:fdc53cb0be9f4381113f02"
};
  

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

var collectionTable = document.getElementById("collectionData");

db.collection("temporarystore").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    var id = doc.id;
    var data = doc.data();
    var email = data.Email;
    var type=data.Type;
    var field=data.Field;
    var description = data.Description;
    var netid=data.NetID;
    var availability=data.Availability
    
    //var displaycontent=data.Displaycontent

    var row = document.createElement("tr");
    if (id!="Please do not delete this doc请不要删除这个"){
    var idCell = document.createElement("td");
    idCell.textContent = id;
    // idCell.setAttribute("contenteditable", "true"); 
    var emailCell = document.createElement("td");
    emailCell.textContent = email;
    emailCell.setAttribute("contenteditable", "true"); 
    var typeCell=document.createElement("td");
    typeCell.textContent=type;
    typeCell.setAttribute("contenteditable", "true"); 
    var fieldCell=document.createElement("td");
    fieldCell.textContent=field;
    fieldCell.setAttribute("contenteditable", "true"); 
    var descriptionCell = document.createElement("td");
    descriptionCell.textContent = description;
    descriptionCell.setAttribute("contenteditable", "true"); 
    var netidCell=document.createElement("td");
    netidCell.textContent=netid;
    netidCell.setAttribute("contenteditable", "true"); 
    var availabilityCell = document.createElement("td");
    availabilityCell.textContent = availability;
    availabilityCell.setAttribute("contenteditable", "true"); 
    var deleteCell=document.createElement("td");
    var deleteButton=document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteCell.appendChild(deleteButton)
    deleteButton.addEventListener("click", function() {
        // 获取要删除的行元素
    var row = this.parentNode.parentNode;
    deleteRow(row);})
    var displayCell=document.createElement("td")
    var displayButton=document.createElement("button");
    displayButton.textContent="Display";
    displayCell.appendChild(displayButton)
    displayButton.addEventListener("click",function(){
    var row = this.parentNode.parentNode;
    displayRow(row);})

    row.appendChild(idCell);
    row.appendChild(emailCell);
    row.appendChild(typeCell);
    row.appendChild(fieldCell);
    row.appendChild(descriptionCell);
    row.appendChild(netidCell);
    row.appendChild(availabilityCell);
    row.appendChild(deleteCell);
    row.appendChild(displayCell);
    collectionTable.appendChild(row);
    //var row2 = document.createElement("tr");
    //var displaycontentCell = document.createElement("td");
    //displaycontentCell.textContent = displaycontent;
    //displaycontentCell.setAttribute("contenteditable", "true"); 
    //collectionTable.appendChild(row2);
    }
  });
}).catch((error) => {
  console.log("Error getting collection documents: ", error);
});

collectionTable.addEventListener("input", function(e) {
    var target = e.target;
    var docId = target.parentNode.firstChild.textContent; // 获取文档ID
    var field;
    switch (target.cellIndex) {
      case 1:
        field = "Email";
        break;
      case 2:
        field = "Type";
        break;
      case 3:
        field = "Field";
        break;
      case 4:
        field = "Description";
        break;
      case 5:
        field = "NetID";
        break;
        case 6:
          field = "Availability";
          break;
      // case 6:
      //   field = "NetID";
      //   break;
      default:
        break;
    }
    var updateData = {};
    console.log(field)
    updateData[field] = target.textContent;

    db.collection("temporarystore").doc(docId).update(updateData)
      .then(() => {
        console.log("Document successfully updated!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  });

  function deleteRow(row) {
    var docId = row.firstChild.textContent; // 获取文档ID
  
    db.collection("temporarystore").doc(docId).delete()
      .then(() => {
        console.log("Document successfully deleted!");
        row.parentNode.removeChild(row);
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  }

  function displayRow(row){
    var docId = row.firstChild.textContent;
    db.collection("temporarystore").doc(docId).get()
    .then((doc)=>{
        if (doc.exists) {
          var documentData = doc.data();
          console.log("Document data:", documentData);
          // db.collection("display").add(documentData);
          //alert("Successfully Displayed!")
          db.collection("display")
          .doc(docId) // 使用相同的文档ID
          .set(documentData) // 直接复制数据到display集合中
          .then(() => {
            console.log("Document successfully displayed!");
            alert("Successfully Displayed!");
            deleteRow(row); // 删除临时集合中的数据
          })
          .catch((error) => {
            console.error("Error displaying document: ", error);
          });
      } else {
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
}