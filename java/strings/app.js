let person = "Dj Holt";
// split
// ['d','j',' ', 'h']
let personArray = person.split(" ");
console.log(personArray);

// joining
// take strings and put them together
let newPerson = personArray.join("-");
console.log(newPerson);

// slicing
let dj_without_a_t = person.slice(0, -1);
console.log(dj_without_a_t);
