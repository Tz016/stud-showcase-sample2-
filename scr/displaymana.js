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

db.collection("display").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    var id = doc.id;
    var data = doc.data();
    // var email = data.Email;
    // var type=data.Type;
    var field=data.Field;
    // var description = data.Description;
    // var netid=data.NetID;
    var displaycontent=data.Displaycontent;
    //var availability=data.Availability;

    var row = document.createElement("tr");
    if (id!="Please do not delete this doc请不要删除这个"){
    var idCell = document.createElement("td");
    idCell.textContent = id;
    //idCell.setAttribute("contenteditable", "true"); 
    // var emailCell = document.createElement("td");
    // emailCell.textContent = email;
    // emailCell.setAttribute("contenteditable", "true"); 
    // var typeCell=document.createElement("td");
    // typeCell.textContent=type;
    // typeCell.setAttribute("contenteditable", "true"); 
    var fieldCell=document.createElement("td");
    fieldCell.textContent=field;
    //fieldCell.setAttribute("contenteditable", "true"); 
    // var descriptionCell = document.createElement("td");
    // descriptionCell.textContent = description;
    // descriptionCell.setAttribute("contenteditable", "true"); 
    // var netidCell=document.createElement("td");
    // netidCell.textContent=netid;
    // netidCell.setAttribute("contenteditable", "true"); 
    var displaycontentCell=document.createElement("td");
    displaycontentCell.textContent=displaycontent;
    displaycontentCell.setAttribute("contenteditable","true");
    var deleteCell=document.createElement("td");
    var deleteButton=document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteCell.appendChild(deleteButton)
    deleteButton.addEventListener("click", function() {
        // 获取要删除的行元素
    var row = this.parentNode.parentNode;
    deleteRow(row);})

    row.appendChild(idCell);
    // row.appendChild(emailCell);
    // row.appendChild(typeCell);
    row.appendChild(fieldCell);
    // row.appendChild(descriptionCell);
    // row.appendChild(netidCell);
    row.appendChild(displaycontentCell);
    row.appendChild(deleteCell);
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
        field = "Displaycontent";
        break;
      // case 2:
      //   field = "Type";
      //   break;
      // case 3:
      //   field = "Field";
      //   break;
      // case 4:
      //   field = "Description";
      //   break;
      // case 5:
      //   field = "NetID";
      //   break;
      // case 6:
      // field = "Displaycontent";
      // break;
      default:
        break;
    }
    var updateData = {};
    console.log(field)
    updateData[field] = target.textContent;

    db.collection("display").doc(docId).update(updateData)
      .then(() => {
        console.log("Document successfully updated!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  });

  function deleteRow(row) {
    var docId = row.firstChild.textContent; // 获取文档ID
  
    db.collection("display").doc(docId).delete()
      .then(() => {
        console.log("Document successfully deleted!");
        row.parentNode.removeChild(row);
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  }

