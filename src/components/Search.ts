import { Component } from '../core/heropy'
import movieStore, { searchMovies } from '../store/movie'

interface State {
  [key: string]: unknown
  title: string
}

export default class Search extends Component {
  public state = {} as State
  render() {
    this.el.classList.add('search')
    this.el.innerHTML = /* html */ `
      <input
          value="${movieStore.state.searchText}" 
          placeholder="Enter the movie title to search!" />
      <button class="btn btn-primary">
        Search!
      </button>
    `

    const inputEl = this.el.querySelector('input')
    inputEl?.addEventListener('input', () => {
      movieStore.state.searchText = inputEl.value
    })
    inputEl?.addEventListener('keydown', (event: Event) => {
      if (event instanceof KeyboardEvent) {
        event.key === 'Enter' && searchMovies(1)
      }
    })

    const btnEl = this.el.querySelector('.btn')
    btnEl?.addEventListener('click', () => {
      searchMovies(1)
    })
  }
}
