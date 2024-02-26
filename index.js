let movieData = {};
let npmovieData = {};
let upcomingData = {};
let topRatedData = {};
let genreList = {};
const movieCard = document.getElementById("card-deck");
const carousel = document.getElementById("carouselExampleIndicators");
const trending = document.getElementById("2");
const home = document.getElementById("1");
const topRated = document.getElementById("3");
const upcoming = document.getElementById("4");
const title = document.getElementById("title")


async function getTopMovies(){
    const topMovieData = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=7e2ccf01948ba9c2effd72a968420572");
    const topMovieJSON = await topMovieData.json();
    movieData = topMovieJSON;
}

async function getNowPlayingMovies(){
  const npMovieData = await fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=7e2ccf01948ba9c2effd72a968420572");
  const npMovieJSON = await npMovieData.json();
  npmovieData = npMovieJSON;
  makeMovieWheel(npmovieData);
}

async function getUpcomingMovies(){
  const upMovieData = await fetch("https://api.themoviedb.org/3/movie/upcoming?api_key=7e2ccf01948ba9c2effd72a968420572");
  const upMovieJSON = await upMovieData.json();
  upcomingData = upMovieJSON;
}

async function getTopRatedMovies(){
  const topRatedMovieData = await fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=7e2ccf01948ba9c2effd72a968420572");
  const topRatedJSON = await topRatedMovieData.json();
  topRatedData = topRatedJSON;
}

async function getGenres(){
  const genreData = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=7e2ccf01948ba9c2effd72a968420572");
  const genreJSON = await genreData.json();
  genreList = genreJSON;
}

getGenres(); // needs to be called earlier to use it 

// test
// console.log(npmovieData);

function makeMovieCard(movie){
    const genreArray = movie["genre_ids"].map(idToGenre);
    const cardUI = `
    <div class="col-lg-2.5">
    <div class="card" mb-3 style="width: 200px; margin: 7px;">
          <img class="card-img-top" src="${"https://image.tmdb.org/t/p/w500" + movie["poster_path"]}" alt="Card image cap style="width: 100%; height: auto;">
          <div class="card-body">
            <h5 class="card-title">${movie["original_title"]} ${altTitle(movie)}</h5>
            <p class="card-text">${movie["overview"]}</p>
            <p class="card-text"><small class="text-muted">${genreArray}, ${movie["release_date"]}</small></p>
          </div>
        </div>
      </div>
        `;
  card_row.innerHTML += cardUI;
}

function altTitle(obj){
  if (obj.title != obj.original_title){
    return `(${obj.title})`
  } else {
    return ''
  }
}

// there are 19 things in the genre array, need to find 
function idToGenre(id){
  for (object of genreList.genres){
    if (object.id === id){
      return object.name;
    }
  }
}

// function arrayToText(arr){
//   const final = '';
//   for (let i of arr){
//     final += i 
//   }
//   return final;
// }

trending.addEventListener("click", function(){
  carousel.innerHTML = '';
  carousel.style = '';
  card_row.innerHTML = '';
  title.innerHTML = 'TRENDING'
  makeMovieWheel(movieData);
}  )

home.addEventListener("click", function(){
  carousel.innerHTML = `<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel" style="height: 400px; overflow: hidden;">
  <ol class="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
  </ol>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img class="d-block w-100" src="https://image.tmdb.org/t/p/original/nTPFkLUARmo1bYHfkfdNpRKgEOs.jpg" alt="First slide" style="object-fit: cover; height: 100%;">
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="https://image.tmdb.org/t/p/original/pWsD91G2R1Da3AKM3ymr3UoIfRb.jpg" alt="Second slide" style="object-fit: cover; height: 100%;">
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="https://image.tmdb.org/t/p/original/yyFc8Iclt2jxPmLztbP617xXllT.jpg" alt="Third slide" style="object-fit: cover; height: 100%;">
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>`;
card_row.innerHTML = '';
title.innerHTML = 'NOW PLAYING'
makeMovieWheel(npmovieData);
}  )

topRated.addEventListener("click", function(){
  carousel.innerHTML = '';
  carousel.style = '';
  card_row.innerHTML = '';
  title.innerHTML = 'ALL TIME CLASSICS';
  makeMovieWheel(topRatedData);
}  )

upcoming.addEventListener("click", function(){
  carousel.innerHTML = '';
  carousel.style = '';
  card_row.innerHTML = '';
  title.innerHTML = 'UPCOMING'
  makeMovieWheel(upcomingData);
}  )

function makeMovieWheel(movieList){
    for (let movie of movieList.results){
        makeMovieCard(movie);
    }
}

getNowPlayingMovies();
getTopMovies();
getTopRatedMovies();
getUpcomingMovies();
