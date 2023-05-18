import { APIURL } from "./config.js";

// defined variables - finding elements by ID in .html files
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('id');
const title = document.getElementById("card-title")
const date = document.getElementById("release-date")
const poster = document.getElementById("movie-poster")
const runtime = document.getElementById("runtime")
const director = document.getElementById("director")
const cast = document.getElementById("cast")
const genre = document.getElementById("genre")
const plot = document.getElementById("plot")
const classification = document.getElementById("classification")


console.log(myParam);
searchByID(myParam)

// opens additional info for whichever movie was selected
async function searchByID(id) {
    const res = await fetch(APIURL + `i=${id}`)
    const json = await res.json()
    console.log(json);
    displayResults(json)
}

// displaying results for selected movie
function displayResults(json) {
    title.innerHTML = json.Title
    date.innerHTML = json.Released
    runtime.innerHTML = json.Runtime
    director.innerHTML = json.Director
    cast.innerHTML = json.Actors
    genre.innerHTML = json.Genre
    plot.innerHTML = json.Plot
    classification.innerHTML = json.Rated
    poster.src = json.Poster
}