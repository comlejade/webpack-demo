import './style.css'

import Img1 from './1.jpg'
import Img2 from './2.jpg'

const img1 = document.createElement('img')
const img2 = document.createElement('img')
const div1 = document.createElement('div')
div1.className = 'test'
div1.innerHTML = 'test test test'
img1.src = Img1
img2.src = Img2

const app = document.getElementById('app')

app.appendChild(img1)
app.appendChild(img2)
app.appendChild(div1)
