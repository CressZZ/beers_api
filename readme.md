# API server
## API
- 맥주목록 가져오기
`http://13.209.98.23:3000/beers/list/:tag`
```
 * params로 전달된 tag에 따라 맥주 리스트를 불러온다. 
 * 목록은 일치하는 태그가 많은 순으로 정렬함
 * @param {string} tag // ex) 'A_BG_C_BK'
 * @return {array-json} 맥주리스트 객체

```

- 장바구니 목록 가져오기
`http://13.209.98.23:3000/cart/:tag`
```
 * @param {number} userId 유저 아이디
 * @param {object} {result:"장바구니 조회 성공", status:200, cart:cart}
```

- 장바구니 추가/삭제 하기
`http://13.209.98.23:3000/cart/:action/:userId/:beerId/:cnt`

```
 * @param {string} action 카트 액션 'plus' or 'minus'  
 * @param {number} userId 상품 id 
 * @param {number} beerId 상품 id 
 * @param {number} cnt 장바구니에 담을 갯수
 * @return {object} // {result:"장바구니 추가 성공"}

```

- 장바구니 리셋하기 
`http://localhost:3001/cart/reset/:userId`

```
 * @param {number} userId 
 * @return {object} {result:"장바구니 비우기 성공", status:200}

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
