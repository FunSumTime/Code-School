let hi_button = document.getElementById("hi-button");
// when we where getting the element we were using the # sign in the front
// arrow function was not finished and there was no alert
hi_button.onclick = () => {
  alert("Hi");
};
// when changing edit_distance we just had it equal and didn't have the innerHTMl
let edit_distance_h2 = document.getElementById("edit-distance");
edit_distance_h2.innerHTML = "Edit Distance";
// we where adding two strings and we needed parse int for numbers
let sum = parseInt("1") + parseInt("3");
let sum_p = document.getElementById("sum");
sum_p.innerHTML = sum;
