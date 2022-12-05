import { Store } from '../core/heropy'

const movies = []
const movie = {}
const store = new Store({
  searchText: '',
  page: 1,
  pageMax: 1,
  movies,
  message: 'Search for the movie title!',
  movie,
  loading: false
})

export default store
export const searchMovies = async page => {
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
export const getMovieDetails = async id => {
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
