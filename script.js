import { APIURL } from "./config.js";

// defined variables
const movies = document.getElementById("movies")
const searchInput = document.getElementById("searchInput")
const search = document.getElementById("search")
const error = document.getElementById("error")
error.style.display = "none"

// local storage - runs on window load, remembers last search item
window.addEventListener("load", function() {
  const query = localStorage.getItem("search")
  searchInput.value = query
  searchMovie(query)
})

// searches input after mouse click on button
search.addEventListener("click", function () {
    const query = searchInput.value
    searchMovie(query)
    localStorage.setItem("search", query)
  })

// validation for empty search field
async function searchMovie(query) {
  if(!query){
    error.style.display = "block"
    error.innerHTML = "Please enter a search term"
    return
  }
  error.style.display = "none"
  const res = await fetch(APIURL + `s=${query}`)
  const json = await res.json()
  console.log(json);
  movies.innerHTML = "";
  displayResults(json)
}

// display results of searched item - pull json info and append to card
function displayResults(json) {
    for (let index = 0; index < json.Search.length; index++) {
        console.log(json.Search[index].Title);

        const card = document.createElement("div")
        card.className = "col-4"
        const h2 = document.createElement("h2")
        const img = document.createElement("img")
        const pYear = document.createElement("p")

        const a = document.createElement("a")

        h2.innerHTML = json.Search[index].Title
        img.src = json.Search[index].Poster
        pYear.innerHTML = json.Search[index].Year
        a.href = "movie.html?id=" + json.Search[index].imdbID


        card.appendChild(a)
        a.appendChild(img)
        card.appendChild(h2)
        card.appendChild(pYear)
        movies.appendChild(card)
    }
}