function display2_1() {
  // var saiyan = {name: 'Son Goku', age: 40};
  // console.log(saiyan.dragonball);
  // console.log(null == undefined);
  // console.log(null === undefined);
  var myanswer  = (
                  "The actual output for console.log(saiyan.dragonball) is undefined because we only initialized saiyan to have a name and an age value. " +
                  "The double equality operator checks if the value is the same, and null and undefined are the same in value. " +
                  "The triple equality operator checks if the value and the type is the same, and the value of null and undefined is the same (as seen above), but the type of null is an object and the type of undefined is its own type: undefined"
                  );  // TODO 2.1: Fill in Answer here after the :
  document.getElementById("21answer").innerHTML = myanswer; // Do not change
}
function display2_2() {
  var myanswer  = (
                  "The 'use strict' makes sure the code is executed in strict mode. Strict mode does not allow for undeclared variables and will cause an error. " +
                  "If we leave the 'use strict'; keyword we'll see an error in the console, if we take it out, the error is gone."
                  ); // TODO 2.2: Fill in Answer here
  document.getElementById("22answer").innerHTML = myanswer; // Do not change
}

function display2_5() {
  var myanswer  = (
                  "The reason we see the div's children and the number of of children and we don't see them in the HTML document is because the children od div_1134 are both inline styled to have display: none;"
                  ); // TODO 2.5: Fill in Answer here
  document.getElementById("25answer").innerHTML = myanswer; // Do not change
}

function countDiv() { // Do not add or remove lines to this function
    var divs = document.getElementsByTagName('div'); // TODO: Question 2.3: Use the document Object to get the number of divs in the HTML page. Replace dummyMethod with the correct one.
    alert("Number of divs in this page is: " + divs.length); // Do not change
}

function makeOrange() { // Do not add or remove lines to this function
    var narutos = document.querySelectorAll("*[name='naruto']"); // TODO: Question 2.4: Use the document Object to get all tags named "naruto" in the HTML page. Replace dummyMethod with the correct one.
    for(var i=0; i< narutos.length; i++) { // Do not change
        narutos[i].style.color = 'orange'; // Do not change
    }
}

function getChildrenTags() { // Do not add or remove lines to this function
  var children = document.getElementById('div_1134').children; // TODO: Question 2.5 Use the appropriate function to get all the children of a div named 'div_1134'
  var tagNames = ""; // Do not change
  for (var i = 0; i < children.length; i++) {// Do not change
    console.log(children[i].tagName);// Do not change
    tagNames += children[i].tagName +", " ;// Do not change
  }// Do not change
  alert(children.length); // Do not change
  alert("The tags that I found are: " + tagNames);// Do not change
}
