// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("pieces-autos.json");
const pieces = await reponse.json();



for (let i = 0; i < pieces.length; i++) {

    const sectionFiches = document.querySelector(".fiches");

    const pieceElement = document.createElement("article");

    const imageElement = document.createElement("img");
    imageElement.src = pieces[i].image;

    const nomElement = document.createElement("h2");
    nomElement.innerText = pieces[i].nom;

    const prixElement = document.createElement("p");
    prixElement.innerText = `Prix: ${pieces[i].prix} € (${pieces[i].prix < 35 ? "€" : "€€€"})`;

    const categorieElement = document.createElement("p");
    categorieElement.innerText = pieces[i].categorie ?? "(aucune catégorie)";

    const descriptionElement = document.createElement("p");
    descriptionElement.innerText = pieces[i].description ?? "aucune description";

    const disponibiliteElement = document.createElement("p")
    if (pieces[i].disponibilite === true) {
        disponibiliteElement.innerText = "En stock"
    } else {
        disponibiliteElement.innerText = "Rupture de stock"
    }


    // Génération des balises
    sectionFiches.appendChild(pieceElement);
    pieceElement.appendChild(imageElement);
    pieceElement.appendChild(nomElement);
    pieceElement.appendChild(prixElement);
    pieceElement.appendChild(categorieElement);
    pieceElement.appendChild(descriptionElement);
    pieceElement.appendChild(disponibiliteElement)
}

const boutonTrier = document.querySelector(".btn-trier")
const boutonFilter = document.querySelector(".btn-filtrer")
const boutonDecrisption = document.querySelector(".btn-btn-description")
const boutonDecroissant = document.querySelector(".btn-decroissant")

boutonTrier.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function (a, b) {
        return a.prix - b.prix;
     });
     console.log(piecesOrdonnees);
 });

 boutonDecroissant.addEventListener("click", function () {
    const piecesDecroissantes = Array.from(pieces);
    piecesDecroissantes.sort(function (a, b) {
        return b.prix - a.prix;
    });
    console.log(piecesDecroissantes);
})

boutonFilter.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(function (pieces){
        return pieces.prix <= 35;
    })
    console.log(piecesFiltrees)
})

boutonDecrisption.addEventListener("click", function (){
    const piecesDescription = pieces.filter(function (pieces){
        return pieces.description
    })
    console.log(piecesDescription)
})

