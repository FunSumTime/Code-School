let people_list = document.getElementById("people-list");

let getData = async () => {
  response = await fetch("https://swapi.dev/api/people/");
  let data = await response.json();
  return data;
};

let MakeList = async () => {
  let data = await getData();
  let people = data.results;
  people.forEach((person) => {
    let new_li = document.createElement("li");
    new_li.innerHTML = person.name;
    people_list.appendChild(new_li);
  });
};

MakeList();

// ask for the data
// for asynic code you need the await
