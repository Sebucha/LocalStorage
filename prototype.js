/*let isLoading = false;
const loader = document.createElement("div");
const observerBtn = document.createElement("button");

loader.appendChild(observerBtn);
document.body.appendChild(loader);
loader.setAttribute("id", "value");
observerBtn.setAttribute("id", "something");

document.getElementById("something").innerHTML = "PUSH ME";

class Observable {
	constructor() {
		this.observers = [(isLoading = false)];
	}
	subscribe(f) {
		this.observers.push(f);
	}

	unsubscribe(f) {
		this.observers = this.observers.filter(subscriber => subscriber !== f);
	}

	notify(data) {
		this.observers.forEach(observer => observer(data));
	}
}

*/

//stworzony obserwator

let isLoading = false;
const loader = document.createElement("div");
const observerBtn = document.createElement("button");

loader.appendChild(observerBtn);
document.body.appendChild(loader);
loader.setAttribute("id", "value");
observerBtn.setAttribute("id", "something");

let Subject = function () {
	let observers = []; //empty array for new observers

	return {
		subscribeObserver: function (observer) {
			observers.push(observer);
		},
		unsubscribeObserver: function (observer) {
			let index = observers.indexOf(observer => {
				if (index > -1) {
					observers[index].splice(index, 1);
				}
			});
		},
		notifyObservers: function (observer) {
			let index = observers.indexOf(observer => {
				if (index > -1) {
					observers[index].notify(index);
				}
			});
		},
		notifyAllObservers: function () {
			for (let i = 0; i < observers.length; i++) {
				observers[i].notify[i];
			}
		},
	};
};

let Observer = function () {
	return {
		notify: function () {
			observerBtn.classList.add("active");
			isLoading = true;
		},
	};
};

let subject = new Subject();

let obs1 = new Observer();

subject.subscribeObserver(obs1);

subject.notifyObservers(obs1);

subject.notifyAllObservers();
