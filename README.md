# VanillaJS Movie App (TypeScript ver.)

OMDb API를 활용해 VanillaJS 영화 검색 애플리케이션을 만들어봅니다.  
이 프로젝트는 [JS 버전](https://github.com/ParkYoungWoong/vanillajs-movie-app/tree/js-only)과 [TS 버전](https://github.com/ParkYoungWoong/vanillajs-movie-app/tree/main)으로 나누어져 있습니다.  
기본 버전은 TS입니다.

[DEMO](https://vanilla-movie-5znvu8s4t-parkyoungwoong.vercel.app/#/)

![Screenshot](/screenshots/screenshot_demo.JPG)

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

### Heropy.js

JS Component(+ Router, Store)를 활용합니다.  
코드를 복사해서 프로젝트의 /src/core/heropy.ts|js 파일에 붙여넣고 시작하세요.  

[heropy.ts 코드](https://github.com/ParkYoungWoong/vanillajs-movie-app/blob/main/src/core/heropy.ts)
[heropy.js 코드](https://github.com/ParkYoungWoong/vanillajs-movie-app/blob/js-only/src/core/heropy.js)

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

## Vercel

node-fetch 패키지는 꼭 2버전으로 설치해야 합니다!

```bash
$ npm i -D vercel dotenv node-fetch@2
```

### 환경변수

개발용 서버에서 사용할 환경변수를 지정합니다.  
이후 Vercel 서비스에 배포할 때는 프로젝트의 __'Settings / Environment Variables'__ 옵션에서 환경변수를 지정해야 합니다!

__/.env__

```dotenv
APIKEY=<MY_OMDb_API_KEY>
```

![Screenshot](/screenshots/screenshot_vercel_environment.JPG)

### Vercel 구성 옵션

Vercel 서비스에 배포할 구성 옵션을 지정합니다.

__/vercel.json__

```json
{
  "devCommand": "npm run dev",
  "buildCommand": "npm run build"
}
```

### 서버리스 함수

APIKEY를 노출하지 않도록 서버리스 함수를 작성합니다.

__/api/movie.js__

```js
import fetch from 'node-fetch'

const { APIKEY } = process.env

export default async function handler(request, response) {
  const { title, page, id } = JSON.parse(request.body)
  const url = id
    ? `https://www.omdbapi.com/?apikey=${APIKEY}&i=${id}&plot=full`
    : `https://www.omdbapi.com/?apikey=${APIKEY}&s=${title}&page=${page}`
  const res = await fetch(url)
  const json = await res.json()
  response
    .status(200)
    .json(json)
}
```

## TypeScript

```bash
$ npm i -D typescript @types/node-fetch
```

__/tsconfig.json__ 파일을 만들고 TypeScript 구성 옵션을 지정합니다.

```json
{
  "compilerOptions": {
    "target": "ES2015",
    "module": "ESNext",
    "moduleResolution": "node",
    "jsx": "preserve",
    "strict": true,
    "esModuleInterop": true,
    "lib": ["ESNext", "DOM"]
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.d.ts",
    "api/**/*.ts"
  ]
}
```
