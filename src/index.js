import { homepage } from './homepage/homepage.js'
import { menu } from './menu/menu.js'
import { about } from './about/about.js'
import './index.css'

const handleNavClick = () => {
    const nav = document.getElementById('nav');
    const content = document.getElementById('content')
    content.innerHTML = ''
    nav.addEventListener('click', (e) => {
        if (e.target.id === 'home') {
            homepage()
        } else if (e.target.id === 'menu') {
            menu()
        } else if (e.target.id === 'about') {
            about()
        }
    })
}

handleNavClick();