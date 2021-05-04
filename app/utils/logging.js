export const logging = (log, desc) => {
    setTimeout(() => {
        console.log(log + ":", desc)
    }, 5000);
}

export const loggingError = (log, desc) => {
    setTimeout(() => {
        console.error(log + ":", desc)
    }, 5000);
}

export const loggingInfo = (log, desc) => {
    setTimeout(() => {
        console.log(log + ":", desc)
    }, 5000);
}

export const loggingWarn = (log, desc) => {
    setTimeout(() => {
        console.warn(log + ":", desc)
    }, 5000);
}

export const loggingDebug = (log, desc) => {
    setTimeout(() => {
        console.debug(log + ":", desc)
    }, 5000);
}