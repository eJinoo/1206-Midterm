let movieData = {};
const movieCard = document.getElementById("card-deck");

async function getTopMovies(){
    const topMovieData = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=7e2ccf01948ba9c2effd72a968420572");
    const topMovieJSON = await topMovieData.json();
    movieData = topMovieJSON;
    makeMovieWheel();
}

let movieGenres = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZTJjY2YwMTk0OGJhOWMyZWZmZDcyYTk2ODQyMDU3MiIsInN1YiI6IjY1ZGE2ZWFiNDU3NjVkMDE4NWQxMTQwZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lGq8af5AmZwYabUqpSRArhYW7h544xEYFMvzxjuI7Bk'
    }
  };
  
  fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', movieGenres)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));


// test
console.log(movieGenres);

function makeMovieCard(movie){
    const cardUI = `
    <div class="card">
          <img class="card-img-top" src="${"https://image.tmdb.org/t/p/w500" + movie["poster_path"]}" alt="Card image cap" width = "10px" height = auto>
          <div class="card-body">
            <h5 class="card-title">${movie["original_title"]}</h5>
            <p class="card-text">${movie["overview"]}</p>
            <p class="card-text"><small class="text-muted">${movie["genre_ids"]}, ${movie["release_date"]}</small></p>
          </div>
        </div>`;
  movieCard.innerHTML += cardUI;
}

// function genres(arr){
//     genreList = ""
//     for (let genre_id of arr){
//         if (genre_id === movieGenres.genres[0]){
//         genreList += movieGenres.genres[1] + ' ';
//         }
//     }
//     return genreList;
// }

function makeMovieWheel(){
    for (let movie of movieData.results){
        makeMovieCard(movie);
    }
}

getTopMovies();