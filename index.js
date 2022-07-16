const result = document.querySelector("#response");
const form = document.querySelector("#form");
let commune = [];
let check = true;


// Récupération des données sur l'API
async function nomCommune(codePostal) {
    // await fetch(`https://apicarto.ign.fr/api/codes-postaux/communes/${codePostal}`)
    //     .then((res) => res.json())
    //     .then((data) => (commune = data))
    await fetch(`https://apicarto.ign.fr/api/codes-postaux/communes/${codePostal}`)
        .then(function (res) {
            if (!res.ok) {
                errorMsg.innerHTML = "Ce code postal n'existe pas !";
                check = false;
                console.clear();
            }
            return res;
        })
        .then((res) => res.json())
        .then((data) => {
            commune = data;
            check = true;
        })
        .catch((error) => console.clear());
}

// Fonction avec .map pour écrire le résultat
function communeDisplay() {
    result.innerHTML = commune.map((commune) => {
        if (check == false) {
            return `
        
            <option>Commune</option>
            `
        } else {
            return `
                <option>${commune.nomCommune}</option>
                `
        }
    }
    ).join("");
}

// Fonction de lecture instantanée dans l'input
form.addEventListener("input", (e) => {
    e.preventDefault();

    let match = e.target.value.match(/^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$/);
    if (match !== null) {
        nomCommune(e.target.value).then(() => communeDisplay());
        errorMsg.innerHTML = "";
    }
    else if (match == null) {
        result.innerHTML = "<option>Commune</option>";
        errorMsg.innerHTML = "";
    }
    else {
        alert("Erreur");
    }
});
