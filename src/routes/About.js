import { Component } from '../core/heropy'
import aboutStore from '../store/about'

export default class About extends Component {
  render() {
    const { name, email, blog, github, image } = aboutStore.state

    this.el.classList.add('container', 'about')
    this.el.innerHTML = /* html */ `
      <div class="photo">
        <img src="${image}" alt="User Image">
      </div>
      <p class="name">${name}</p>
      <p>
        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=${email}" target="_blank">
          thesecon@gmail.com
        </a>
      </p>
      <p><a href="${github}" target="_blank">GitHub</a></p>
      <p><a href="${blog}" target="_blank">Blog</a></p>
    `
  }
}
