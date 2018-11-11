# API server

# 개요
1. 리엑트로 리스트 페이지 / 장바구니 페이지 제작 (로컬환경 구동)
2. API 서버 AWS로 구현
3. API 접속 url : http://54.180.92.204

## Github
```
// API
git clone https://github.com/CressZZ/beers_api.git

// Client(react)
git clone https://github.com/CressZZ/beers_api.git
```

## API
- 맥주목록 가져오기
`http://13.209.98.23:3000/beers/list/:tag`
```
 * params로 전달된 tag에 따라 맥주 리스트를 불러온다. 
 * 목록은 일치하는 태그가 많은 순으로 정렬함
 * @param {string} tag // ex) 'A_BG_C_BK'

 * 200 OK {array-json} 맥주리스트 객체

```

- 장바구니 목록 가져오기
`http://13.209.98.23:3000/cart/:tag`
```
 * @param {number} userId 유저 아이디

 * 200 OK {result:"장바구니 조회 성공", status:200, cart:cart}
```

- 장바구니 추가/삭제 하기
`http://13.209.98.23:3000/cart/:action/:userId/:beerId/:cnt`

```
 * @param {string} action 카트 액션 'plus' or 'minus'  
 * @param {number} userId 상품 id 
 * @param {number} beerId 상품 id 
 * @param {number} cnt 장바구니에 담을 갯수

 * 200 OK {result:"장바구니 추가 성공"}

```

- 장바구니 리셋하기 
`http://localhost:3001/cart/reset/:userId`

```
 * @param {number} userId 

 * 200 OK {result:"장바구니 비우기 성공", status:200}

```


- 구매하기 `POST`:
`http://13.209.98.23:3000/purchase/:tag`
```
 *  data{
 *      {object} beer, 
 *      {number} userId, 
 *      {number} cnt, 
 *      {number{ totalPrice
 *  }

 200 OK
 {'구매 성공', status:200, totalCount:cnt, totalPrice:totalPrice}

```

- 태그 목록 가져오기
`http://13.209.98.23:3000/tags/list/`

## 과제 조건에서 제거하고, 추가한 부분
### 맥주목록 가져오기
```js
[{
    id: number, 
    name: string, 
    image: string, 
    tags: [{
        // key: string, // 제거
        name: string 
    },
    price: number,
    stock: number, 
 
    }
    , ...]
```

## note
- config/database.js 는 서버와 로컬환경이 각각 다르기 때문에 `.gitignore` 에 추가함
