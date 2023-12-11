let borderSize = (window.outerWidth - window.innerWidth) / 2;
let offsetX = borderSize;
let offsetY = (window.outerHeight - window.innerHeight) + borderSize;

let top = undefined;
let left = undefined;

function positionObserver() {
    if (top != window.screenTop || left != window.screenLeft) {
        const event = new Event("move");
        event.data = {
            top: window.screenTop,
            left: window.screenLeft,
            deltaX: window.screenLeft - left,
            deltaY: window.screenTop - top
        }
        window.dispatchEvent(event);
        top = window.screenTop;
        left = window.screenLeft;
    }
}

window.setInterval(positionObserver, 1);

export { borderSize, offsetX, offsetY };