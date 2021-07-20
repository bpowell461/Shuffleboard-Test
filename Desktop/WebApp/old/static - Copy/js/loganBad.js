var vx = 3;
var vy = 2;

function hitLR(el, bounding) {
    if (el.offsetLeft <= 0 && vx < 0) {
        console.log('LEFT');
        vx = -1 * vx;
		var newColor = "hsl(" + Math.floor(Math.random()*360) + ", 100%, 50%)";
			$('.bouncer').css('color', newColor);
    }
    if ((el.offsetLeft + el.offsetWidth) >= bounding.offsetWidth) {
        console.log('RIGHT');
        vx = -1 * vx;
		var newColor = "hsl(" + Math.floor(Math.random()*360) + ", 100%, 50%)";
			$('.bouncer').css('color', newColor);
    }
    if (el.offsetTop <= 0 && vy < 0) {
        console.log('TOP');
        vy = -1 * vy;
		var newColor = "hsl(" + Math.floor(Math.random()*360) + ", 100%, 50%)";
			$('.bouncer').css('color', newColor);
    }
    if ((el.offsetTop + el.offsetHeight) >= bounding.offsetHeight) {
        console.log('BOTTOM');
        vy = -1 * vy;
		var newColor = "hsl(" + Math.floor(Math.random()*360) + ", 100%, 50%)";
			$('.bouncer').css('color', newColor);
    }

}

function mover(el, bounding) {
    hitLR(el, bounding);
    el.style.left = el.offsetLeft + vx + 'px';
    el.style.top = el.offsetTop + vy + 'px';
    setTimeout(function() {
        mover(el, bounding);
    }, 20);
}

setTimeout(function() {
    mover($('.bouncer')[0], $('.bouncyHouse')[0]);
}, 20);