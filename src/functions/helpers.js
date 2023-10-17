export function recordToState(state, returnName, result) {
  return new Promise((resolve) => {
    state[returnName] = result;
    resolve(result);
  })
}

export function delay(t, val) {
  return new Promise(resolve => {
    return setTimeout(resolve, t, val)
  });
}

export function print(params) {
  return new Promise((resolve) => {
    document.getElementById(elementId).textContent = `${JSON.stringify(params.value, undefined, 2)}`
    resolve(params.value)
  })
}

const elementId = 'result-displayer';

const getAllValues = () => {
    let arr = structure.flowNodes[0].map((node, i) => {
        const path = node.parameters.jsonPath;
        const value = node.parameters.valueName;
        return parseValueFromJson(path, value)
    })
    return Promise.all(arr)
}