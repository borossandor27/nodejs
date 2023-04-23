const buttonCsere = document.querySelector('#kepcsere');
const nekoImage = document.querySelector('#nekoImage');

buttonCsere.addEventListener('click', kepcsere);

async function kepcsere() {
    fetch('https://nekos.best/api/v2/neko')
        .then(response => response.json()) //-- kinyerjük a tartalmat
        .then(json => nekoImage.src = json.results[0].url) //-- feldolgozzuk a tartalom megfelelő részét

    // https://nekos.best/api/v2/neko/0001.png

}
