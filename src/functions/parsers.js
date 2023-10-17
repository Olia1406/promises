export function parseValueFromJson(...args) {
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