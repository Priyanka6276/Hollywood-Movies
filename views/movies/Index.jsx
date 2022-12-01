const React = require("react")
const DefaultLayout = require("../Default")

class Index extends React.Component {
  render(){
    const { movies } = this.props
    return(
      <DefaultLayout>
        <div>
            <a href="/movies/new"> Create a Movie</a>
          {
            movies.map((movie) => {
              return(
                <article>
                  <a href={`/movies/${movie._id}`}><h2>{movie.title}</h2></a>
                  <img src={movie.poster} alt="" />
                  
                </article>
              )
            })
          }
        </div>
      </DefaultLayout>
    )
  }
}

module.exports = Index