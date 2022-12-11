import { Store } from '../core/heropy'

interface State {
  photo: string
  name: string
  email: string
  blog: string
  github: string
  repository: string
}

export default new Store<State>({
  photo: 'https://heropy.blog/css/images/logo.png',
  name: 'HEROPY / ParkYoungWoong',
  email: 'thesecon@gmail.com',
  blog: 'https://heropy.blog',
  github: 'https://github.com/ParkYoungWoong',
  repository: 'https://github.com/ParkYoungWoong/vanillajs-movie-app'
})
