import { glider } from "./patterns/glider.js";
import { pulsar } from "./patterns/pulsar.js";
import { pentomino } from "./patterns/pentomino.js";
import { gosper } from "./patterns/gosper.js";
import { blank } from "./patterns/blank.js";
import { puffertrain } from "./patterns/puffertrain.js";
import { boatmaker } from "./patterns/boatmaker.js";
import { slidegun } from "./patterns/slidegun.js";
import { sombreros } from "./patterns/sombreros.js";
import { spacerake } from "./patterns/spacerake.js";

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

const renderResults = results => {
    const out = document.getElementById('searchResults')
    out.innerHTML = ''
    results.forEach(p => {
        const card = document.createElement('div')
        card.className = 'patternCard'
        const title = document.createElement('h3')
        title.innerText = p.title || 'Untitled'
        const desc = document.createElement('p')
        desc.innerText = p.description || ''
        const btn = document.createElement('button')
        btn.innerText = 'Open in Maker'
        btn.addEventListener('click', () => { try { localStorage.setItem('selectedPattern', JSON.stringify(p)) } catch (e) {} window.location.href = './index.html' })
        card.appendChild(title)
        card.appendChild(desc)
        card.appendChild(btn)
        out.appendChild(card)
    })
}

const getQueryParam = name => new URLSearchParams(window.location.search).get(name) || ''

window.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('searchPageInput')
    const btn = document.getElementById('searchBtn')
    const q = getQueryParam('q')
    if (q) {
        if (input) input.value = q
        const results = patterns.filter(p => matchesQuery(p, q))
        renderResults(results)
    } else renderResults(patterns)
    if (btn && input) {
        btn.addEventListener('click', () => {
            const term = input.value.trim()
            const results = term ? patterns.filter(p => matchesQuery(p, term)) : patterns
            renderResults(results)
        })
        input.addEventListener('keydown', e => { if (e.key === 'Enter') btn.click() })
    }
})
