let channel = new BroadcastChannel("broadcast");

channel.addEventListener("message",(event)=>{
    Object.entries(event.data).forEach(([key,value])=>{
        const event = new Event(key);
        event.data = value;
        channel.dispatchEvent(event);
    })
})

// function register(handler) {
//     if (typeof handler == "object" && (handler instanceof Array)) {
//         let h = {}
//         handler.forEach(f => {
//             h[f.name.slice(2)] = f;
//         });
//         bc.addEventListener("message", (event) => {
//             Object.entries(event.data).forEach(([key, value]) => {
//                 h[key]?.call(undefined, value);
//             });
//         });
//     } else if (typeof handler == "function") {
//         bc.addEventListener("message", handler);
//     } else {
//         bc.addEventListener("message", (event) => {
//             Object.entries(event.data).forEach(([key, value]) => {
//                 handler[key]?.call(undefined, value);
//             });
//         });

//     }
// }

function broadcast(data) {
    channel.postMessage(data);
}

export { channel, broadcast };
