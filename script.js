import db, { getAdults } from "./db.js";

// import observable from "./newObserver"

let dataTable = document.getElementById("dataTable");
let thead = document.createElement("thead");
let tbody = document.createElement("tbody");

// Create a getter and setter that allows for setting the data state
const setData = data =>
	window.localStorage.setItem("APIdata", JSON.stringify(data));
const getData = key => JSON.parse(window.localStorage.getItem(key));

const demoData = () => {
	setData(db);
};
const clearData = () => {
	window.localStorage.clear();
};

const demoDataBtn = document.createElement("button");
document.body.appendChild(demoDataBtn);
demoDataBtn.innerHTML = "Demo Data";
demoDataBtn.addEventListener("click", demoData);

const clearDataBtn = document.createElement("button");
document.body.appendChild(clearDataBtn);
clearDataBtn.innerHTML = "Clear Data";
clearDataBtn.addEventListener("click", clearData);

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

function Observer1() {
	
}
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
		function deleteRow(i) {
			let row = document.getElementById(id);
			tbody.removeChild(row);
			console.log(localStorage.removeItem("APIdata"));
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
const box2 = document.createElement("div");
const box3 = document.createElement("div");
const box4 = document.createElement("div");
const box5 = document.createElement("div");
const box6 = document.createElement("div");

const textBoxName = document.createElement("p");
const textBoxUID = document.createElement("p");
const textBoxAge = document.createElement("p");
const textBoxSex = document.createElement("p");
const textBoxMan = document.createElement("p");
const textBoxWoman = document.createElement("p");

const newName = document.createElement("input");
const newUserID = document.createElement("input");
const newAge = document.createElement("input");
const man = document.createElement("input");
const woman = document.createElement("input");

formsBox.appendChild(box1);
formsBox.appendChild(box2);
formsBox.appendChild(box3);
formsBox.appendChild(box4);
formsBox.appendChild(box5);
formsBox.appendChild(box6);

box1.setAttribute("class", "box");
box2.setAttribute("class", "box");
box3.setAttribute("class", "box");
box4.setAttribute("class", "box");
box5.setAttribute("class", "box");
box6.setAttribute("class", "box");

box1.appendChild(textBoxName);
box1.appendChild(newName);
box2.appendChild(textBoxUID);
box2.appendChild(newUserID);
box3.appendChild(textBoxAge);
box3.appendChild(newAge);
box4.appendChild(textBoxSex);
box5.appendChild(textBoxMan);
box5.appendChild(man);
box6.appendChild(textBoxWoman);
box6.appendChild(woman);

textBoxName.innerHTML = "Name:";
textBoxUID.innerHTML = "User ID:";
textBoxAge.innerHTML = "Age:";
textBoxSex.innerHTML = "Sex:";
textBoxMan.innerHTML = "Man:";
textBoxWoman.innerHTML = "Woman:";

newName.setAttribute("placeholder", "Name...");
newUserID.setAttribute("placeholder", "UserID...");
newAge.setAttribute("placeholder", "Age...");
newName.setAttribute("class", "newForm");
newUserID.setAttribute("class", "newForm");
newAge.setAttribute("class", "newForm");

man.setAttribute("type", "radio");
man.setAttribute("value", "Man");
man.setAttribute("class", "newForm");

woman.setAttribute("type", "radio");
woman.setAttribute("value", "Woman");

//TODO
const checkSex = () => {
	if (man.checked) {
		return man.value;
	} else if (woman.checked) {
		return woman.value;
	}
};
const newID = () => {
	return db.length + 1;
};

const resetData = () => {
	if (confirm("Do you wanna clear forms?")) {
		newName.value = "";
		newUserID.value = "";
		newAge.value = "";
		newUserID.style.backgroundColor = "white";
		newAge.style.backgroundColor = "white";
	}
};
//resetData btn
const resetBtn = document.createElement("button");
forms.appendChild(resetBtn);
resetBtn.innerHTML = "Reset Data";
resetBtn.addEventListener("click", resetData);

//validation
const isNumber = valueToCheck => {
	return !isNaN(valueToCheck);
};

newUserID.onkeyup = function () {
	if (!isNumber(this.value)) {
		this.style.backgroundColor = "red";
		alert("only numbers");
	} else {
		this.style.backgroundColor = "green";
	}
};

newAge.onkeyup = function () {
	if (!isNumber(this.value)) {
		this.style.backgroundColor = "red";
		alert("only numbers");
	} else {
		this.style.backgroundColor = "green";
	}
};

const sendData = () => {
	tbody.innerHTML = "";
	if (
		newName.value.length >= 3 &&
		newAge.value <= 100 &&
		newUserID.value.length <= 6
	) {
		db.push({
			id: newID(),
			name: newName.value,
			uId: parseInt(newUserID.value),
			age: parseInt(newAge.value),
			sex: checkSex(),
		});
	} else {
		alert("Man, newName is too short or you added bad USER ID.");
	}

	// const initDB = data =>
	// 	window.localStorage.setItem("nextUser", JSON.stringify(data));
	// const getinitDB = key => JSON.parse(window.localStorage.getItem(key));

	// initDB(db);

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

//TODO
/*
refresh website
use API
use saved state
validation 
*cypress
*/
