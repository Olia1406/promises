import './styles/main.scss';
import * as parsers from './functions/parsers';
import * as math from './functions/math';
import * as helpers from './functions/helpers';

const state = {};
let structure = {};
const { parseValueFromJson } = parsers;
const { sum, multiplicate } = math;
const { delay, print } = helpers;

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
            let parameterValues = Object.values(node.parameters);
            const args = parameterValues.map(value => value.startsWith('<') && value.endsWith('>') ? state[value.slice(1, -1)] : value)
            const result = await eval(node.function + '(...args)');
            state[node.returnName] = result;

            console.log('\n=============================================')
            console.log(node.function, args)
            console.log('state', JSON.stringify(state));
        } else {
            await iterateSructure(node)
        }
    }
}


