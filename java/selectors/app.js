// This is to add a class to a object
let pick_me = document.getElementById("pick-me");
pick_me.classList.add("make-me-red");

let red_p_tag = document.querySelectorAll(".make-me-red");
let blue_p_tag = document.querySelectorAll(".make-me-blue");
let zero_p_tag = document.querySelectorAll(".make-me-0");
let one_p_tag = document.querySelectorAll(".make-me-1");

// this wont work this is not good
// red_p_tag.array.forEach((p_tag) => {
//   p_tag.style.color = "red";
// });

red_p_tag.forEach((p_tag) => {
  p_tag.style.color = "red";
});

blue_p_tag.forEach((b_p_tag) => {
  b_p_tag.style.color = "blue";
});

zero_p_tag.forEach((z_p_tag) => {
  z_p_tag.innerHTML = "0";
});

one_p_tag.forEach((juan_p_tag) => {
  juan_p_tag.innerHTML = "1";
});
