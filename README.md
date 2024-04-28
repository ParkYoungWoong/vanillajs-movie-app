# Movie App (TypeScript + AI Chat Bot)

OMDb API를 활용해 VanillaJS 영화 검색 애플리케이션을 만들어봅니다.  
이 프로젝트는 ['JS' 버전](https://github.com/ParkYoungWoong/vanillajs-movie-app/tree/js-only)과 ['TS' 버전](https://github.com/ParkYoungWoong/vanillajs-movie-app/tree/main) 그리고 ['TS + AI 챗봇' 버전](https://github.com/ParkYoungWoong/vanillajs-movie-app/tree/openai)으로 나누어져 있습니다.  
기본 버전은 'TS AI 챗봇'입니다.

[DEMO](https://vanilla-movie-app.vercel.app/#/)

![Screenshot](/screenshots/screenshot_demo2.png)

### ❗공지사항❗

__2024년 4월 10일__

OpenAI API를 사용하기 위해 설치하는 모듈(`openai`)의 내부 타입 에러가 발생하지 않도록, 다음과 같이 Vercel 패키지를 최신으로 업데이트해야 합니다.

```bash
$ npm i -D vercel@latest
```

새롭게 추가할 OpenAI API Key 환경변수와 구분하기 위해, 기존의 `APIKEY` 환경변수의 이름을 `OMDB_API_KEY`로 변경했습니다.

`node-fetch` 패키지가 3버전으로 업데이트되면서, 타입스크립트를 내장하는 것으로 변경되었습니다.  
따라서 강의에서 소개하는 `@types/node-fetch` 패키지는 설치하지 않아도 됩니다.

__2023년 4월 27일__

Vercel Serverless Functions가 정상적으로 동작하기 위해 `package.json` 파일의 `type` 옵션을 요구하게 되었습니다.  
`package.json` 파일에 다음과 같이 `"type": "module"` 옵션을 추가하세요.

```json
{
  "type": "module",
}
```

__2023년 4월 23일__

영화 검색 후 'View More..' 버튼이 보일 때, 다른 영화를 새롭게 검색해서 결과를 출력할 수 없는 경우에 'View More..' 버튼이 사라지지 않는 버그가 있습니다.  
이는 `pageMax` 상태를 초기화하지 않아서 발생하는 문제이기 때문에, 다음과 같이 `src/store/movie.ts` 파일의 `searchMovies` 함수 내용에서 해당 초기화 코드를 추가해야 합니다!

```ts
if (Response === 'True') { // 77번째 줄
  store.state.movies = [
    ...store.state.movies,
    ...Search
  ]
  store.state.pageMax = Math.ceil(Number(totalResults) / 10)
} else {
  store.state.message = Error
  store.state.pageMax = 1 // 85번째 줄, 버그 수정을 위해 새롭게 추가된 코드!
}
```

### 프로젝트 시작하기

```bash
$ npm i
$ npm run vercel
```

### Reset.css

브라우저의 기본 스타일을 초기화합니다.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reset-css@5.0.1/reset.min.css" />
```

### Google Fonts

[Oswald](https://fonts.google.com/specimen/Oswald?query=oswa), [Roboto](https://fonts.google.com/specimen/Roboto?query=robo) 폰트를 사용합니다.

```html
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@500&family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
```

### Headline.js HTML 

```html
<h1>
  <span>OMDb API</span><br />
  THE OPEN<br />
  MOVIES DATABASE
</h1>
<p>
  The OMDb API is a RESTful web service to obtain movie information,
  all content and images on the site are contributed and maintained by our users.<br />
  If you find this service useful, please consider making a one-time donation or become a patron.
</p>
```

## Vercel Hosting

`node-fetch` 패키지는 꼭 2버전으로 설치해야 합니다!

```bash
$ npm i -D vercel dotenv
$ npm i node-fetch@2
```

__/vercel.json__

```json
{
  "devCommand": "npm run dev",
  "buildCommand": "npm run build"
}
```

__/package.json__

```json
{
  "scripts": {
    "vercel": "vercel dev"
  }
}
```

### Vercel 개발 서버 실행

Vercel 구성 이후에는 `npm run dev`가 아닌 `npm run vercel`로 개발 서버를 실행해야 합니다!

```bash
$ npm run vercel
```

## Vercel Serverless Functions

프로젝트 루트 경로에 `/api` 폴더를 생성하고,   
API Key 를 노출하지 않도록 서버리스 함수를 작성합니다.

__/api/movie.ts__

```ts
import { VercelRequest, VercelResponse } from '@vercel/node'
import fetch from 'node-fetch'

const { OMDB_API_KEY } = process.env

export default async function handler(request: VercelRequest, response: VercelResponse) {
  const { title, page, id } = JSON.parse(request.body as string)
  const url = id
    ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}&plot=full`
    : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&page=${page}`
  const res = await fetch(url)
  const json = await res.json()
  response
    .status(200)
    .json(json)
}

```

### 환경변수

로컬의 개발용 서버에서 사용할 환경변수를 `.env` 파일에 지정합니다.

__/.env__

```dotenv
OMDB_API_KEY=<MY_OMDb_API_KEY>
```

제품 서버(Vercel 서비스)에서 사용할 환경변수를 지정합니다.  
Vercel 서비스의 프로젝트 __'Settings / Environment Variables'__ 옵션에서 다음과 같이 환경변수를 지정합니다.

![Screenshot](/screenshots/screenshot_vercel_environment.JPG)

## TypeScript

타입스크립트 코어 패키지를 설치하고 `tsconfig.json` 파일에 기본적인 구성을 추가합니다.

```bash
$ npm i -D typescript
```

__/tsconfig.json__

```json
{
  "compilerOptions": {
    "target": "ES2015",
    "module": "ESNext",
    "lib": ["ESNext", "DOM"],
    "strict": true,
    "moduleResolution": "node",
    "esModuleInterop": true
  },
  "include": [
    "src/**/*.ts",
    "api/**/*.ts"
  ]
}
```

### JS 프로젝트가 없는 경우

타입스크립트를 시작할 기존의 JS 프로젝트를 가지고 있지 않다면, 다음과 같이 진행하세요!  
진행이 끝나면, 루트 경로에 `.env` 파일을 생성하고 `OMDB_API_KEY` 환경변수를 지정해야 합니다!

```bash
# 원하는 터미널 경로에서 완성된 프로젝트를 클론합니다.
$ git clone https://github.com/ParkYoungWoong/vanillajs-movie-app.git

# 클론한 프로젝트 폴더로 이동합니다.
$ cd vanillajs-movie-app

# 브랜치를 변경합니다.
$ git checkout typescript_starter

# Git 버전 관리 내역을 초기화합니다.
## macOS
$ rm -rf .git
## Windows
$ rmdir /s /q .git

# NPM 패키지를 설치합니다.
$ npm i
```

## OpenAI API

ChatGPT로 잘 알려진 OpenAI의 API를 사용해 영화 정보를 제공하는 쳇봇을 만들어봅니다.  
[OpenAI API](https://openai.com/blog/openai-api)를 사용하기 위해, [`openai` 패키지](https://github.com/openai/openai-node)를 설치합니다.

```bash
$ npm i openai
```

### Fine-tuning

파인튜닝(Fine-tuning)은 결과 개선을 위해 모델을 특정 데이터셋에 맞게 조정하는 작업입니다.  
영화 제목으로 빠른 검색이 가능하도록, 다음과 같이 답변 방식을 조정합니다.

```ts
const fineTunedMessages: OpenAI.ChatCompletionMessageParam[] = [
  { role: 'system', content: '너는 영화 정보를 알려주는 챗봇이야! 어떤 방식으로든 답변에서의 영화 제목은 항상 {{한글제목//소문자영어제목}}(출시년도) 처럼 {{}} 기호로 제목을 묶어 // 기호로 한글과 영어 제목을 구분하고 () 기호로 영화의 출시년도를 표시해 줘! 그리고 영화의 한글 제목이 정확하지 않다면, 억지로 지어내지 말고 {{abc xyz}}(1234) 처럼 영어 제목만 표시해 줘.' },
  { role: 'assistant', content: '영화 {{기생충//parasite}}(2019)은 국제적으로 큰 주목을 받은 봉준호 감독 작품이에요. 현실적이면서도 예술적인 연출과 뛰어난 연기력으로 많은 관객들의 호응을 얻은 작품이죠.' },
  { role: 'assistant', content: '{{씽//sing}}(2016)은 코믹하면서도 감동적인 이야기로 관객들을 웃음 속으로 이끄는 애니메이션 영화입니다.' },
  { role: 'assistant', content: '{{존 윅//john wick}}(2014) 시리즈를 추천해요! 액션 신에서 배우 키아누 리브스가 매혹적인 액션 연기를 펼치는 영화로, 스타일리시한 액션과 복수의 이야기가 잘 어우러져 있어요.' },
  { role: 'assistant', content: '물론이죠! 퓨리오사 역으로 출연한 샤를리즈 테론의 영화로는 {{몬스터//monster}}(2003)와 {{매드 맥스: 분노의 도로//mad max: fury road}}(2015) 등이 있어요.' },
  { role: 'assistant', content: '가벼운 분위기의 영화를 추천해드릴게요. {{비커밍 제인//becoming jane}}(2007)는 제인 오스트렌의 청춘 시절을 다룬 멜로 영화로, 사랑과 운명을 그려낸 로맨틱한 작품이에요.' },
  { role: 'assistant', content: '한국에서 제작된 공포 및 스릴러 장르의 작품으로, 봉준호 감독이 연출한 {{괴물//the host}}(2006) 영화를 추천합니다. 한강을 배경으로 한 괴물의 출현과 이로 인한 사건을 중심으로 가족의 사랑과 희생을 그려내고 있습니다.' },
  { role: 'assistant', content: '크리스토퍼 놀란 감독이 연출한 {{인터스텔라//interstellar}}(2014) 과학과 인간 정서를 균형 있게 결합한 공상 과학 장르의 대표작입니다.' },
  { role: 'assistant', content: '{{아마데우스//amadeus}}(1984)를 추천해요. 밀로스 포먼 감독이 연출한 이 영화는 능력 있는 두 음악가, 볼프강 아마데우스 모차르트와 안토니오 살리에리의 관계를 중심으로 펼쳐지는 드라마입니다.' },
  { role: 'assistant', content: '{{반도//peninsula}}(2020)를 추천해드릴게요. 이 영화는 좀비로 인한 대재앙 이후를 그린 액션 스릴러 작품으로, 긴장감 넘치는 전투와 스릴을 즐길 수 있어요.' },
  { role: 'assistant', content: '매트릭스 시리즈는 현재까지 총 3편으로 이루어져 있어요. {{매트릭스//the matrix}}(1999)는 사이버 퓨처와 현실 사이의 모순에 관한 기발한 아이디어의 인상적인 작품이에요. {{매트릭스 리로디드//the matrix reloaded}}(2003)는 첫 번째 영화의 이야기를 이어받아 전개되는 작품이에요. {{매트릭스 레볼루션//the matrix revolutions}}(2003)은 매트릭스 시리즈의 마지막 작품으로, 복잡한 플롯과 화려한 시각 효과가 돋보이는 작품이에요.' }
]
```
