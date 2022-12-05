////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////

const express = require("express")
const Movie = require("../models/movie")

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router()

////////////////////////////////////////////
// Routes
////////////////////////////////////////////
// router.get("/", (req, res) => {
//     res.send("your server is running... better catch it.")
//   })
  
// router.get("/seed", (req, res) => {
//     const startMovies = [
//         {
//             title: "Matrix",
//             releaseDate: "1999",
//             length: 136,
//             genre: "Sci-fi",
//             poster: "https://m.media-amazon.com/images/I/51unGrb-AAL._AC_.jpg",
//             director: "Lana, Lily Wachowski",
//             rating: "R",
//             watchAgain: true,
//             cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"]

//         },
//         {
//             title: "50 First Dates",
//             releaseDate: "2004",
//             length: 99,
//             genre: "Romance-Comedy",
//             poster: "https://m.media-amazon.com/images/I/51DwXrrfv+L._AC_UF894,1000_QL80_.jpg",
//             director: "Peter Segal",
//             rating: "PG-13",
//             watchAgain: true,
//             cast: ["Adam Sandler", "Drew Barrymore", "Rob Schneider"]

//         },
//         {
//             title: "The Dark Knight",
//             releaseDate: "2008",
//             length: 152,
//             genre: "Action",
//             poster: "https://m.media-amazon.com/images/I/51rF2-tvXVL._AC_.jpg",
//             director: "Christopher Nolan",
//             rating: "PG-13",
//             watchAgain: true,
//             cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"]

//         }
//     ]

//     // Delete all movies
//     Movie.deleteMany({}).then((data) => {
//         // Seed Starter movies
//         Movie.create(startMovies).then((data) => {
//             // send created movies as response to confirm creation
//             res.json(data);
//         })
//     })
// })
  
  // // Index route
  // router.get("/movies", (req, res) => {
  //     // find all the movies
  //     Movie.find({})
  //       // render a template after they are found
  //       .then((movies) => {
  //         res.render("movies/Index", { movies });
  //       })
  //       // send error as json if they aren't
  //       .catch((error) => {
  //         res.json({ error });
  //       });
  //   })
  
  // Index route
  router.get("/", async (req, res) => {
      try{
          const movies = await Movie.find({})
          res.render("movies/Index", { movies })
      } catch (err) {
          res.json({ err })
      }
    })
  
  //New Route
  router.get("/new", (req,res) => {
      res.render("movies/New")
  })
  
  //Delete Route
  router.delete("/:id", (req, res) => {
      // get the id from params
      const id = req.params.id;
      // delete the movie
      Movie.findByIdAndRemove(id)
        .then((movie) => {
          // redirect to main page after deleting
          res.redirect("/movies");
        })
        // send error as json
        .catch((error) => {
          console.log(error);
          res.json({ error });
        });
    })
  
  //UPDATE
  router.put("/:id", async (req, res) => {
      try {
        const id = req.params.id;
        req.body.watchAgain = req.body.watchAgain === "on" ? true : false;
        req.body.cast = req.body.cast.split(",")
        await Movie.findByIdAndUpdate(id, req.body)
        res.redirect(`/movies/${id}`)
      } catch (error) {
        console.log(error);
        res.json({ error });
      }
    })
  
  
  //Create Route
  router.post("/", async (req,res) => {
      try {
          req.body.watchAgain = req.body.watchAgain === "on" ? true:false
          req.body.cast = req.body.cast.split(",")
          console.log(req.body)
          const createdMovie = await Movie.create(req.body)
          res.redirect("/movies")
      }catch(error){
          console.log(error)
          res.json({error})
      }
  })
  
  
  //Edit 
  router.get("/:id/edit", (req, res) => {
      // get the id from params
      const id = req.params.id;
      // get the movie from the database
      Movie.findById(id)
        .then((movie) => {
          // render Edit page and send movie data
          res.render("movies/Edit.jsx", { movie });
        })
        // send error as json
        .catch((error) => {
          console.log(error);
          res.json({ error });
        });
    });
  
  //Show Route
  router.get("/:id", async (req, res) => {
      const id = req.params.id
    
      try {
        const movie = await Movie.findById(id)
        res.render("movies/Show", { movie })
      } catch (error){
        console.log(error);
        res.json({ error });
      }
    })

module.exports= router