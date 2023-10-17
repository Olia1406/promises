export function sum(params) {
    return new Promise((res) => {
        res(params.x + params.y);
    })
}

export function multiplicate(params) {
    return new Promise((res) => {
        res(params.val * params.multiplier);
    })
}