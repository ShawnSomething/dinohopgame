import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomProperty.js"

const spaceElem = document.querySelector("[data-space]")
const JUMP_SPEED = 0.45
const GRAVITY = 0.0014
const SPACE_FRAME_COUNT = 2
const FRAME_TIME = 120

let isJumping
let spaceFrame
let currentFrameTime
let yVelocity
export function setupSpace() {
    isJumping = false
    spaceFrame = 0
    currentFrameTime = 0
    yVelocity = 0
    setCustomProperty(spaceElem, "--bottom", 0  )
    document.removeEventListener("keydown", onJump)
    document.addEventListener("keydown", onJump)

}

export function updateSpace(delta, speedScale) {
    handleRun(delta, speedScale)
    handleJump(delta)
}  

export function getSpaceRect() {
    return spaceElem.getBoundingClientRect()
}

export function setSpaceLose () {
    spaceElem.src = '/space boi lose.png'
}

function handleRun(delta, speedScale) {
    if (isJumping) {
        spaceElem.src = '/space boi jump.png'
        return
    }
    
    if (currentFrameTime >= FRAME_TIME) {
       spaceFrame = (spaceFrame + 1) % SPACE_FRAME_COUNT
       spaceElem.src = `/spaceboi-run-${spaceFrame}.png`
       currentFrameTime -= FRAME_TIME
    }
    currentFrameTime += delta * speedScale
}

function handleJump(delta) {
    if (!isJumping) return

    incrementCustomProperty (spaceElem, "--bottom", yVelocity * delta)
    
    if (getCustomProperty(spaceElem, "--bottom") <=0) {
        setCustomProperty (spaceElem, "--bottom", 0)
        isJumping = false
    }

    yVelocity -= GRAVITY * delta

}


function onJump(e) {
    if (e.code !== "Space" || isJumping) return 

    yVelocity = JUMP_SPEED
    isJumping = true

}
