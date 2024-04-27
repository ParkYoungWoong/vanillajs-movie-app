import { Component } from '../core/heropy'
import Headline from '../components/Headline'
import Search from '../components/Search'
import MovieList from '../components/MovieList'
import MovieListMore from '../components/MovieListMore'
import Chatbot from '../components/Chatbot'

export default class Home extends Component {
  render() {
    const headline = new Headline().el
    const search = new Search().el
    const movieList = new MovieList().el
    const movieListMore = new MovieListMore().el
    const chatbot = new Chatbot().el
    
    this.el.classList.add('container')
    this.el.append(
      headline,
      search,
      movieList,
      movieListMore,
      chatbot
    )
  }
}
