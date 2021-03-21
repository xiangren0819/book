# nice to meet you
1. 使用以下 API
### List Books [GET] `https://fe-interview-api.unnotech.com/books`

**Request**

```bash
curl -H "Accept: application/json" -H "Content-Type: application/json" -X GET https://fe-interview-api.unnotech.com/books
```

**Response 200**

```js
[
  {
    id: 1,
    name: "Flutter/Dart 跨平台 App 開發實務入門",
    image: "https://cf-assets2.tenlong.com.tw/products/images/000/157/608/medium/ACL060200.jpg?1613558091"
  },
  // ...
]
```

### Single Book [GET] `https://fe-interview-api.unnotech.com/books/:bookId`

**Request**

```bash
curl -H "Accept: application/json" -H "Content-Type: application/json" -X GET https://fe-interview-api.unnotech.com/books/1
```

**Response 200**

```js
{
  id: 1,
  name: "Flutter/Dart 跨平台 App 開發實務入門",
  image: "https://cf-assets2.tenlong.com.tw/products/images/000/157/608/medium/ACL060200.jpg?1613558091"
}
```

### Add Book [Post] `https://fe-interview-api.unnotech.com/books`

**Request**

```bash
curl -H "Accept: application/json" -H "Content-Type: application/json" -X GET https://fe-interview-api.unnotech.com/books
```

**Response 200**

```js
{
  name: "Flutter/Dart 跨平台 App 開發實務入門",
  image: "https://cf-assets2.tenlong.com.tw/products/images/000/157/608/medium/ACL060200.jpg?1613558091"
}
```

### Book Detail [GET] `https://fe-interview-api.unnotech.com/profile/:bookId`

**Request**

```bash
curl -H "Accept: application/json" -H "Content-Type: application/json" -X GET https://fe-interview-api.unnotech.com/profile/1
```

**Response 200**

```js
{
  id: 1,
  price: 200,
  count: 20
}
```

### Patch Book Detail [GET] `https://fe-interview-api.unnotech.com/profile/:bookId`

**Request**

```bash
curl -X PATCH -H "Content-Type: application/json" -d '{"price": 300}' "https://fe-interview-api.unnotech.com/profile/1"
```

**Response 200**

```js
{
  id: 1,
  price: 300,
  count: 20
}
```
2. 使用[React Native](https://facebook.github.io/react-native/), [React Navigation](https://reactnavigation.org/), 以及上述 API構建一個簡單的 App。包括三個頁面：
* [圖書列表](https://i.imgur.com/yF21CqS.png)
* [圖書詳情](https://i.imgur.com/U6n7Ci8.png)
* [增加或編輯圖書](https://i.imgur.com/GELu336.png)
  
3. 以 Pull-Request 的方式將代碼提交。

## 進階要求
1. 使用 [Redux](https://github.com/reduxjs/redux)。
2. 將[圖書列表]頁面加載更多的按鈕功能改為滾動實現。
