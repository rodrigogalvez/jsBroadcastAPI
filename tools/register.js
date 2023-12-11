function register(handler) {
    navigator.serviceWorker.register("sw.js", {
        scope: "/",
    })
        .then(() => {
            switch (typeof handler) {
                case "function":
                    navigator.serviceWorker.addEventListener("message", handler);
                    break;
                default:
                    navigator.serviceWorker.addEventListener("message", (event) => {
                        Object.entries(event.data).forEach(([key, value]) => {
                            handler[key]?.call(undefined, value);
                        });
                    });

            }
        })
        .catch((reason) => {
            console.error(`Falló el registro con el ${reason}`);
        });
}

function post(data) {
    navigator.serviceWorker.controller.postMessage(data);
}

export { register, post };
