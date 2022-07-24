# jwf - Just works framework  

Browser Game framework highly inspired by Raylib.  
Everything works using static functions.  

```ts
//examples
gfx.drawPixel(pixel)//draws a 1x1 rectangle
gfx.drawImage(img)//draws an image
gfx.drawRect(rect)//draws a rectangle
gfx.drawCircle(circle)//draws a circle
```

## How to use

Just insert `dist/jwf.js` on your html file after a canvas, .  
You can also add `jwf.d.ts` to your project folder to help you with types.  
```html
<canvas id="ctx"></canvas>
<script src="jwf.js"></script>
<script>
	let gfx = jwf(document.querySelector("#ctx"))

	let pixel = {
		x: 0,
		y: 0
	}

	gfx.drawPixel(pixel)
</script>
```

## Template

You can use this template to start using. https://github.com/ussaohelcim/jwf-template.js

## Modules

The jfw contains the following libraries:  
- `party.js`
	- A just works particle system library, inspired by otter2D's particle system
	```js
	//usage example
	let bloodParticles = PARTY(canvasContext,5,redColor)
	//blooParticle with red particles with radius of 5

	bloodParticles.createParticle(position)
	//create a particle at "position" that moves 5 pixels per frame towards a random angle, that will die in 60 frames, with the color "redColor"
	bloodParticles.createParticle(position,jwML.DEG2RAD(90))
	//create a particle at "position" that moves 5 pixels per frame towards the 90 angle,that will die in 60 frames, with the color "redColor"
	bloodParticles.createParticle(position,jwML.DEG2RAD(90),10,120,blueColor)
	//create a particle at "position" that moves 10 pixels per frame towards the 90 angle,that will die in 120 frames, with the color "blueColor"

	bloodParticles.draw()//draw all particles
	```
- `jwML.js`
	- A just works math library
	```js
	//usage example
	let angle = jwML.DEG2RAD(90)
	let dir = 
	console.log(jwML.AngleToNormalizedVector2(0))
	//{x:1,y:0}
	```
- `jwCL.js`
	- A just works collision library
	```js
	//usage example
	let colision = jwCL.checkCollisionCircles({x:0,y:0,r:5},{x:0,y:4:r:5})//true
	```
## Roadmap

- [X] math library  
- [X] collision library  
- [ ] add more stuff here  

## Examples

You can see examples at [examples](/examples/).

# Contribution

Feel free to open issues and to ask merge requests.  
