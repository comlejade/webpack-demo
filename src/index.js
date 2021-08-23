// import './style.css'
// import { sum } from './math'

// import Img1 from './1.jpg'
// import Img2 from './2.jpg'

// const img1 = document.createElement('img')
// const img2 = document.createElement('img')
// const div1 = document.createElement('div')
// div1.className = 'test'
// div1.innerHTML = 'test test test'
// img1.src = Img1
// img2.src = Img2

// const app = document.getElementById('app')

// app.appendChild(img1)
// app.appendChild(img2)
// app.appendChild(div1)

// console.log(sum(1, 2))

// setTimeout(() => {
//   import('./dynamic-data.js').then(res => {
//     console.log(res.default) // {message: "this is a message"}
//   })
// }, 1000)

// import moment from 'moment'
// import 'moment/locale/zh-cn'  // 手动引入中文语言包
// // import $ from './jquery.min'
// import { sum } from './math'

// moment.locale('zh-cn')

// console.log(moment().format('ll'))

// // console.log($('#app'))
// console.log(sum(1, 3))

// console.log('1234')

// if (module.hot) {
//   module.hot.accept()
// }

import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

ReactDOM.render(
  <App />,
  document.getElementById('app')
)