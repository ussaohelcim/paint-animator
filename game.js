/**@type {HTMLCanvasElement} */
let canvas = document.querySelector("#ctx");
let gfx = jwf(canvas);
/**@type {HTMLButtonElement} */
let renderBTN = document.querySelector("#render")
let renderGifBTN = document.querySelector("#render2Gif")
/**@type {HTMLInputElement} */
let loopCheckBox = document.querySelector("#loopGif")

// let importFileINPUT = document.querySelector("#import")
// /**@type {HTMLButtonElement} */
// let exportBTN = document.querySelector("#export")

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

function handleCloneFrame(){
	animator.newFrame(frameIndex.value + 1)
	animator.frames[frameIndex.value + 1] = animator.cloneFrame(frameIndex.value)
	handleNextFrame()
	refreshHud()
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
	else if(keybinds.cloneFrame.includes(ke.key)){
		handleCloneFrame()
		prevent = true
	}
	else if(keybinds.playAnimation.includes(ke.key)){
		animator.playAnimation(fpsInput.value)
	}
	else if(keybinds.decreaseBrushSize.includes(ke.key)){
		cursor.size--
		if(cursor.size < 1 ) cursor.size = 1
		cursor.txt.textContent = `Brush size: ${cursor.size}`
	}
	else if(keybinds.increaseBrushSize.includes(ke.key)){
		cursor.size++
		cursor.txt.textContent = `Brush size: ${cursor.size}`
	}
	else if(keybinds.exportAnimation.includes(ke.key)){
		animator.export()
	}
	if(prevent)
	{
		ke.preventDefault()
	}

})

function paint(){
	animator.paint(frameIndex.value, cursor)	
}

function erase(){
	animator.erase(frameIndex.value, cursor)
}

document.addEventListener('wheel',(we)=>{
	cursor.size -= we.deltaY * 0.01
	
	if(cursor.size < 1 ) cursor.size = 1
	cursor.txt.textContent = `Brush size: ${cursor.size}`
})

document.addEventListener('pointercancel',(me)=>{
	me.preventDefault()
	cursor.down = false
	cursor.eraser = false
})

document.addEventListener('pointerup',(me)=>{
	me.preventDefault()

	animator.drawFrame(frameIndex.value)
	cursor.eraser = false
	cursor.down = false
})

canvas.addEventListener('contextmenu', (event) => {
  event.preventDefault()
})

canvas.addEventListener('pointermove',(me)=>{
	let rect = canvas.getBoundingClientRect()
	cursor.x = me.x - rect.x
	cursor.y = me.y - rect.y

	cursor.r = jwML.lerp(cursor.size /2,cursor.size *2, me.pressure)
})

canvas.addEventListener('pointerdown',(me)=>{
	me.preventDefault()
	
	if(me.button === 2){
		// animator.erase(frameIndex.value,cursor)
		// return
		cursor.eraser = true
	}
	cursor.down = true	
})

// renderBTN.addEventListener('click',(e)=>{
// 	animator.render(fpsInput.value)
// })

function onDragImport(e){
	e.preventDefault()
}

/**@param {DragEvent} e */
async function onDropImport(e){
	e.preventDefault()
	let a = e.dataTransfer.items[0].getAsFile()
	let s = await a.text()
	
	if(confirm("Are you sure you want to delete this animation and import your file?")){
		animator.import(JSON.parse(s))
	}
}

renderGifBTN.addEventListener('click',(e)=>{
	animator.render2gif(fpsInput.value,loopCheckBox.checked ? 0 : -1 )
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

// exportBTN.addEventListener('click',(e)=>{
// 	animator.export()
// })

let gray = {r:100,g:100,b:100,a:100}
let black = {r:0,g:0,b:0,a:255}
let white = {r:255,g:255,b:255,a:255}

let cursor = {
	x: 0,
	y: 0,
	r: 5,
	down: false,
	eraser: false,
	size: 5,
	txt: document.querySelector("#size")
}

createFrameOnLastIndex()

setInterval(() => {
	
	if(cursor.down && !cursor.eraser)
	{
		paint()
		gfx.drawCircle(cursor)
	}
	else if(cursor.down && cursor.eraser){
		erase()
		gfx.drawCircle(cursor,white)
	}

}, 1);