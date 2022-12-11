import App from './App'
import router from './routes'

const root = document.querySelector('#root')
root?.append(new App().el)

// 루트 요소를 등록한 후에 실행해야 하는 플러그인!
router()
