import { Store } from '../core/heropy'

export interface SimpleMovie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}
export interface DetailedMovie {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster: string
  Ratings: {
    Source: string
    Value: string
  }[]
  Metascore: string
  imdbRating: string
  imdbVotes: string
  imdbID: string
  Type: string
  DVD: string
  BoxOffice: string
  Production: string
  Website: string
  Response: string
}
interface State {
  searchText: string
  page: number
  pageMax: number
  movies: SimpleMovie[]
  movie: DetailedMovie
  message: string
  loading: boolean
}
const movies: SimpleMovie[] = []
const movie = {} as DetailedMovie
const store = new Store<State>({
  searchText: '',
  page: 1,
  pageMax: 1,
  movies,
  message: 'Search for the movie title!',
  movie,
  loading: false,
})

export default store
export const searchMovies = async (page: number) => {
  store.state.loading = true
  if (page === 1) {
    store.state.movies = []
    store.state.message = ''
  }
  try {
    const res = await fetch('/api/movie', {
      method: 'POST',
      body: JSON.stringify({
        title: store.state.searchText,
        page
      })
    })
    const { Response, Search, totalResults, Error } = await res.json()
    if (Response === 'True') {
      store.state.movies = [
        ...store.state.movies,
        ...Search
      ]
      store.state.pageMax = Math.ceil(Number(totalResults) / 10)
    } else {
      store.state.message = Error
    }
  } catch (error) {
    console.log('searchMovies error:', error)
  } finally {
    store.state.loading = false
  }
}
export const getMovieDetails = async (id: string) => {
  store.state.loading = true
  try {
    const res = await fetch('/api/movie', {
      method: 'POST',
      body: JSON.stringify({
        id
      })
    })
    const movie = await res.json()
    store.state.movie = movie
  } catch (error) {
    console.log('searchMovieDetails error:', error)
  } finally {
    store.state.loading = false
  }
}
