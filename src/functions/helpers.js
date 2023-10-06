// export default function display(id, result) {
//   document.getElementById(id).innerHTML = `Result ${result}`
// }
export default function display(id, result) {
  return new Promise((resolve) => {
    console.log('6', result)
    document.getElementById(id).textContent = `${JSON.stringify(result, undefined, 2) }`
    resolve(result)
  })
}
export function delay(t) {
  return new Promise(resolve => setTimeout(resolve, t));
}

export function recordToState(state, returnName, result) {
  return new Promise((resolve) => {
    state[returnName] = result;
    resolve(result)
  })
}