import { Component } from '../core/heropy'
import chatStore, { sendMessages } from '../store/chatbot'
import movieStore, { searchMovies } from '../store/movie'

export default class Headline extends Component {
  constructor() {
    super()
    chatStore.subscribe('messages', () => this.render())
    chatStore.subscribe('loading', () => this.render())
  }
  render() {
    this.el.classList.add('chatbot')
    this.el.innerHTML = /* html */ `
      <div class="chats">
        <ul>
          ${chatStore.state.messages.map(msg => /* html */ `
            <li class="${msg.role}">
              ${msg.role === 'assistant' ? (/* html */ `
                <div class="photo">
                  <span class="material-symbols-outlined">smart_toy</span>
                </div>`) : ''}
              ${typeof msg.content === 'string' 
                ? msg.content?.replace(/{{(.*?)\/\/(.*?)}}/g, (match, p1, p2) => /* html */ `<span class="movie-title" data-movie-title="${p2}">${p1}</span>`)
                : ''}
            </li>
          `).join('')}
          ${chatStore.state.loading ? /* html */ `
            <li class="assistant">
              <div class="photo">
                <span class="material-symbols-outlined">smart_toy</span>
              </div>
              <div class="the-loader"></div>
            </li>
          ` : ''}
        </ul>
        <div class="input">
          <input />
          <button class="btn btn-primary">
            <span class="material-symbols-outlined icon">send</span>
          </button>
        </div>
      </div>  
      <div class="btn btn-circle chat-starter">
        <span class="material-symbols-outlined icon--open">chat</span>
        <span class="material-symbols-outlined icon--close">close</span>
      </div>
    `

    const chatbotEl = this.el.querySelector('.chats')
    chatbotEl?.addEventListener('click', (event: Event) => {
      event.stopPropagation()
    })

    const chatStarterEl = this.el.querySelector('.chat-starter')
    chatStarterEl?.addEventListener('click', (event: Event) => {
      event.stopPropagation()
      this.el.classList.toggle('chatbot--on')
      const offChats = () => this.el.classList.remove('chatbot--on')
      if (this.el.classList.contains('chatbot--on')) {
        window.addEventListener('click', offChats)
        setTimeout(() => {
          inputEl?.focus()
        }, 300)
      } else {
        window.removeEventListener('click', offChats)
      }
    })

    const inputEl = this.el.querySelector('input')
    inputEl?.addEventListener('input', () => {
      chatStore.state.chatText = inputEl.value
    })
    inputEl?.addEventListener('keydown', async (event: Event) => {
      if (
        event instanceof KeyboardEvent &&
        event.key === 'Enter' &&
        !event.isComposing
      ) {
        await sendMessages()
      }
    })
    
    const btnEl = this.el.querySelector('.input .btn')
    btnEl?.addEventListener('click', async () => {
      await sendMessages()
    })

    const movieTitleEls = this.el.querySelectorAll<HTMLElement>('.movie-title')
    movieTitleEls.forEach(movieTitleEl => {
      movieTitleEl.addEventListener('click', async () => {
        const searchInputEl = document.querySelector<HTMLInputElement>('.search input')
        if (!searchInputEl) return
        const title = movieTitleEl.dataset.movieTitle || ''
        searchInputEl.value = title
        movieStore.state.searchText = title
        await searchMovies(1)
      })
    })

    // 가장 밑으로 스크롤
    this.el.querySelector('.chats ul')?.scrollTo(
      0, 
      this.el.querySelector('.chats ul')?.scrollHeight || 0
    )
    // input에 포커스
    inputEl?.focus()
  }
}
