# API server

## 조건에서 제거하고, 추가한 부분
### 맥주목록 가져오기
```js
[{
    id: number, 
    name: string, 
    image: string, 
    tags: [{
        // key: string, // 제거. 사용하는 곳 없음
        name: string 
    },
    price: number,
    stock: number, 
 
    }
    , ...]
```

## note
- config/database.js 는 서버와 로컬환경이 각각 다르기 때문에 `.gitignore` 에 추가함

## 작업로그
- tags 관련 API를 만들 때 branch를 만들어야 겠다는 생각에 git brnch 작업 시작
