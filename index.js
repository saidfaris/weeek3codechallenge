const placeholderSection = document.querySelector('.placeholder');
const movieList = document.querySelector('.movie-list');
let movies;
let currentMovie;

const movieTitle = document.createElement('h2');
const movieRuntime = document.createElement('p');
const movieCapacity = document.createElement('p');
const showtime = document.createElement('p');
const ticketsAvailable = document.createElement('p');
const movieDescription = document.createElement('p');
const moviePoster = document.createElement('img');

const buyTicket = document.createElement('button');

const moviesUl = document.createElement('ul');

buyTicket.addEventListener('click', () => {
	reduceTicketNumbers(currentMovie);
});

movieList.appendChild(moviesUl);

const allMoviesUrl = 'https://api.npoint.io/1b4738002482f1452f54/films';

document.addEventListener('DOMContentLoaded', fetchPlaceholderMovie);
document.addEventListener('DOMContentLoaded', renderMoviesList);

function fetchPlaceholderMovie() {
	fetch(allMoviesUrl)
		.then((res) => res.json())
		.then((data) => {
			currentMovie = data[0];
			renderPlaceholderMovie(currentMovie);
		});
}

function renderPlaceholderMovie(movie) {
	const availableTickets = movie.capacity - movie.tickets_sold;
	movieTitle.textContent = movie.title;
	movieRuntime.textContent = `Runtime: ${movie.runtime} minutes`;
	movieCapacity.textContent = `Capacity: ${movie.capacity}`;
	showtime.textContent = `Showtimes: ${movie.showtime}`;
	ticketsAvailable.textContent =
		availableTickets > 0
			? `Tickets Available: ${availableTickets}`
			: 'No Tickets Available';
	movieDescription.textContent = movie.description;
	moviePoster.src = movie.poster;
	buyTicket.innerText = availableTickets > 0 ? 'BuyTicket' : 'Sold Out';

	buyTicket.className = buyTicket.innerText === 'Sold Out' ? 'disabled' : '';

	placeholderSection.appendChild(movieTitle);
	placeholderSection.appendChild(moviePoster);
	placeholderSection.appendChild(movieDescription);
	placeholderSection.appendChild(movieRuntime);
	placeholderSection.appendChild(movieCapacity);
	placeholderSection.appendChild(showtime);
	placeholderSection.appendChild(ticketsAvailable);
	placeholderSection.appendChild(buyTicket);
}

function renderMoviesList() {
	fetch(allMoviesUrl)
		.then((res) => res.json())
		.then((data) => {
			movies = data;
			renderMovies(movies);
		});
}

function renderMovies(movies) {
	movies.map((movie) => {
		const li = document.createElement('li');
		li.textContent = movie.title;
		moviesUl.appendChild(li);

		li.addEventListener('click', () => {
			currentMovie = movie;
			renderPlaceholderMovie(currentMovie);
		});
	});
}

function reduceTicketNumbers(movie) {
	movie.tickets_sold++;
	renderPlaceholderMovie(movie);
}