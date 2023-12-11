import { Game } from "./game.js";
import { setupListener, me } from "./tools/tools.js";
import { enqueue } from "./tools/animation.js";
import { channel, broadcast } from "./tools/broadcast.js";

let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");
let others = new Map();
let game = new Game(canvas, context);

function setCanvasSize() {
    let rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    context.scale(window.devicePixelRatio, window.devicePixelRatio);
}

function hello() {
    broadcast({
        hello: {
            soure: me(),
            x: window.screenLeft + window.outerWidth / 2,
            y: window.screenTop + window.outerHeight / 2
        }
    })
}

function updateGravity() {

    let gx = 0;
    let gy = 0;
    let c = 0;
    let x = window.screenLeft + window.outerWidth / 2;
    let y = window.screenTop + window.outerHeight / 2


    others.forEach((value, key) => {
        c++;
        gx += x - value.x;
        gy += y - value.y;
    })
    if (c > 0) {
        gx = gx / c;
        gy = gy / c;
        game.gx = gx;
        game.gy = gy;
        // dx -= gx / 3;
        // dy -= gy / 3;
    } else {
        game.gx = 0;
        game.gy = 0;
    }
}

function onhello(event) {
    if (others.has(event.data.soure)) {
        let d = others.get(event.data.soure)
        d.x = event.data.x;
        d.y = event.data.y;
    } else {
        others.set(event.data.soure, { x: event.data.x, y: event.data.y })
        hello();
    }
    updateGravity();

}

function onbye(event) {
    others.delete(event.data);
    updateGravity();
}

function onload() {
    hello();
}

function onmove() {
    hello();
    updateGravity();
}

function onunload() {
    broadcast({
        bye: me()
    })
}

function onresize() {
    setCanvasSize();
    hello();
    updateGravity();
}

function info(elapsedTime) {
    let o = [];
    others.forEach((value, key) => {
        o.push({
            id: key,
            x: value.x,
            y: value.y
        });
    })
    pre.innerText = JSON.stringify({
        elapsedTime,
        stars: game.stars.size,
        with: canvas.width,
        height: canvas.height,
        others: o
    }, undefined, 2);
}

setupListener(channel, [onhello, onbye]);
setupListener(window, [onresize, onload, onunload, onmove]);
setCanvasSize();

let pre = document.querySelector("pre");
enqueue(info)


game.start();
