let myTable = document.getElementById("myTable");
const check = document.querySelectorAll(".check");
let secondTable = document.querySelector(".secondTable");

let myArr = [
	{
		id: 1,
		name: "Mateusz",
		uId: 10928,
		age: 22,
		sex: "Man",
	},
	{
		id: 2,
		name: "Krystian",
		uId: 90383,
		age: 30,
		sex: "Man",
	},
	{
		id: 3,
		name: "Eliza",
		uId: 56763,
		age: 56,
		sex: "Woman",
	},
	{
		id: 4,
		name: "Sebastian",
		uId: 47433,
		age: 18,
		sex: "Man",
	},
	{
		id: 5,
		name: "Wiktoria",
		uId: 1111,
		age: 25,
		sex: "Woman",
	},
];

window.localStorage.setItem("APIdata", JSON.stringify(myArr));

// secondTable.innerHTML = newArr;

let table = document.createElement("table");
let thead = document.createElement("thead");
let tbody = document.createElement("tbody");

table.appendChild(thead);
table.appendChild(tbody);

document.getElementById("secondTable").appendChild(table);

const createRow = (id, name, uid, age, sex, isDeletable = false) => {
	let row = document.createElement("tr");
	row.setAttribute("id", id);

	let idCell = document.createElement("td");
	let nameCell = document.createElement("td");
	let uidCell = document.createElement("td");
	let ageCell = document.createElement("td");
	let sexCell = document.createElement("td");

	idCell.innerHTML = id;
	nameCell.innerHTML = name;
	uidCell.innerHTML = uid;
	ageCell.innerHTML = age;
	sexCell.innerHTML = sex;

	[idCell, nameCell, uidCell, ageCell, sexCell].forEach(element => {
		row.appendChild(element);
	});

	function deleteRow() {
		let row = document.getElementById(id);
		table.removeChild(row);
	}

	if (isDeletable) {
		let deleteButton = document.createElement("button");
		deleteButton.addEventListener("click", deleteRow);
		deleteButton.innerHTML = "delete";
		row.appendChild(deleteButton);
	}

	return row;
};

let tableHeading = createRow("ID", "Name", "User ID", "Age", "Sex");

table.appendChild(tableHeading);

let dataRows = JSON.parse(window.localStorage.getItem("APIdata")).map(
	element => {
		const { id, name, uId, age, sex } = element;

		return createRow(id, name, uId, age, sex, true);
	}
);

console.log(dataRows);

dataRows.forEach(row => {
	table.appendChild(row);
});
