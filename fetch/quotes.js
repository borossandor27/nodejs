const url = 'https://httpbin.org/image';
fetch(url, {
    headers: {
        "User-Agent": "My User Agent",
    },
})
    .then((response) => response.json())
    .then(data => {
        console.log(data);
    })