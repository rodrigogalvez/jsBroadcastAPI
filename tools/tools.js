let id = crypto.randomUUID();

function me() {
    return id;
}

function setupListener(object, functionList) {
    functionList.forEach(f => {
        object.addEventListener(f.name.slice(2), f)
    })
}

function timestamp(date) {
    return (date || new Date()).getTime();
}

export { me, setupListener, timestamp };