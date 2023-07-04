document.addEventListener("DOMContentLoaded", () => {
    fetch("https://al-hajjar.github.io/flatdangocodechallenge/db.json")
    .then((res) => res.json())
    .then((data) => {
      movieList(data.films);
    });

  function movieList(data) {
    data.forEach((movie) => {
      const markUp = document.createElement('li')
      markUp.classList.add(`listing${movie.id}`)
      markUp.classList.add(`hello`)
      markUp.innerHTML = movie.title

      document.querySelector("ul").append(markUp)

      // display first movie details
      displayMovie(movie);

      // display movie details on click of the movie titles
      markUp.addEventListener("click", function () {
        displayMovie(movie);
      });
    });
  }

  function displayMovie(movie) {
    const movieName = document.getElementById("name");
    const movieImage = document.getElementById("poster");
    const description = document.getElementById("description");
    const runTime = document.getElementById("runtime");
    const showTime = document.getElementById("showtime");
    const capacity = document.getElementById("capacity");
    const sold = document.getElementById("sold");
    const available = document.getElementById("available");
    let availableTickets = movie.capacity - movie.tickets_sold;

    movieName.innerHTML = movie.title;
    movieImage.src = movie.poster;
    description.innerHTML = movie.description;
    runTime.innerHTML = movie.runtime + " min";
    showTime.innerHTML = movie.showtime;
    capacity.innerHTML = movie.capacity + " seats";
    sold.innerHTML = movie.tickets_sold + " tickets";
    available.innerHTML = availableTickets + " tickets";

    husna(movie);
  }

  function husna(movie){
    const alwy = document.getElementById("ticket");
    const show = document.getElementById("show")
    const run = document.getElementById("run");
    const fat = document.getElementById("fat");
    let remaining = (movie.capacity - movie.tickets_sold) - 1;

    alwy.innerHTML = "Movie: " + movie.title;
    show.innerHTML = "Showtime: " + movie.showtime;
    run.innerHTML = "Runtime: " + movie.runtime + "min";
    fat.innerHTML = remaining + " more tickets available you can purchase them on home page";
  }
});
$(document).ready(function(){
  $("#btn").click(function(){
        $(".details").hide();
        $(".koz").show();
  });
});