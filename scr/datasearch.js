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


// 获取输入框和按钮的引用
var searchInput = document.getElementById("searchInput");
var searchButton = document.getElementById("searchButton");
var resultsDiv = document.getElementById("results");

// 监听按钮点击事件
searchButton.addEventListener("click", function () {
  var searchString = searchInput.value.trim();

  // 查询匹配的文档
  db.collection("users")
    .get()
    .then(function (querySnapshot) {
      var count=0;
      querySnapshot.forEach(function (doc) {
        var documentData = doc.data();
        for (var key in documentData) {
          if (documentData.hasOwnProperty(key) && typeof documentData[key] === "string") {
            var fieldValue = documentData[key];
            if (fieldValue.includes(searchString)) {
              // 处理每个匹配的文档
              count=1;
              var id = doc.id;
              var data = doc.data();
              var email = data.Email;
              var type = data.Type;
              var field = data.Field;
              var description = data.Description;
              var netid = data.NetID;
              var availability = data.Availability

              //var displaycontent=data.Displaycontent

              var row = document.createElement("tr");
              if (id != "Please do not delete this doc请不要删除这个") {
                var idCell = document.createElement("td");
                idCell.textContent = id;
                // idCell.setAttribute("contenteditable", "true"); 
                var emailCell = document.createElement("td");
                emailCell.textContent = email;
                emailCell.setAttribute("contenteditable", "true");
                var typeCell = document.createElement("td");
                typeCell.textContent = type;
                typeCell.setAttribute("contenteditable", "true");
                var fieldCell = document.createElement("td");
                fieldCell.textContent = field;
                fieldCell.setAttribute("contenteditable", "true");
                var descriptionCell = document.createElement("td");
                descriptionCell.textContent = description;
                descriptionCell.setAttribute("contenteditable", "true");
                var netidCell = document.createElement("td");
                netidCell.textContent = netid;
                netidCell.setAttribute("contenteditable", "true");
                var availabilityCell = document.createElement("td");
                availabilityCell.textContent = availability;
                availabilityCell.setAttribute("contenteditable", "true");
                var displayCell = document.createElement("td")
                var displayButton = document.createElement("button");
                displayButton.textContent = "Display";
                displayCell.appendChild(displayButton)
                displayButton.addEventListener("click", function () {
                  var row = this.parentNode.parentNode;
                  displayRow(row);
                })

                row.appendChild(idCell);
                row.appendChild(emailCell);
                row.appendChild(typeCell);
                row.appendChild(fieldCell);
                row.appendChild(descriptionCell);
                row.appendChild(netidCell);
                row.appendChild(availabilityCell);
                row.appendChild(displayCell);
                collectionTable.appendChild(row);

              };
            }
          }
        }
      })
      if(count==0){
        var paragraph = document.createElement("p");
paragraph.textContent = "No matching Data"; // 将这里的内容替换为您要显示的文字
// 将段落元素添加到表格后面
collectionTable.appendChild(paragraph);

      }
    })
.catch (function(error) {
    console.error("Error searching documents:", error);
  });
});



function displayRow(row) {
  var docId = row.firstChild.textContent;
  db.collection("users").doc(docId).get()
    .then((doc) => {
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

