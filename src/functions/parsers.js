export default function parseValueFromJson(path, valueName) {
    return fetch(path)
        .then((response) => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json()
        })
        .then((json) => {
            console.log('26', json)
            return json[valueName]
        });
}

async function parseValueFromJsonAsync(path, valueName) {
    const resp = await fetch(path);
    return await resp.json()
}
