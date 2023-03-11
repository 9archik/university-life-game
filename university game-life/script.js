const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let surviveCells = 0;
let isStart = false;
const buttonStart = document.getElementById('start');

let mas = [];

canvas.onclick = function (event) {
	let x = event.offsetX;
	let y = event.offsetY;
	x = Math.floor(x / 20);
	y = Math.floor(y / 20);
	mas[y][x] = mas[y][x] ? false : true;
	surviveCells = mas[y][x] ? surviveCells + 1 : surviveCells - 1;
	buttonStart.disabled = surviveCells < 2;
	drawField();
};

function goLife() {
	let n = 50,
		m = 50;
	for (let i = 0; i < n; i++) {
		mas[i] = [];
		for (let j = 0; j < m; j++) {
			mas[i][j] = false;
		}
	}
}

function drawField() {
	ctx.clearRect(0, 0, 1000, 1000);
	ctx.strokeRect(0, 0, 1000, 1000);
	let surviveCells2 = 0;
	for (let i = 0; i < 50; i++) {
		for (let j = 0; j < 50; j++) {
			if (mas[i][j]) {
				surviveCells2++;
				ctx.fillRect(j * 20, i * 20, 20, 20);
			}
		}
	}
	surviveCells = surviveCells2;
}
goLife();

drawField();

function startLife() {
	if (isStart) {
		let mas2 = [];
		let n = 50,
			m = 50;
		for (let i = 0; i < n; i++) {
			mas2[i] = [];
			for (let j = 0; j < m; j++) {
				var neighbors = 0;
				if (mas[fpm(i) - 1][j]) neighbors++;
				if (mas[i][fpp(j) + 1]) neighbors++;
				if (mas[fpp(i) + 1][j]) neighbors++;
				if (mas[i][fpm(j) - 1]) neighbors++;
				if (mas[fpm(i) - 1][fpp(j) + 1]) neighbors++;
				if (mas[fpp(i) + 1][fpp(j) + 1]) neighbors++;
				if (mas[fpp(i) + 1][fpm(j) - 1]) neighbors++;
				if (mas[fpm(i) - 1][fpm(j) - 1]) neighbors++;
				if (neighbors == 2 || neighbors == 3) {
					mas2[i][j] = true;
					surviveCells++;
				} else {
					mas2[i][j] = false;
					surviveCells--;
				}
			}
		}
		mas = mas2;
		drawField();
		timer = setTimeout(startLife, 500);
	}
}

function fpm(index) {
	if (index == 0) return 50;
	else return index;
}
function fpp(index) {
	if (index == 49) return -1;
	else return index;
}

buttonStart.disabled = true;
let buttonClear = document.getElementById('clear');

buttonStart.onclick = () => {
	isStart = !isStart;
	buttonStart.innerText = isStart ? 'Stop' : 'Start';
	buttonClear.disabled = isStart;
	startLife();
};

buttonClear.onclick = () => {
	for (let i = 0; i < 50; i++) {
		for (let j = 0; j < 50; j++) {
			mas[i][j] = false;
		}
	}
	surviveCells = 0;
	buttonStart.disabled = true;

	drawField();
};
