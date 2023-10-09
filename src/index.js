import './styles/main.scss';
// import parseValueFromJson from './functions/parsers';
// import sum from './functions/math';
// import display from './functions/helpers';

let state = {};
let structure = {};
const displayId = 'result-displayer';

const structureInput = document.getElementById('structure-json');

const getStructurePromise = new Promise((resolve, reject) => {
    structureInput.addEventListener('change', e => {
        const importedFile = structureInput.files[0];
        const reader = new FileReader();
        reader.onload = function () {
            const fileContent = JSON.parse(reader.result);
            structure = fileContent;
            resolve(structure);
        };
        reader.onerror = error => reject(error);
        reader.readAsText(importedFile);
    });
});

getStructurePromise
    .then(structure => iterateSructure(structure.flowNodes))
    .catch(err => console.log('error catch', err))

async function iterateSructure(flowNodes) {

    for (let node of flowNodes) {
        console.log('47 node', node)
        console.log('48 node function', node.function)
        if (node['function']) {
            let parameterValues = Object.values(node.parameters);
            console.log('51 entries', parameterValues)
            const args = parameterValues.map(value => value.startsWith('<') && value.endsWith('>') ? state[value.slice(1, -1)] : value)
            console.log('51 args', args)
            console.log('53 node function', node.function);

            const result = await eval(node.function + '(...args)');
            state[node.returnName] = result;
            console.log('56 state', JSON.stringify(state))
        } else {
            await iterateSructure(node)
        }
    }
}

function recordToState(state, returnName, result) {
    return new Promise((resolve) => {
        state[returnName] = result;
        resolve(result)
    })
}

function delay(t, val) {
    return new Promise(resolve => {
        return setTimeout(resolve, t, val)
    });
}

function print(result) {
    return new Promise((resolve) => {
        document.getElementById('result-displayer').textContent = `${JSON.stringify(result, undefined, 2)}`
        resolve(result)
    })
}


function sum(...args) {
    return new Promise((res, rej) => {
        res(args.reduce((acc, curr) => acc + curr, 0));
        rej(0)
    })
}

function parseValueFromJson(...args) {
    return fetch(args[0])
        .then((response) => {
            if (!response.ok) {
                throw new Error("Parser error " + response.status);
            }
            return response.json()
        })
        .then((json) => {
            return new Promise((resolve) => {
                resolve(json[args[1]])
            })
        });
}

function multiplicate(...args) {
    return new Promise((res, rej) => {
       res(args[0]*args[1]);
       rej(0)
    })
}

const getAllValues = () => {
    let arr = structure.flowNodes[0].map((node, i) => {
        const path = node.parameters.jsonPath;
        const value = node.parameters.valueName;
        return parseValueFromJson(path, value)
    })
    return Promise.all(arr)
}
