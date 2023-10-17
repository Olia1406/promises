export function parseValueFromJson(params) {
    return fetch(params.jsonPath)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Parser error " + response.status);
            }
            return response.json()
        })
        .then((json) => {
            return new Promise((resolve) => {
                resolve(json[params.valueName])
            })
        });
}