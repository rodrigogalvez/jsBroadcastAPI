// import { setupListener } from "./tools/tools.js";
import { } from "./tools/onmove.js";
import { enqueue } from "./tools/animation.js";

function speed() {
    let result = 0;
    while (result == 0)
        result = (Math.random() - 0.5) * 128;
    return result;
}

class Star {
    x;
    y;
    dx;
    dy;
    radius;
    constructor(x, y, dx, dy) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = 3;
    }
    update(elapsedTime) {
        this.x += this.dx * elapsedTime / 1000;
        this.y += this.dy * elapsedTime / 1000;
    }
    valid(x1, y1, x2, y2) {
        return this.x >= x1 && this.x <= x2 && this.y >= y1 && this.y <= y2;
    }
    /**
     * 
     * @param {CanvasRenderingContext2D} context 
     */
    draw(context) {
        context.beginPath();
        context.ellipse(this.x, this.y, this.radius, this.radius, 0, 0, Math.PI * 2);
        context.stroke();
    }
}

class Game {
    /**
     * @type {HTMLCanvasElement}
     */
    canvas;
    /**
     * @type {CanvasRenderingContext2D}
     */
    context;
    /**
     * @type {Set.<Star>}
     */
    stars;
    /**
     * 
     * @param {Map.<String,Object>} others 
     */
    others;

    constructor(canvas, others) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.stars = new Set();
        this.others = others;
    }

    start() {
        enqueue(this.random.bind(this));
        enqueue(this.update.bind(this));
    }
    random() {
        if (Math.random() > 0.4) return;

        let dx = speed();
        let dy = speed();

        let x = window.screenLeft;
        let y = window.screenTop;
        let gx = 0;
        let gy = 0;
        let c = 0;

        this.others.forEach((value, key) => {
            c++;
            gx += x - value.x;
            gy += y - value.y;
        })
        if (c > 0) {
            gx = gx / c;
            gy = gy / c;
            dx -= gx / 3;
            dy -= gy / 3;
        }

        let star = new Star(this.canvas.width / 2, this.canvas.height / 2, dx, dy);
        this.stars.add(star);
    }
    update(elapsedTime) {
        this.context.reset();
        this.stars.forEach(star => {
            star.update(elapsedTime);
            if (star.valid(0, 0, this.canvas.width, this.canvas.height)) {
                star.draw(this.context);
            } else {
                this.stars.delete(star);
            }
        })
    }
}

export { Game };