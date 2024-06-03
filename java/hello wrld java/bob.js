console.log("Bob is a funny name");
let first_bad_movie = {
  name: "Kung-Fu-Panda 4",
  rating: 4,
};

console.log(first_bad_movie);
let bad_movies = [first_bad_movie];

let bad_movies_ul = document.getElementById("bad-movies-list");

// naming convention have what it is at the end
let add_button = document.getElementById("bad-movie-button");
let bad_movie_input = document.getElementById("text-input");
let rating_input = document.getElementById("rating-input");

let reload_list = () => {
  bad_movies_ul.innerHTML = "";
  bad_movies.forEach((b_movie) => {
    let bad_movie_li = document.createElement("li");
    bad_movie_li.innerHTML =
      b_movie.name + " | " + b_movie.rating + " out of 10";
    bad_movies_ul.appendChild(bad_movie_li);
  });
};

reload_list();

add_button.onclick = () => {
  let new_movie = [];
  new_movie.name = bad_movie_input.value;
  new_movie.rating = rating_input.value;
  // for list it is just push
  bad_movies.push(new_movie);

  reload_list();
  bad_movie_input.value = "";
  rating_input.value = "";
};
