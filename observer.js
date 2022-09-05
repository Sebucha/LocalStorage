let isLoading = false; 
const loader = document.createElement("div");
const observerBtn = document.createElement("button");

loader.appendChild(observerBtn);
document.body.appendChild(loader);
loader.setAttribute("id", "value");
observerBtn.setAttribute("id", "something");

document.getElementById("something").innerHTML = "PUSH ME";

function Visibility() {
	this.loader = [];
}
Visibility.prototype = {
	subscribe: function (visibleX) {
		this.loader.push(visibleX);
	},
	unsubscribe: function (unVisibleX) {
		this.loader = this.loader.filter(visibleX => {
			if (visibleX !== unVisibleX) return visibleX;
		});
	},
	run: function () {
		this.loader.forEach(visibleX => {
			visibleX.call();
		});
	},
};

const visible = new Visibility();

function Observer1() {
	//observerBtn.classList.add("active");
	observerBtn.addEventListener("click", Observer1);
}

visible.subscribe(Observer1);
visible.run();
