// setting up my variables
let num = 0;
let people_ul = document.getElementById("the-universe");
let snap_button = document.getElementById("Snaper-button");

let snap = (x) => {
  // looping over the amount of children
  for (let i = 0; i < x; i++) {
    // this will make it stop when half lose
    if (num < x / 2) {
      // getting a random number for the coin flip it makes a number (float) from 1 to 0
      let chance = Math.random() * 10;
      if (chance < 5) {
        // can't do people_ul[i] have to index through the children
        // could store the parameter in a varable
        people_ul.removeChild(people_ul.children[i]);
        // incrementing our num as well
        num++;
      }
    }
  }
  //   setting the num to 0 as it dosent reset when we are donw unless we refresh the page
  num = 0;
};
// when the snap is clicked this will happen
snap_button.onclick = () => {
  // passing in the amount of children
  let children = people_ul.childElementCount;
  snap(children);
};
