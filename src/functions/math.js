export function sum(...args) {
    return new Promise((res, rej) => {
        res(args.reduce((acc, curr) => acc + curr, 0));
        rej(0)
    })
}

export function multiplicate(...args) {
    return new Promise((res, rej) => {
        res(args[0] * args[1]);
        rej(0)
    })
}