let gpa_points = 0;
let get_gpa_button = document.getElementById("get-gpa");
let gpa_h3 = document.getElementById("gpa");

// TODO:
// Make this all of the input elements
// Make this a single line of code.
// Hint: get all of the document.query....All(".class-name")
// Hint: Please don't put my hint code exactly and expect it to work :)
let inputs = document.querySelectorAll(".gpa-input"); // finish the rest
console.log(inputs);
let fillGrades = (Letter) => {
  inputs.forEach((grade) => {
    let optionGrade = document.createElement("option");
    optionGrade.innerHTML = Letter;
    grade.appendChild(optionGrade);
  });
};

fillGrades("A");
fillGrades("B");
fillGrades("C");
fillGrades("D");
fillGrades("None");

let getGPA = () => {
  let AllGpa = 0;
  let gpaPnts = 0;
  inputs.forEach((percent) => {
    if (percent.value === "A") {
      gpaPnts += 4;
    } else if (percent.value === "B") {
      gpaPnts += 3;
    } else if (percent.value === "C") {
      gpaPnts += 2;
    } else if (percent.value === "D") {
      gpaPnts += 1;
    } else {
      gpaPnts += 0;
    }
  });
  AllGpa = gpaPnts / 4;
  return AllGpa;
  // step 1 set some variable for gpa points and make it equal to 0 to start
  // step 2 do the same but now for the gpa
  // step 3 loop through inputs:{
  // 		if a input value in inputs >= 90: gpaPoints += 4
  // 		elif a input value in inputs >= 80: gpaPoints += 3
  // 		elif a input value in inputs >= 70: gpaPoints += 2
  // 		elif a input value in inputs >= 60: gpaPoints += 1
  // 		else gpaPoints +=0
  // }
  //
  // step 4 - after the loop now calculate the gpa
  // HINT This is gpaPoints diveded by the number of classes(4 in this case)
  // return it
  //
};

get_gpa_button.onclick = () => {
  let flag = 0;
  let flag2 = 0;

  gpa_points = 0;
  inputs.forEach((Class) => {
    if (Class.value === "") {
      if (flag2 === 0) {
        alert("Please enter all grades.");
        flag = 1;
        flag2 = 1;
        return;
      }
    }
  });
  if (flag === 0) {
    let thisGpa = getGPA();
    gpa_points += thisGpa;
    gpa_h3.innerHTML = gpa_points;
    if (gpa_points > 3.0) {
      gpa_h3.classList.add("good-gpa");
    }
  }
  // if any of the inputs have a value that's empty{
  // 		return out and don't do anything :o
  // }
  // get the gpa using getGPA
  // set the h3 text to be the gpa
  //
  // if gpa > 3.0 add the class of good-gpa to it
};
