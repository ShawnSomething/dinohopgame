const spaceElem = document.querySelector("[data-space]")
const JUMP_SPEED = 0.45
const GRAVITY = 0.011
const SPACE_FRAME_COUNT = 2
const FRAME_TIME = 120

let isJumping
let spaceFrame
let currentFrameTime
export function setupSpace() {
    isJumping = false
    spaceFrame = 0
    currentFrameTime = 0
}

export function updateSpace(delta, speedScale) {
    handleRun(delta, speedScale)
    handleJump(delta)
}

function handleRun(delta, speedScale) {
    if (isJumping) {
        spaceElem.src = '/space boi idle.png'
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

}