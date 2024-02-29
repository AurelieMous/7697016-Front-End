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
const boutonDescription = document.querySelector(".btn-description")
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
    const piecesFiltrees = pieces.filter(function (piece){
        return piece.prix <= 35;
    })
    console.log(piecesFiltrees);
})

boutonDescription.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(function (piece){
        return piece.description;
    })
    console.log(piecesFiltrees);
})

//afficher que les noms
const noms = pieces.map(piece => piece.nom);
for(let i = pieces.length -1 ; i >= 0; i--){
    if(pieces[i].prix > 35){
        noms.splice(i,1);
    }
}

//Création de la liste
const abordablesElements = document.createElement('ul');
//Ajout de chaque nom à la liste
for(let i=0; i < noms.length ; i++){
    const nomElement = document.createElement('li');
    nomElement.innerText = noms[i];
    abordablesElements.appendChild(nomElement)
}
// Ajout de l'en-tête puis de la liste au bloc résultats filtres
document.querySelector('.abordables')
    .appendChild(abordablesElements);


//récupérer la liste des pièces disponibles
const titrePiece = pieces.map(piece => piece.nom)
const Prix = pieces.map(piece => piece.prix)
const descriptions = pieces.map(piece => piece.description)
const enStock = pieces.map(piece => piece.disponibilite)
console.log(enStock)
//supprimer les pièces non disponibles
for(let i = pieces.length -1 ; i >= 0; i--){
    if(pieces[i].disponibilite === false){
        enStock.splice(i,1);
    }
    console.log(enStock)
}
// EnStock correspond aux articles en stock
//il faut faire maintenant apparaître le nom, la description et le prix

//creation de l'élément :
const PiecesDisponibles = document.createElement('ul');

//boucle qui va permettre d'afficher le titre, la description et le prix :
for(let i=0; i < enStock.length ; i++){
    let disponibleElement = document.createElement('li');
    disponibleElement.innerText = `${titrePiece[i]} -  ${Prix[i]} € : ${descriptions[i]}`;
    PiecesDisponibles.appendChild(disponibleElement);
}

document.querySelector('.disponibles')
    .appendChild(PiecesDisponibles);
// nomElement + prixElement +  descriptionElement
// si pieces[i] est en stock, alors affiche le nom, la description et le prix
//const prixElement = document.createElement("p");

