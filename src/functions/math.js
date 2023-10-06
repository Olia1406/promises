export default function sum (...args) {
 return new Promise((res, rej) => {
     res(args.reduce((acc, curr) => acc + curr, 0));
     rej(0)
 }) 
}