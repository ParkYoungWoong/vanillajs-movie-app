import { Store } from '../core/heropy'
import OpenAI from 'openai'

interface State {
  chatText: string
  messages: OpenAI.ChatCompletionMessageParam[]
  loading: boolean
}
const defaultMessages: OpenAI.ChatCompletionMessageParam[] = [
  { role: 'assistant', content: '좋아하는 영화 장르나 제목을 알려주세요.'}
]
const store = new Store<State>({
  chatText: '',
  messages: defaultMessages,
  loading: false
})

export default store
export const sendMessages = async () => {
  if (!store.state.chatText.trim()) return
  if (store.state.loading) return
  store.state.loading = true
  // 데이터 갱신을 확인하기 위해서 `.push()`가 아닌 할당 연산자 사용!
  store.state.messages = [
    ...store.state.messages,
    { role: 'user', content: store.state.chatText }
  ]
  try {
    const res = await fetch('/api/chatbot', {
      method: 'POST',
      body: JSON.stringify({
        messages: store.state.messages
      })
    })
    const message = await res.json()
    // 데이터 갱신을 확인하기 위해서 `.push()`가 아닌 할당 연산자 사용!
    store.state.messages = [
      ...store.state.messages,
      message
    ]
    store.state.chatText = ''
  } catch (error) {
    console.log('sendMessages error:', error)
  } finally {
    store.state.loading = false
  }
}
export const resetMessages = () => {
  store.state.messages = defaultMessages
}
