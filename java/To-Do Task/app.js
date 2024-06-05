let task_name_in = document.getElementById("task-name-input");
let task_importance_in = document.getElementById("task-importance-input");
let submit_task_button = document.getElementById("submit-task-button");
let clear_list_button = document.getElementById("clear-list-button");
let ul = document.getElementById("things-to-do");
let task_mem = [];
let import_mem = [];

submit_task_button.onclick = () => {
  if (task_name_in.value === "" || task_importance_in.value === "") {
    alert("No empty inputs!!!");
    return;
  } else {
    let task = document.createElement("li");
    task.innerHTML = task_name_in.value;
    task.classList.add("not-done");
    // i want to add them in their importance, all i need to know if the ul has a list that i can index and then i can use that to insert them in importance
    // task_mem.push(task);
    // import_mem.push(parseInt(task_importance_in.value));
    // for (let i = 0; i < task_mem.length; i++) {
    //   if (i + 1 < task_mem.length) {
    //     if (import_mem[i] > import_mem[i + 1]) {

    //     }
    //   }
    // }

    ul.appendChild(task);
    task.onclick = () => {
      if (task.classList.contains("not-done")) {
        task.classList.remove("not-done");
        task.classList.add("done");
      } else {
        task.classList.remove("done");
        task.classList.add("not-done");
      }
    };
  }
  /*

	  step 1 check if task_name_in OR task_importance_in are empty:
		by empty I mean equals to a empty string
	 	if either one of them are empty:
			alert("No empty fields")
			return right away

		step 2: if you're good then:
							make a new li element
							make it's innerHTML be set to the task_name_in value
							set it's class to be "not-done"


		step 3 - add a onclick function to that li:
							When you click the li you want to check it's class:
							HINT: classList.contains("the-class-you-want-to-check")
							if the classList contains "not-done":
								remove "not-done" from the classList
								add "done" to the class list
							else:
								remove "done" from the classList
								add "not-done" to the class list

		step 4 - Add the li to the ul :)


	*/
};

clear_list_button.onclick = () => {
  ul.innerHTML = "";
  // one line of code to clear the ul
};
