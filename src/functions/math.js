export function sum(params) {
    return new Promise((res, rej) => {
        res(params.x + params.y);
        rej(0)
    })
}

export function multiplicate(params) {
    return new Promise((res, rej) => {
        res(params.val * params.multiplier);
        rej(0)
    })
}