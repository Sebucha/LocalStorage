import db, { getAdults } from "./db.js";

let dataTable = document.getElementById("dataTable");
let thead = document.createElement("thead");
let tbody = document.createElement("tbody");

// Create a getter and setter that allows for setting the data state
const setData = (data) => window.localStorage.setItem("APIdata", JSON.stringify(data));
const getData = (key) => JSON.parse(window.localStorage.getItem(key))

setData(db)
// Example of hot to use exported functions
console.log({ adults: getAdults() })

const createRow = ({ id, name, uId, age, sex, isDeletable = false }) => {
  let row = document.createElement("tr");
  row.setAttribute("id", id);
  row.className = "table-row";

  let idCell = document.createElement("td");
  let nameCell = document.createElement("td");
  let uidCell = document.createElement("td");
  let ageCell = document.createElement("td");
  let sexCell = document.createElement("td");

  idCell.innerHTML = id;
  nameCell.innerHTML = name;
  uidCell.innerHTML = uId;
  ageCell.innerHTML = age;
  sexCell.innerHTML = sex;

  [idCell, nameCell, uidCell, ageCell, sexCell].forEach(element => {
    row.appendChild(element);
  });

  if (isDeletable) {
    // DeleteRow doesn't neet to exist in the upper scope
    function deleteRow() {
      let row = document.getElementById(id);
      tbody.removeChild(row);
    }

    let deleteButton = document.createElement("button");
    deleteButton.addEventListener("click", deleteRow);
    deleteButton.innerHTML = "x";
    row.appendChild(deleteButton);
  }

  return row;
};

const createTableInnerElements = () => {
  thead.append(createRow({ id: "ID", name: "Name", uId: "User ID", age: "Age", sex: "Sex" }));

  getData("APIdata").map(
    element => createRow({ ...element, isDeletable: true })
  ).forEach(row => {
    tbody.appendChild(row)
  })

  dataTable.appendChild(thead);
  dataTable.appendChild(tbody);
}

createTableInnerElements()