//1-Select elements on the page ->  canvas, shake button
const canvas = document.querySelector('#canva');
const context = canvas.getContext('2d');
const shakeButton = document.querySelector('.shake') 
const MOVE_AMOUNT = 15;
let hue = 0; //for color
context.strokeStyle = `hsl(${hue},100%,50%)`;

//2-Setup our canvas for drawing
const {width,height} = canvas;

//2b - create random x and y starting points on the canvas.
let x = Math.floor(Math.random()*width);
let y = Math.floor(Math.random()*height);
context.lineJoin = 'round';
context.lineCap = 'round';
context.lineWidth = MOVE_AMOUNT;

//2a-putting random dot to draw om the canvas.
function putDot(){
	context.beginPath();
	context.moveTo(x,y);
	context.lineTo(x,y);
	context.stroke();
}


//5-write a draw function
function draw({key}){
	//increment hue by 1 and updating color each time.
	hue +=2;
	let perc1 = Math.random() * 101;
	context.strokeStyle = `hsl(${hue},100%,50%)`;

	// console.log(key);
	//start the path
	context.beginPath();
	context.moveTo(x,y);
	//move x and y values depending on what the user did
	if(key === 'ArrowRight'){
		x = x+MOVE_AMOUNT;
		y=y;
	}else if(key === 'ArrowLeft'){
		x = x-MOVE_AMOUNT;
		y=y;
	}else if(key === 'ArrowUp'){
		x = x;
		y = y-MOVE_AMOUNT;
	}else if(key === 'ArrowDown'){
		x = x;
		y = y+MOVE_AMOUNT;
	}
	context.lineTo(x,y);
	context.stroke();

}

//4-write a handler for the keys
function handleKey(e){
	if(e.key.includes('Arrow')){
		e.preventDefault();
		draw({key : e.key});
	}
}

//5-clear / shake function
function clearCanvas(){
	canvas.classList.add('shake');
	context.clearRect(0,0,width,height);
	canvas.addEventListener('animationend',function(){
		canvas.classList.remove('shake');
	},{once : true})
	putDot();
}

//3-listen for arrow keys
window.addEventListener('keydown', handleKey);
shakeButton.addEventListener('click', clearCanvas);
putDot();