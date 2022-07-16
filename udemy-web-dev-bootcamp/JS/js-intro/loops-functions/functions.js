let funcPtr = Math.random;
console.log(funcPtr());
console.log(funcPtr());

function functionName() {
	console.log("Basically void func");
}

functionName();

for (let i = 0; i < 100; i++) {
	functionName();
}

function functionWithArgs(name1, name2) {
	// if argument is not provided, undefined is passed in its place
	console.log(`${name1} is cooler than ${name2}`);
}

functionWithArgs("keenan", "damon"); // prints "keenan is cooler than damon"
functionWithArgs(); // prints "undefined is cooler than undefined"

// returns, doesn't need to specify return type
function functionWithReturn(name) {
	return `${name} is cooler than everyone else`;
}

console.log(functionWithReturn("keenan")); // prints "keenan is cooler than everyone else"

// FUNCTION EXPRESSIONS (storing a function in a variable)
const square = function (number) {
	return number ** 2;
};

square(7);

// HIGHER ORDER FUNCTIONS --> functions that operate on/with other functions
// TAKE FUNCTION AS ARGUMENT or return function as argument

function callNTimes(funcPtr, num) {
	for (let i = 0; i < num; i++) {
		funcPtr();
	}
}

callNTimes(function () {
	console.log("Test");
}, 10);

function noArgs() {
	console.log("No args");
}
// pass with no parans () to pass function as func ptr
// as opposed to passing by its return result (undefined in this case)
callNTimes(noArgs, 5);

// RETURNING FUNCTIONS

function generatePowerFunction(power) {
	return function (number) {
		return number ** power;
	};
}

const cube = generatePowerFunction(3);

// METHODS --> functions placed as a property of an object

const counter = {
	count: 0,
	increment: function () {
		// long way to write method
		this.count++;
	},
	decrement() {
		// shorthand for methods
		this.count--;
	},
	reset() {
		this.count = 0;
	},
	add(number) {
		this.count += number;
	},
	sub(number) {
		this.count -= number;
	},
};

// TRY/CATCH
try {
	// do something risky
} catch (error) {
	console.error(error);
}

try {
	let num = 1000;
	console.log(num.toUpperCase());
} catch (error) {
	console.error(`ERROR: ${error.message}`);
}

// ARROW FUNCTIONS
const add1 = (x, y) => {
	return x + y;
};

const return10 = () => {
	return 10;
};

// const square1 = (x) => {
//   // can omit parens with single arg
//   return x * x;
// };

// arrow functions only: implicit returns in certain situations (remove brackets, add parens if multiline)
const square1 = (x) => x * x;
// const square2 = (x) => ( // prettier pushes this to same line, but this is valid
//   x * x
// );
