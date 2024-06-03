let play_button = document.getElementById("b");
let p_count = document.getElementById("count");
let counter = 0;
play_button.onclick = () => {
  counter++;
  p_count.innerHTML = counter;
};
