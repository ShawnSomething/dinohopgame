import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomProperty.js"

const SPEED = 0.05
const MONSTER_INTERVAL_MIN = 500
const MONSTER_INTERVAL_MAX = 2000
const worldElem = document.querySelector("[data-world]")

let nextMonsterTime
export function setupMonster() {
    nextMonsterTime = MONSTER_INTERVAL_MIN
    document.querySelectorAll("[data-monster]").forEach(monster => {
        monster.remove()
    })
}

export function updateMonster(delta, speedScale) {
    document.querySelectorAll("[data-monster]").forEach(monster => {
        incrementCustomProperty(monster, "--left", delta * speedScale * SPEED * -1)
        if (getCustomProperty(monster, "--left") <= -100) {
            monster.remove()
        }
    })  

    if(nextMonsterTime <= 0) {
        createMonster()
        nextMonsterTime = randomNumberBetween(MONSTER_INTERVAL_MIN, MONSTER_INTERVAL_MAX) / speedScale
    }
    nextMonsterTime -= delta
}

export function getMonsterRects() {
    return [...document.querySelectorAll('[data-monster]')].map(monster => {
        return monster.getBoundingClientRect()
    })
}

function createMonster() {
    const monster = document.createElement("img")
    monster.dataset.monster = true
    monster.src = '/monster.png'
    monster.classList.add("monster")
    setCustomProperty(monster, "--left", 100)
    worldElem.append(monster)
}

function randomNumberBetween (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}