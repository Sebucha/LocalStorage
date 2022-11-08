import db, { getAdults } from "./db.js";

// import observable from "./newObserver"

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
function Subject() {
	this.observers = []; //array of obsrvers functions
}

Subject.prototype = {
	subscribe: function (fn) {
		this.observers.push(fn);
	},
	unsubsribe: function (fnToRemove) {
		this.observers = this.observers.filter(e => {
			e != fnToRemove ? e : fnToRemove;
		});
	},
	fire: function () {
		this.observers.forEach(element => {
			element.call();
		});
	},
};

const subject = new Subject();

function Observer1() {}
subject.subscribe(Observer1);
subject.fire();

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

//CREATING FORMS

const forms = document.createElement("div");
const submitInput = document.createElement("input");

const formsBox = document.createElement("div");
forms.appendChild(formsBox);
formsBox.setAttribute("class", "formsBox");

const box1 = document.createElement("div");
box1.setAttribute("class", "box");
formsBox.appendChild(box1);
const textBoxName = document.createElement("p");
textBoxName.innerHTML = "Name:";
box1.appendChild(textBoxName);
const newName = document.createElement("input");
box1.appendChild(newName);
newName.setAttribute("placeholder", "Name...");
newName.setAttribute("class", "newForm");

const box2 = document.createElement("div");
box2.setAttribute("class", "box");
formsBox.appendChild(box2);
const textBoxUID = document.createElement("p");
textBoxUID.innerHTML = "User ID:";
box2.appendChild(textBoxUID);
const newUserID = document.createElement("input");
box2.appendChild(newUserID);
newUserID.setAttribute("placeholder", "UserID...");
newUserID.setAttribute("class", "newForm");

const box3 = document.createElement("div");
box3.setAttribute("class", "box");
formsBox.appendChild(box3);
const textBoxAge = document.createElement("p");
textBoxAge.innerHTML = "Age:";
box3.appendChild(textBoxAge);
const newAge = document.createElement("input");
box3.appendChild(newAge);
newAge.setAttribute("placeholder", "Age...");
newAge.setAttribute("class", "newForm");

const box4 = document.createElement("div");
box4.setAttribute("class", "box");
formsBox.appendChild(box4);
const textBoxSex = document.createElement("p");
textBoxSex.innerHTML = "Sex:";
box4.appendChild(textBoxSex);

const box5 = document.createElement("div");
box5.setAttribute("class", "box");
formsBox.appendChild(box5);
const textBoxMan = document.createElement("p");
textBoxMan.innerHTML = "Man:";
box5.appendChild(textBoxMan);
const man = document.createElement("input");
formsBox.appendChild(man);
man.setAttribute("type", "radio");
man.setAttribute("value", "Man");
man.setAttribute("class", "newForm");

const woman = document.createElement("input");
formsBox.appendChild(woman);
woman.setAttribute("type", "radio");
woman.setAttribute("value", "Woman");

function checkSex() {
	if (man.checked) {
		return man.value;
	} else if (woman.checked) {
		return woman.value;
	}
}

function newID() {
	const newID = db.length + 1;
	return newID;
}
newID();

const sendData = () => {
	tbody.innerHTML = "";
	if (newName.value.length >= 3) {
		const newObj = db.push({
			id: newID(),
			name: newName.value,
			uId: parseInt(newUserID.value),
			age: parseInt(newAge.value),
			sex: checkSex(),
		});
	} else {
		alert("Man, newName is too short.");
	}

	newName.value = "";
	newUserID.value = "";
	newAge.value = "";

	console.log(db);
	setData(db);
	getData("APIdata")
		.map(element => createRow({ ...element, isDeletable: true }))
		.forEach(row => {
			tbody.appendChild(row);
		});
};

submitInput.addEventListener("click", sendData);
console.log(db);

document.body.appendChild(forms);
forms.appendChild(submitInput);
forms.setAttribute("class", "forms");

submitInput.setAttribute("type", "submit");
// submitInput.setAttribute("class", "submitData");
submitInput.setAttribute("value", "Send Data");
submitInput.setAttribute("name", "name");
