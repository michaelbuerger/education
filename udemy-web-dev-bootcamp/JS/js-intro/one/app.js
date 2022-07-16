// JavaScript file to be included in index.html

alert("Hello from JS!");

console.log("Hello from JS!".toUpperCase());

let userInput = prompt("Truthy or Falsey?");
alert(`Input evaluated to ${userInput ? "truthy" : "falsey"}`);

// all values evaluate to true (truthy)
// except falsy values:
// false, 0, "", null, undefined, NaN
// will roughly evaluate (if("") { code } for example --> won't execute code in brackets ) false
// note, "0", "null", "undefined", "NaN" (non empty strings) evaluate to truthy
