class CanvasToWebm{
	constructor(canvas,videoName){
		this.canvas = canvas
		this.chunks = []
		this.name = videoName
		this.cam = new MediaRecorder(this.canvas.captureStream());
		this.cam.ondataavailable = e => this.chunks.push(e.data);
		this.cam.onstop = e => this.download(new Blob(this.chunks, {type: 'video/webm'}));
	}
	download(blob){
		const vid = document.createElement('video');
		vid.src = URL.createObjectURL(blob);

		document.body.appendChild(vid);
		const a = document.createElement('a');
		let time = new Date()
		
		a.download = `${this.name || time.getTime()}.webm`;
		a.href = vid.src;
		a.textContent = 'download the video';
		document.body.appendChild(a);
		a.click()
		document.body.removeChild(vid)
		document.body.removeChild(a)
	}
	start(){
		this.cam.start()
	}
	stop(){
		this.cam.stop()
	}
}