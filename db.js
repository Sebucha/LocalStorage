let db = [
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
		uId: 11111,
		age: 25,
		sex: "Woman",
	},
];

const ADULTHOOD_AGE = 18;

export const getAdults = () => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(db.filter(person => person.age > ADULTHOOD_AGE));
			//reject(404);
		}, 2000);
	});
};

// async function getUsers() {
// 	let url = "https://jsonplaceholder.typicode.com/users";
// 	try {
// 		let res = await fetch(url);
// 		return await res.json();
// 	} catch (error) {
// 		console.log(error);
// 	}
// }

// async function renderUser() {
// 	let users = await getUsers();
// 	// console.log(users);
// 	// console.log(...users)

// 	let usersNames = [];
// 	usersNames = users.map(user => `${user.name}`);

// 	let filtered = users.filter(user => user.name);
// 	console.log(filtered);
// 	// console.log(usersNames);

// 	users.forEach(user => {
// 		user.map(user => `${user.name}`);
// 		// db.push(user.name);
		
// 	});
// }
// renderUser();
export default db;
