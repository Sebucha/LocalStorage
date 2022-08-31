import db, { getAdults } from "./db.js";

let dataTable = document.getElementById("dataTable");
let thead = document.createElement("thead");
let tbody = document.createElement("tbody");

// Create a getter and setter that allows for setting the data state
const setData = data =>
	window.localStorage.setItem("APIdata", JSON.stringify(data));
const getData = key => JSON.parse(window.localStorage.getItem(key));

setData(db);

// Global flag for loading state to be represented in HTML
let isLoading = false;
const loader = document.createElement("div");

document.body.appendChild(loader);
loader.setAttribute("id", "value");

function Visibility() {
	this.loader = [];
}
Visibility.prototype = {
	subscribe: function (visibleX) {
		this.loader.push(visibleX);
	},
	//unsubscribe: function (unVisibleX) {
	//	this.loader = this.loader.filter(visibleX => {
	//		if (vivisbleX !== unVisibleX) return visibleX;
	//	});
	//},
	run: function () {
		this.loader.forEach(visibleX => {
			visibleX.call();
		});
	},
};

const visible = new Visibility();

function Observer1() {
	if (!isLoading) {
		document.getElementById("value").innerHTML = "działa";
	}
}

visible.subscribe(Observer1);
visible.run();

// Example of how to use exported functions
const fetchData = async () => {
	try {
		isLoading = true;
		const response = await getAdults();
		console.log(response);
	} catch (error) {
		console.error(error);
	} finally {
		isLoading = false;
	}

	/*getAdults()
		.then(response => {
			console.log(response);
		})
		.catch(e => {
			console.error(e);
		})
		.finally(() => {
			console.log(isLoading);
			isLoading = false;
		});*/

	console.log(isLoading);
};

fetchData();

//design patterns - wzorce projektowe js
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
			localStorage.removeItem(id);
			//	localStorage.clear();
		}

		let deleteButton = document.createElement("button");
		deleteButton.addEventListener("click", deleteRow);
		deleteButton.innerHTML = "x";
		row.appendChild(deleteButton);
	}

	return row;
};

const createTableInnerElements = () => {
	thead.append(
		createRow({
			id: "ID",
			name: "Name",
			uId: "User ID",
			age: "Age",
			sex: "Sex",
		})
	);

	getData("APIdata")
		.map(element => createRow({ ...element, isDeletable: true }))
		.forEach(row => {
			tbody.appendChild(row);
		});

	dataTable.appendChild(thead);
	dataTable.appendChild(tbody);
};

createTableInnerElements();
