import { Game } from "./game.js";
import { setupListener, me } from "./tools/tools.js";
import { enqueue } from "./tools/animation.js";
import { channel, broadcast } from "./tools/broadcast.js";

let canvas = document.querySelector("canvas");
let others = new Map();
let game = new Game(canvas, others);

function setCanvasSize() {
    let rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
}

function position() {
    broadcast({
        hello: {
            soure: me(),
            x: window.screenLeft,
            y: window.screenTop
        }
    })
}

function onhello(event) {
    if (others.has(event.data.soure)) {
        let d = others.get(event.data.soure)
        d.x = event.data.x;
        d.y = event.data.y;
    } else {
        others.set(event.data.soure, { x: event.data.x, y: event.data.y })
        position();
    }
}

function onbye(event) {
    others.delete(event.data);
}

function onload() {
    position();
}

function onmove() {
    position();
}

function onunload() {
    broadcast({
        bye: me()
    })
}

function onresize() {
    setCanvasSize();
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
