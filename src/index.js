import './styles/main.scss';
import parseValueFromJson from './functions/parsers';
import sum from './functions/math';
import display from './functions/helpers';
// import delay from './functions/helpers';

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

const getAllValues = () => {
    let arr = structure.flowNodes[0].map((node, i) => {
        const path = node.parameters.jsonPath;
        const value = node.parameters.valueName;
        return parseValueFromJson(path, value)
            .then((res) => recordToState(state,'' ,res))
    })
    return Promise.all(arr)
}

getStructurePromises
    .then((structure) => delay(1000, structure))
    .then((result) => display('structure', result))

    .then(() => delay(1000))
    .then(() => getAllValues())
    .then((values) => recordToState(state, 'returnValues', values))
    .then((result) => display('sum', result))

    .then(() => sum(...state.returnValues))
    .then((sum) => recordToState(state, 'sum', sum))


    .then(() => delay(1000))
    .then(() => display(displayId, state.sum))
    .catch((err) => {
        console.log('error catch', err)
    })


getStructurePromise
    .then(() => getAllValues())
    .then((values) => sum(...values))
    .then((result) => display(displayId, result))
    .catch((err) => console.log('error catch', err))



function recordToState(state, returnName, result) {
    return new Promise((resolve) => {
        state[returnName] = result;
        resolve(result)
    })
}

function delay(t, val) {
    return new Promise(resolve => {
        return setTimeout(resolve, t, val)});
} 

// ут не передавати значення а записувати їх в стейт 
// і щоб кожна наступна ф-ція брала їх зі стейту

// зробити так, щоб папка дата вставлялася в діст через вебпак


state = {
    valueA: 5,
    valueB: 10
}


[structure[1].function](structure[1].parameters.x, structure[1].parameters.y)