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

export const getAdults = () => db.filter(person => person.age > ADULTHOOD_AGE)

export default db