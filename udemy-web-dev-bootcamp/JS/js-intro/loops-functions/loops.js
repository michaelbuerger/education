// standard for loop
for (let i = 0; i < 10; i++) {
	console.log(i);
}

const colors = ["red", "green", "blue"];

// standard while loop
let iter = 0;
while (iter < colors.length) {
	console.log(colors[iter]);
	iter++;
}

// looping over an array
// iterating
for (let i = 0; i < colors.length; i++) {
	console.log(colors[i]);
}

// for-of (not supported in IE, who cares)
/* for (const iterator of object) {
    
}*/

for (const color of colors) {
	// can be let or const, should default to const
	console.log(color);
}

// object literals are not iterable, so doesn't work with for-of
const testScores = {
	keenan: 80,
	damon: 67,
	kim: 89,
	shawn: 91,
	marlon: 72,
	dwayne: 77,
	nadia: 83,
};

// can use for-in (iterates through keys)
for (const name in testScores) {
	console.log(`${name} scored ${testScores[name]}`);
}

// Object.keys(testScores) or Object.values(testScores) returns an array (iterable)
// Object.entries(testScores) returns an array of nested key-value pairs [["keenan", 80], ["damon", 67], ...]
