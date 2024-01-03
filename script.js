// api key from TMDB
const api_key = "d6722938e12ed8ef3cee3b8cf6358672";

// base url of the site
const base_url = "https://api.themoviedb.org/3";
const banner_url = "https://image.tmdb.org/t/p/original";
const img_url = "https://image.tmdb.org/t/p/w300";

// requests for movies data
const requests = {
  fetchTrending: `${base_url}/trending/all/week?api_key=${api_key}&language=en-US`,
  fetchNetflixOrignals: `${base_url}/discover/tv?api_key=${api_key}&with_networks=213`,
  fetchActionMovies: `${base_url}/discover/movie?api_key=${api_key}&with_genres=28`,
  fetchComedyMovies: `${base_url}/discover/movie?api_key=${api_key}&with_genres=35`,
  fetchHorrorMovies: `${base_url}/discover/movie?api_key=${api_key}&with_genres=27`,
  fetchRomanceMovies: `${base_url}/discover/movie?api_key=${api_key}&with_genres=10749`,
};

// truncating the string
function truncate(str, n) {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

async function createRow(title, url) {
  const data = await fetch(url).then((res) => res.json());

  const headrow = document.getElementById("headrow");
  const row = document.createElement("div");
  row.className = "row";
  headrow.appendChild(row);

  const rowTitle = document.createElement("h2");
  rowTitle.className = "row__title";
  rowTitle.innerText = title;
  row.appendChild(rowTitle);

  const rowPosters = document.createElement("div");
  rowPosters.className = "row__posters";
  row.appendChild(rowPosters);

  data.results.forEach((movie) => {
    const poster = document.createElement("img");
    poster.className = "row__poster";
    poster.id = movie.id;
    poster.src = img_url + movie.backdrop_path;
    rowPosters.appendChild(poster);
  });
}

// banner
async function setBanner() {
  const data = await fetch(requests.fetchNetflixOrignals).then((res) =>
    res.json()
  );

  const setMovie =
    data.results[Math.floor(Math.random() * data.results.length - 1)];

  const banner = document.getElementById("banner");
  const bannerTitle = document.getElementById("banner__title");
  const bannerDesc = document.getElementById("banner__description");

  banner.style.backgroundImage = `url(${banner_url}${setMovie.backdrop_path})`;
  bannerDesc.innerText = truncate(setMovie.overview, 150);
  bannerTitle.innerText = setMovie.name;
}

// Usage
createRow("NETFLIX ORIGINALS", requests.fetchNetflixOrignals);
createRow("Top Rated", requests.fetchTrending);
createRow("Action Movies", requests.fetchActionMovies);
createRow("Comedy Movies", requests.fetchComedyMovies);
createRow("Horror Movies", requests.fetchHorrorMovies);
createRow("Romance Movies", requests.fetchRomanceMovies);

setBanner();
