import { Store } from '../core/heropy'

interface State {
  [key: string]: unknown
  name: string
  email: string
  blog: string
  image: string
}

export default new Store<State>({
  name: 'HEROPY / ParkYoungWoong',
  email: 'thesecon@gmail.com',
  blog: 'https://heropy.blog',
  github: 'https://github.com/ParkYoungWoong',
  image: 'https://heropy.blog/css/images/logo.png'
})
