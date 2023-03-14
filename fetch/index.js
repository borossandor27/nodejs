fetch('https://quotes.toscrape.com/random')
    .then((response) => response.text())
    .then((body) => {
        console.log(body);
    }); 