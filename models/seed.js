///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////

const mongoose = require("./connection")
const Movie = require("./movie")

///////////////////////////////////////////
// Seed Code
////////////////////////////////////////////

// save the connection in a variable
const db = mongoose.connection

// Make sure code is not run till connected
db.on("open", () => {
    ///////////////////////////////////////////////
    // Write your Seed Code Below
    //////////////////////////////////////////////
    const startMovies = [
        {
            title: "Matrix",
            releaseDate: "1999",
            length: 136,
            genre: "Sci-fi",
            poster: "https://m.media-amazon.com/images/I/51unGrb-AAL._AC_.jpg",
            director: "Lana, Lily Wachowski",
            rating: "R",
            watchAgain: true,
            cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"]

        },
        {
            title: "50 First Dates",
            releaseDate: "2004",
            length: 99,
            genre: "Romance-Comedy",
            poster: "https://m.media-amazon.com/images/I/51DwXrrfv+L._AC_UF894,1000_QL80_.jpg",
            director: "Peter Segal",
            rating: "PG-13",
            watchAgain: true,
            cast: ["Adam Sandler", "Drew Barrymore", "Rob Schneider"]

        },
        {
            title: "The Dark Knight",
            releaseDate: "2008",
            length: 152,
            genre: "Action",
            poster: "https://m.media-amazon.com/images/I/51rF2-tvXVL._AC_.jpg",
            director: "Christopher Nolan",
            rating: "PG-13",
            watchAgain: true,
            cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"]

        }
    ]
    // Delete all movies
    Movie.deleteMany({}).then((data) => {
        // Seed Starter movies
        Movie.create(startMovies).then((data) => {
            // log new movies
            console.log("data", data)
            db.close()
        })
        .catch((error) => {
            console.log(error)
            db.close()
        })
    })
})