import { Component } from '../core/heropy'
import movieStore, { searchMovies } from '../store/movie'

export default class Search extends Component {
  render() {
    this.el.classList.add('search')
    // 사용자가 뒤로가기 버튼을 눌렀을 때 검색어를 유지하기 위해,
    // input 요소의 value 속성에 기존 검색어를 할당해야 합니다!
    this.el.innerHTML = /* html */ `
      <input 
        value="${movieStore.state.searchText}"
        placeholder="Enter the movie title to search!" />
      <button class="btn btn-primary">
        Search!
      </button>
    `

    const inputEl = this.el.querySelector('input')
    inputEl.addEventListener('input', () => {
      movieStore.state.searchText = inputEl.value
    })
    inputEl.addEventListener('keydown', event => {
      if (event.key === 'Enter' && movieStore.state.searchText.trim()) {
        searchMovies(1)
      }
    })

    const btnEl = this.el.querySelector('.btn')
    btnEl.addEventListener('click', () => {
      if (movieStore.state.searchText.trim()) {
        searchMovies(1)
      }
    })
  }
}
