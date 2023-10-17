import './styles/main.scss';
import { parseValueFromJson } from './functions/parsers';
import { sum, multiplicate } from './functions/math';
import { delay, print } from './functions/helpers';

const state = {};
let structure = {};
const funcs = { parseValueFromJson, sum, multiplicate, delay, print };

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
    .catch(err => console.log('CATCHED ERROR', err))

async function iterateSructure(flowNodes) {
    for (let node of flowNodes) {
        if (node.function) {
            await delay(1000);
            
            const entries = Object.entries(node.parameters).map(([key, value]) => value.startsWith('<') && value.endsWith('>') ? [key, state[value.slice(1, -1)]] : [key, value])
            const argsObj = Object.fromEntries(entries)
            const result = await funcs[node.function](argsObj);
            state[node.returnName] = result;

            console.log('\n=============================================')
            console.log(node.function, argsObj);
            console.log('state', JSON.stringify(state));
        } else {
            await iterateSructure(node)
        }
    }
}
