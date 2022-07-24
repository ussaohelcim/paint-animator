"use strict";
class AnimatorSDK {
	onions = true
	constructor(canvas) {
		this.frames = [];
		this.rect = {
			x: 0, y: 0, w: canvas.width, h: canvas.height
		};
	}
	newFrame(index) {

		let frame = [];
		for (let y = 0; y < this.rect.h; y++) {
			frame[y] = [];
			for (let x = 0; x < this.rect.w; x++) {
				let p = { painted: false, r:1 };
				frame[y][x] = p;
			}
		}
		this.frames.splice(
			index ?? this.frames.length
			, 0, frame
		)
		;
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
		//frames[index][y][x]

		if (this.frames[index][point.y][point.x]) {
			this.frames[index][point.y][point.x].painted = true
			this.frames[index][point.y][point.x].r = point.r
		}

	}
	clearFrame(index) {
		let frame = [];
		for (let y = 0; y < this.rect.h; y++) {
			frame[y] = [];
			for (let x = 0; x < this.rect.w; x++) {
				let p = { painted: false,r:0 };
				frame[y][x] = p;
			}
		}
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
		if (this.frames[index]) {

			for (let y = 0; y < this.frames[index].length; y++) {
				let yPoints = this.frames[index][y]

				for (let x = 0; x < yPoints.length; x++) {
					const pixel = yPoints[x];
					if (pixel.painted) {
						gfx.drawCircle({
							x: x,
							y: y,
							r: pixel.r
						}, color)
					}
				}
			}
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
	export(){}
	import(){}
}

function delay(time) {
	return new Promise(resolve => setTimeout(resolve, time));
} 
