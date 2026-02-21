import { glider } from "./public/patterns/glider.js";
import { pulsar } from "./public/patterns/pulsar.js";
import { pentomino } from "./public/patterns/pentomino.js";
import { gosper } from "./public/patterns/gosper.js";
import { blank } from "./public/patterns/blank.js";
import { puffertrain } from "./public/patterns/puffertrain.js";
import { boatmaker } from "./public/patterns/boatmaker.js";
import { slidegun } from "./public/patterns/slidegun.js";
import { sombreros } from "./public/patterns/sombreros.js";
import { spacerake } from "./public/patterns/spacerake.js";

const patterns = [glider, pulsar, pentomino, gosper, blank, puffertrain, boatmaker, slidegun, sombreros, spacerake]

const parseTerms = q => {
    if (!q) return []
    if (Array.isArray(q)) return q.map(t => t.toLowerCase().trim()).filter(Boolean)
    return q.split(',').map(t => t.toLowerCase().trim()).filter(Boolean)
}

const matchesQuery = (p, q) => {
    const terms = Array.isArray(q) ? q : parseTerms(q)
    if (!terms.length) return false
    return terms.every(term => {
        if (!term) return true
        if (p.title && p.title.toLowerCase().includes(term)) return true
        if (p.description && p.description.toLowerCase().includes(term)) return true
        if (p.searchTerms && p.searchTerms.some(t => t.toLowerCase().includes(term))) return true
        if (p.tags && p.tags.some(t => t.toLowerCase().includes(term))) return true
        return false
    })
}

const renderResults = list => {
    const out = document.getElementById('featuredOutput')
    if (!out) return
    out.innerHTML = ''
    if (!list.length) {
        out.innerHTML = '<p>No results</p>'
        return
    }
    list.forEach(p => {
        const card = document.createElement('div')
        card.className = 'pattern-card'
        const title = document.createElement('h3')
        title.innerText = p.title || 'Untitled'
        const desc = document.createElement('p')
        desc.innerText = p.description || ''
        const btn = document.createElement('button')
        btn.innerText = 'Open in Maker'
        btn.addEventListener('click', () => {
            try { localStorage.setItem('selectedPattern', JSON.stringify(p)) } catch (e) {}
            window.location.href = './public/index.html'
        })
        card.appendChild(title)
        card.appendChild(desc)
        card.appendChild(btn)
        out.appendChild(card)
    })
}

const randomFeatured = () => {
    const idx = Math.floor(Math.random() * patterns.length)
    renderResults([patterns[idx]])
}

window.addEventListener('DOMContentLoaded', () => randomFeatured())
