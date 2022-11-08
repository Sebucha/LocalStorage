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
// const loader = document.createElement("div");
// const observerBtn = document.createElement("button");
// loader.appendChild(observerBtn);
// document.body.appendChild(loader);
// loader.setAttribute("id", "value");
// observerBtn.setAttribute("id", "something");

// document.getElementById("something").innerHTML = "push me";

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
document.body.appendChild(forms);
forms.appendChild(submitInput);
forms.setAttribute("class", "forms");

submitInput.setAttribute("type", "submit");
// submitInput.setAttribute("class", "submitData");
submitInput.setAttribute("value", "Send Data");
submitInput.setAttribute("name", "name");

const newName = document.createElement("input");
forms.appendChild(newName);
newName.setAttribute("placeholder", "Name...");
newName.setAttribute("class", "newForm");

const newUserID = document.createElement("input");
forms.appendChild(newUserID);
newUserID.setAttribute("placeholder", "UserID...");
newUserID.setAttribute("class", "newForm");

const newAge = document.createElement("input");
forms.appendChild(newAge);
newAge.setAttribute("placeholder", "Age...");
newAge.setAttribute("class", "newForm");

const man = document.createElement("input");
forms.appendChild(man);
man.setAttribute("type", "radio");

const woman = document.createElement("input");
forms.appendChild(woman);
woman.setAttribute("type", "radio");

const sendData = () => {
	const newObj = db.push({
		name: newName.value,
		uId: parseInt(newUserID.value),
		age: parseInt(newAge.value),
	});
	// db.push({ sex: newSex.value });
	newName.value = "";
	newUserID.value = "";
	newAge.value = "";
	localStorage.getItem(newObj);

	console.log(db);
};
submitInput.addEventListener("click", sendData);
console.log(db);
