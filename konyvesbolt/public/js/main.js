const baseUrl = 'http://localhost:3000';
const inputVasarloid = document.querySelector('#vasarloid');
const inputNev = document.querySelector('#nev');
const inputFehasznalonev = document.querySelector('#fehasznalonev');
const inputEmail = document.querySelector('#email');
const inputPass1 = document.querySelector('#pass1');
const inputPass2 = document.querySelector('#pass2');
const buttonCreate = document.querySelector('#create');
const buttonDelete = document.querySelector('#delete');
const buttonUpdate = document.querySelector('#update');
const buttonReadAll = document.querySelector('#readAll');
const osszesVasarlo = document.querySelector('#kartyak');

window.addEventListener('load', readAllCustomers);


async function readAllCustomers() {
    const response = await fetch(`${baseUrl}/readAll`);
    const jsonData = await response.json();
    kartyakMegjelenitese(jsonData);
}

function kartyakMegjelenitese(jsonData) {
    osszesVasarlo.innerHTML = '';

    for (let i = jsonData.length - 1; i >= 0; i--) {
        const vasarlo = jsonData[i];

        const egyVasarloKartya = document.createElement('div');
        egyVasarloKartya.className = 'card m-3';

        let card = `
            <div class="card-body">
                <h5 class="card-title">${vasarlo.nev}</h5>
                <p class="card-text">${vasarlo.email_cim}</p>
                <p class="card-text">${vasarlo.felhasznalonev}</p>
                <p class="card-text">id: ${vasarlo.vasarloid}</p>
                <a href="#" class="btn btn-primary" onclick="vasarloKivalasztasa(${vasarlo.vasarloid});" id="vasarlo${vasarlo.vasarloid}">Kiválaszt</a>
            </div>        
        `;

        egyVasarloKartya.innerHTML = card;
        osszesVasarlo.appendChild(egyVasarloKartya);
    }
}

// Vásárló hozzáadása
async function createCustomer() {


    if (egyezoJelszo() && mindenKiVanToltve()) {
        let data = {
            vasarloid: inputVasarloid.value,
            nev: inputNev.value,
            email_cim: inputEmail.value,
            felhasznalonev: inputFehasznalonev.value,
            jelszo: inputPass1.value
        };
        beviteliMezokNullazasa();
        readAllCustomers();

        try {
            const response = await fetch(`${baseUrl}/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            console.log(result);


        } catch (error) {
            console.error("Hiba:", error);
        }

    }
}

function egyezoJelszo(jelsz1, jelsz2) {
    if (inputPass1.value == inputPass2.value) return true;
    else {
        console.log('A jelszavak nem egyeznek');
        return false;
    }
}

function mindenKiVanToltve() {
    //let valVasarloid=inputVasarloid.valVasarloid;
    let valNev = inputNev.value
    let valEmail = inputEmail.value
    let valFelhasznalonev = inputFehasznalonev.value

    if (valNev != "" && valEmail != "" && valFelhasznalonev != "" && valJelszo1 != "" && valJelszo2 != "") {
        return true;
    }
    else {
        console.log('Tölts ki minden mezőt!');
        return false;
    }
}

function beviteliMezokNullazasa() {
    inputVasarloid.value = ""
    inputNev.value = "";
    inputEmail.value = "";
    inputFehasznalonev.value = "";
    inputPass1.value = "";
    inputPass2.value = "";
}

// Vásárló kiválasztása
async function vasarloKivalasztasa(id) {
    const response = await fetch(`${baseUrl}/read/${id}`);
    const jsonData = await response.json();
    selectedCustomer = jsonData[0];
    inputVasarloid.value = selectedCustomer.vasarloid;
    inputNev.value = selectedCustomer.nev;
    inputEmail.value = selectedCustomer.email_cim;
    inputFehasznalonev.value = selectedCustomer.felhasznalonev;
    inputPass1.value = "";
    inputPass2.value = "";
}




// Vásárló törlése
async function deleteCustomer() {
    try {
        const response = await fetch(`${baseUrl}/delete/${selectedCustomer.vasarloid}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        });

        const result = await response.json();
        console.log(result);
        beviteliMezokNullazasa();
        readAllCustomers();
    } catch (error) {
        console.error("Hiba:", error);
    }
}
