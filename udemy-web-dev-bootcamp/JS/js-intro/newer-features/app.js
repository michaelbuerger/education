// DEFAULT PARAMS

function rolDie(numSides = 6) {
	// default value of 6
	return Math.floor(Math.random() * numSides) + 1;
}

// SPREAD IN FUNCTION CALLS
const nums = [9, 3, 2, 8];
Math.max(nums); // NaN as param is array not numbers

// spread iterable with ...
Math.max(...nums); // 9
// same as calling: math.max(9, 3, 2, 8)

// SPREAD WITH ARRAY LITERALS
const cats = ["Blue", "Scout", "Rocket"];
const dogs = ["Rusty", "Wyatt"];

const animals = [...cats, "Neptune", ...dogs]; // same as typing in each element

// SPREAD WITH OBJECTS
const entity = { exists: true, alive: true };
const canine = { legs: 4 };
const dead = { alive: false };

// as dead comes after entity spread, and both have alive property, dead's alive property will override
const dog = { ...entity, ...dog, name: "Michael", color: "brown", ...dead };

// if array/string is spread into object, index is used as key in property

// REST PARAMS
// arguments keyword valid, except for arrow functions, elementary array of args
function sum1() {
	return arguments.reduce((acc, el) => acc + el); // arguments is not regular array, doesn't have reduce method
}

// ...nums collects all remaining arguments (rest of arguments) and puts them in array
function sum2(...nums) {
	return nums.reduce((acc, el) => acc + el);
}

function multiplySum(multiplier, ...nums) {
	return nums.reduce((acc, el) => acc + el * multiplier);
}

multiplySum(10, 12, 13, 1, 4, 5, 6);

// looks like spread but is different

// DESTRUCTURING ARRAYS
const scores = [100, 200, 300, 400, 500, 600];
const [gold, silver, bronze, ...rest] = scores; // pattern match/array destructure

// DESTRUCTURING OBJECTS
const runner = {
	first: "Michael",
	last: "Buerger",
	country: "United States",
	title: "Speed",
};

const { first, last, country } = runner;
const { first: firstName, last: lastName, country: countryName } = runner;

// DESTRUCTURING PARAMS

// const fullName = (user) => { // destructures object to variables
// 	return `${user.first} ${user.last}`;
// };

const fullName = ({ first = "John", last = "Smith" }) => {
	// destructures object to variables
	return `${first} ${last}`;
};

const runner2 = {
	first: "Eliud",
	last: "Kipchoge",
	country: "Kenya",
};

fullName(runner); // "Michael Buerger"
fullName(runner2); // "Eliud Kipchoge"
