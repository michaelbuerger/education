// make empty array
let students = [];

// make non-empty array
let letters = ["a", "b", "c", "d", "e"];

// mixed array
let stuff = ["dog", "poop", 10, true, false];

// length --> arr.length

// arr[non-existing index] --> undefined
// string[index] --> char
// array of strings[index in array][index in string] = 'c' --> change char to 'c'

// push --> add to end
// pop --> remove from end
// shift --> remove from start
// unshift --> add to start

// concat --> merge arrays
// includes --> look for a value
// indexOf --> same as string.indexOf
// join --> creates a string from an array
// reverse --> reverses an array
// slice --> copies a portion of an array (returns new array) (start inclusive, end exclusive)
// splice --> removes/replaces a portion of an array
// sort --> sorts an array

// arr.splice(start, deleteCount, item1, item2, ...)
// if deleteCount = 0, then it just splices the items in starting at that index
// slice returns new array
// splice returns the removed items and affects the called upon array

while (true) {
	let userInput = prompt("Enter a student name or 'quit' to exit");
	if (userInput == "quit") break;
	students.push(userInput);
}

alert(students);

// object literals, pretty much unordered and labeled JS array
// key-value pairs (properties)
const fitBitData = {
	totalSteps: 308727,
	totalMiles: 211.7,
	avgCalorieBurn: 5755,
	workoutsThisWeek: "5 of 7",
	avgGoodSleep: "2:13",
};

const person = {
	name: "John",
	age: 30,
	height: "6'2",
	weight: 180,
	hair: "brown",
	eyes: "blue",
	2020: "2020",
	null: "null", // these last two work cause property keys are converted to strings
};

// access (get, set) person.name or person["name"]
// accessing via string allows for potentially more dynamic access
// e.g. let prop = "name", person[prop]

// also, accessing via .propertyName doesn't work with weird propNames like 2020 (invalid variable identifiers like nums or keywords: null)

// modifying objects
const midterms = { danielle: 100, john: 97, julie: 60, thomas: 76 };
midterms["john"] = 0; // he cheated

midterms["antonio"] = 86; // he submitted his test late <-- NOTE: this is a property

// USEFUL FUNCTIONS
// array.map (transform each element based on callback)
// array.forEach (call function on each element, useless given for of loop)
// array.filter (returns array with only elements that passed logical test written in arg function)
// array.some (returns true if any elements pass logical test written in arg function)
// array.every (returns true if every element passes logical test written in arg function)

// array.reduce (executes a reducer function on each element of the array, results in a single value)
[3, 5, 7, 9, 11].reduce((accumulator, currentValue) => {
	return accumulator + currentValue; // example of summing every element
}); // each return value is passed onto the next "cycle" as the new accumulator value, with currentValue as the next element
