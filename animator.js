"use strict";
class AnimatorSDK {
	onions = true
	constructor(canvas) {
		/** @type {{x:number,y:number,r:number}[][]} */
		this.frames = [];
		this.rect = {
			x: 0, y: 0, w: canvas.width, h: canvas.height
		};
	}
	newFrame(index) {
		let frame = [];

		this.frames.splice(
			index ?? this.frames.length
			, 0, frame
		)	
	}

	drawFrame(index, color) {
		if (!this.frames[index]) {
			return
		}
		gfx.clearBackground()

		if (this.onions) {
			this.drawOnion(index)
		}
		this._draw(index, color)
	}
	/**
	 * 
	 * @param {number} index 
	 * @param {{x:number,y:number,r:number}} point
	 */
	paint(index, point) {
		
		if(this.frames[index]){
			this.frames[index].push({x:point.x ,y:point.y,r: point.r})
		}

	}
	clearFrame(index) {
		let frame = [];
		this.frames[index] = frame
	}
	drawOnion(index, amount) {
		let red = {
			r: 255, g: 0, b: 0, a: 100
		}
		let green = {
			r: 0, g: 255, b: 0, a: 100
		}

		this._draw(index - 1, red)
		this._draw(index + 1, green)
	}

	_draw(index, color) {
		if(this.frames[index]){
			this.frames[index].forEach((p)=>{
				gfx.drawCircle({
					x: p.x,
					y: p.y,
					r: p.r
				}, color)
			})
		}
	}
	async render(fps) {

		let cam = new CanvasToWebm(gfx._canvas)
		let white = {
			r:255,g:255,b:255,a:255
		}
		let rect = {
			x:0,y:0,w:gfx._canvas.width,h:gfx._canvas.height
		}

		cam.start()

		this.onions = false
		for (let i = 0; i < this.frames.length; i++) {
			gfx.clearBackground()
			gfx.drawRect(rect,white)
			this._draw(i)
			await delay(1000 / fps)
		}

		cam.stop()

	}
	export(){
		//TODO export as json
	}
	import(){
		//TODO import json
	}
}

function delay(time) {
	return new Promise(resolve => setTimeout(resolve, time));
} 

function hexToRGB(hexcolor){
	return {
		r: parseInt(`${hexcolor[1]}${hexcolor[2]}`,16),
		g: parseInt(`${hexcolor[3]}${hexcolor[4]}`,16),
		b: parseInt(`${hexcolor[5]}${hexcolor[6]}`,16),
		a: 255,
	}
}