const result = document.querySelector("#response");
const form = document.querySelector("#form");
let commune = [];


// Récupération des données sur l'API
async function nomCommune(codePostal) {
    await fetch(`https://apicarto.ign.fr/api/codes-postaux/communes/${codePostal}`)
        .then((res) => res.json())
        .then((data) => (commune = data));
}

// Fonction avec .map pour écrire le résultat
function communeDisplay() {
    result.innerHTML = commune.map((commune) =>
        `
        <option>${commune.nomCommune}</option>
        `
    ).join("");
}

// Fonction de lecture instantanée dans l'input
form.addEventListener("input", (e) => {
    e.preventDefault();

    let match = e.target.value.match(/^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$/);
    if (match !== null) {
        nomCommune(e.target.value).then(() => communeDisplay());
    }
    else if (match == null) {
        result.innerHTML = "<option>Commune</option>";
    }
    else {
        alert("Erreur");
    }
});

