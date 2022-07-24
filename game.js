let canvas = document.querySelector("#ctx");
let gfx = jwf(canvas);
/**@type {HTMLButtonElement} */
let renderBTN = document.querySelector("#render")
let fpsInput = document.querySelector("#fps")
fpsInput.value = 12

function handlePreviousFrame(){
	if(frameIndex.value > 0)
	{
		frameIndex.value--
		frameIndex.e.textContent = `index: ${frameIndex.value}`
	
		animator.drawFrame(frameIndex.value)
	}
}

let canvasRect = canvas.getBoundingClientRect()
canvasRect.w = canvasRect.width
canvasRect.h = canvasRect.height

function isInsideDrawingCanvas(point){
	return jwCL.checkCollisionPointRec(point,canvasRect)
}

function handleNextFrame(){
	if(!animator.frames[frameIndex.value + 1]){
		return
	}

	frameIndex.value++
	frameIndex.e.textContent = `index: ${frameIndex.value}`

	animator.drawFrame(frameIndex.value)
}

function handleChangeFrame(index){
	if(!animator.frames[index]){
		return
	}

	frameIndex.value = index
	frameIndex.e.textContent = `index: ${frameIndex.value}`

	animator.drawFrame(index)
}

function refreshHud(){
	frameCount.value = animator.frames.length
	frameCount.e.textContent = `Frames: ${frameCount.value}`
	frameIndex.e.textContent = `index: ${frameIndex.value}`
}

function createFrameOnNextIndex(){
	animator.newFrame(frameIndex.value + 1)
	handleNextFrame()
	refreshHud()
}

function createFrameOnLastIndex(){
	animator.newFrame()
	handleChangeFrame(animator.frames.length -1)
	refreshHud()
}

document.addEventListener('keydown',(ke)=>{

	let prevent = false

	if(keybinds.previousFrame.includes(ke.key)){
		if(ke.altKey){
			handleChangeFrame(0)
		}
		else{
			handlePreviousFrame()
		}
		prevent = true
	}
	else if(keybinds.nextFrame.includes(ke.key)){
		if(ke.altKey){
			handleChangeFrame(animator.frames.length -1)
		}
		else{
			handleNextFrame()
		}
		prevent = true
	}
	else if(keybinds.createFrameNext.includes(ke.key)){
		if(ke.altKey){
			createFrameOnLastIndex()
		}else{
			createFrameOnNextIndex()
		}
	}
	else if(keybinds.clearFrame.includes(ke.key))
	{
		animator.clearFrame(frameIndex.value)
		animator.drawFrame(frameIndex.value)

		prevent = true
	}
	else if(keybinds.toogleOnion.includes(ke.key)){
		animator.onions = !animator.onions
		animator.drawFrame(frameIndex.value)

		prevent = true
	}

	if(prevent)
	{
		ke.preventDefault()
	}

})


function paint(){
	animator.paint(frameIndex.value, cursor)	
}

document.addEventListener('pointermove',(me)=>{
	let rect = canvas.getBoundingClientRect()
	cursor.x = me.x - rect.x
	cursor.y = me.y - rect.y

	cursor.r = jwML.lerp(cursor.size /2,cursor.size *2, me.pressure)
})

document.addEventListener('wheel',(we)=>{
	cursor.size -= we.deltaY * 0.01
	
	if(cursor.size < 1 ) cursor.size = 1
	cursor.txt.textContent = `Brush size: ${cursor.size}`
})

document.addEventListener('pointercancel',(me)=>{
	me.preventDefault()
	cursor.down = false
})

window.addEventListener('contextmenu', (event) => {
  event.preventDefault()
})

document.addEventListener('pointerup',(me)=>{
	me.preventDefault()

	animator.drawFrame(frameIndex.value)

	cursor.down = false
})
document.addEventListener('pointerdown',(me)=>{
	if(isInsideDrawingCanvas(me)){
		me.preventDefault()
		cursor.down = true	
	}
})

renderBTN.addEventListener('click',(e)=>{
	animator.render(fpsInput.value)
})

let animator = new AnimatorSDK(canvas)

let frameCount = {
	value: 0,
	e: document.querySelector("#index")
}
let frameIndex = {
	value: 0,
	e : document.querySelector("#count")
}

let gray = {r:100,g:100,b:100,a:100}
let black = {r:0,g:0,b:0,a:255}
let white = {r:255,g:255,b:255,a:255}

let cursor = {
	x: 0,
	y: 0,
	r: 5,
	down: false,
	size: 5,
	txt: document.querySelector("#size")
}

createFrameOnLastIndex()

setInterval(() => {
	
	if(cursor.down)
	{
		paint()
		gfx.drawCircle(cursor)
	}

}, 1);