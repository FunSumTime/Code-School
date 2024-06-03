let First_Number_input = document.getElementById("First-number");
let second_number_input = document.getElementById("second-number");
let result = document.getElementById("output");
let Do_button = document.getElementById("DoMath");
let select = document.getElementById("meow");

let add_nums = (x, y) => {
  result.innerHTML = "Output : " + (parseInt(x) + parseInt(y));
};

let Sub_nums = (x, y) => {
  result.innerHTML = "Output : " + (parseInt(x) - parseInt(y));
};

let Mult_nums = (x, y) => {
  result.innerHTML = "Output : " + parseInt(x) * parseInt(y);
};

let Div_nums = (x, y) => {
  result.innerHTML = "Output : " + parseInt(x) / parseInt(y);
};

Do_button.onclick = () => {
  if (select.value === "Adding") {
    add_nums(First_Number_input.value, second_number_input.value);
  } else if (select.value === "Subtracting") {
    Sub_nums(First_Number_input.value, second_number_input.value);
  } else if (select.value === "Multiply") {
    Mult_nums(First_Number_input.value, second_number_input.value);
  } else {
    Div_nums(First_Number_input.value, second_number_input.value);
  }
};

// let left_num = parseInt(First_Number_input.value);
//   let right_num = parseInt(second_number_input.value);
//   result.innerHTML = "Output : " + (left_num + right_num);
//   First_Number_input.value = "";
//   second_number_input.value = "";
