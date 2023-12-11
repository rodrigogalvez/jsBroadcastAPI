import { timestamp } from "./tools.js";

let list = [];
let startTime = timestamp();

function loop() {
    let currentTime = timestamp();
    let elapsedTime = currentTime - startTime;
    list.forEach(f => f(elapsedTime));
    startTime = currentTime;
    window.requestAnimationFrame(loop);
}

function enqueue(callback) {
    list.push(callback);
}

loop();

export { enqueue };