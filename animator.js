"use strict";
class AnimatorSDK {
	onions = true
	constructor(canvas) {
		
		//frames[frame][layer][point]
		/** @type {{x:number,y:number,r:number}[][][]} */
		/**
		 * frames[frame][layer][point]
		 * frames[frame][point]
		 * @type {{x:number,y:number,r:number}[][]}
		 */
		this.frames = [];
		this.rect = {
			x: 0, y: 0, w: canvas.width, h: canvas.height
		};
	}
	newFrame(index) {
		let frame = [];

		// for (let index = 0; index < 10; index++) {
		// 	frame.push([])
		// }

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
	paint(index, point, layer) {
		
		if(this.frames[index]){
			this.frames[index].push({x:point.x ,y:point.y,r: point.r})
			// this.frames[index][layer].push({x:point.x ,y:point.y,r: point.r})
		}
	}
	deleteFrame(index) {
		this.frames.splice(index,1)
	}
	clearFrame(index) {
		let frame = [];
		this.frames[index] = frame
	}
	cloneFrame(index){
		if(this.frames[index]){
			return Array.from(this.frames[index]) 
		}
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

		// if(this.frames[index]){
		// 	this.frames[index].forEach((layer)=>{
		// 		layer.forEach((p)=>{
		// 			gfx.drawCircle({
		// 				x: p.x,
		// 				y: p.y,
		// 				r: p.r
		// 			}, color)
		// 		})
		// 	})
		// }
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
	async playAnimation(fps){

		let white = {
			r:255,g:255,b:255,a:255
		}
		let rect = {
			x:0,y:0,w:gfx._canvas.width,h:gfx._canvas.height
		}

		for (let i = 0; i < this.frames.length; i++) {
			gfx.clearBackground()
			gfx.drawRect(rect,white)
			this._draw(i)
			await delay(1000 / fps)
		}

	}
	/**
	 * 
	 * @param {number} fps 
	 * @param {number} loop -1 = no loop, 0 = loop
	 */
	async render2gif(fps, loop){
		const gif = new GIF({
			workers: 2,
			quality: 10,
			width : gfx._canvas.width,
			height :gfx._canvas.height,
			workerScript: './gif/gif.worker.js',
			repeat: loop
		});

		this.onions = false

		let white = {
			r:255,g:255,b:255,a:255
		}
		let rect = {
			x:0,y:0,w:gfx._canvas.width,h:gfx._canvas.height
		}
		
		for (let i = 0; i < this.frames.length; i++) {
			gfx.clearBackground()
			gfx.drawRect(rect,white)
			this._draw(i)
			await delay(1000 / fps)

			gif.addFrame(gfx.gfx, {
				copy: true,
				delay: 1000 / fps
			});
		}

		gif.on('finished', function(blob) {

			const vid = document.createElement('image');
			vid.src = URL.createObjectURL(blob);

			document.body.appendChild(vid);
			const a = document.createElement('a');
			let time = new Date()
			
			a.download = `${time.getTime()}.gif`;
			a.href = vid.src;
			a.textContent = 'download the video';
			document.body.appendChild(a);
			a.click()
			document.body.removeChild(vid)
			document.body.removeChild(a)

			// window.open(URL.createObjectURL(blob));
		});
		
		gif.render();
		
	}
	erase(frameIndex,point){
		
		this.frames[frameIndex] = this.frames[frameIndex].filter((p)=>{
			return !jwCL.checkCollisionCircles(point,p)
		})
	}
	export(){
		//TODO export as json
		let blob = new Blob([JSON.stringify(this.frames)],{type: "application/json"})
		let url = URL.createObjectURL(blob)
		// window.open(url)
		let time = new Date()
		let a = document.createElement('a')
		a.href = url
		a.download = `${time.getTime()}.json`
		document.body.appendChild(a);
		a.click()
		document.body.removeChild(a)
	}
	import(json){
		//TODO import json
		this.frames = json
		this.drawFrame(0)
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