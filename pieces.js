import { ajoutListenersAvis, ajoutListenerEnvoyerAvis, afficherAvis } from "./avis.js";
// Récupération des pièces depuis le fichier JSON
let pieces = window.localStorage.getItem('pieces');

if (pieces === null) {
    const pieces = await fetch("http://localhost:8080/pieces").then(pieces => pieces.json());
    //transformation des pièces en JSON
    const valeurPieces = JSON.stringify(pieces);
    //stockage des informations dans le localStorage
    window.localStorage.setItem("pieces", valeurPieces);
} else {
    pieces = JSON.parse(pieces);
}




ajoutListenerEnvoyerAvis()

function genererPieces(pieces){
    for (let i = 0; i < pieces.length; i++) {

        const article = pieces[i];
        // Récupération de l'élément du DOM qui accueillera les fiches
        const sectionFiches = document.querySelector(".fiches");
        // Création d’une balise dédiée à une pièce automobile
        const pieceElement = document.createElement("article");
        // Création des balises 
        const imageElement = document.createElement("img");
        imageElement.src = article.image;
        const nomElement = document.createElement("h2");
        nomElement.innerText = article.nom;
        const prixElement = document.createElement("p");
        prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;
        const categorieElement = document.createElement("p");
        categorieElement.innerText = article.categorie ?? "(aucune catégorie)";
        const descriptionElement = document.createElement("p");
        descriptionElement.innerText = article.description ?? "Pas de description pour le moment.";
        const stockElement = document.createElement("p");
        stockElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock";
        //Code ajouté
        const avisBouton = document.createElement("button");
        avisBouton.dataset.id = article.id;
        avisBouton.textContent = "Afficher les avis";
        
        
        // On rattache la balise article a la section Fiches
        sectionFiches.appendChild(pieceElement);
        pieceElement.appendChild(imageElement);
        pieceElement.appendChild(nomElement);
        pieceElement.appendChild(prixElement);
        pieceElement.appendChild(categorieElement);
        pieceElement.appendChild(descriptionElement);
        pieceElement.appendChild(stockElement);
        //Code aJouté
        pieceElement.appendChild(avisBouton);
    
     }
     ajoutListenersAvis();
}

//Premier affichage page
genererPieces(pieces);

for(let i = 0; i < pieces.length; i++){
    const id = pieces[i].id;
    const avisJSON = window.localStorage.getItem(`avis-pieces-${id}`);
    const avis = JSON.parse(avisJSON);

    if(avis !== null){
        const pieceElement = document.querySelector(`article[data-id="${id}"]`);
        afficherAvis (pieceElement, avis)
    }
}
// trier prix croissant
const boutonTrier = document.querySelector(".btn-trier")

boutonTrier.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function (a, b) {
        return a.prix - b.prix;
     });
     document.querySelector(".fiches").innerHTML = "";
     genererPieces(piecesOrdonnees)
 });

 // prix abordable
 const boutonFilter = document.querySelector(".btn-filtrer")
 boutonFilter.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(function (piece){
        return piece.prix <= 35;
    })
    document.querySelector(".fiches").innerHTML = "";
     genererPieces(piecesFiltrees)
})


const boutonDescription = document.querySelector(".btn-description")
const boutonDecroissant = document.querySelector(".btn-decroissant")

// decroissant
 boutonDecroissant.addEventListener("click", function () {
    const piecesDecroissantes = Array.from(pieces);
    piecesDecroissantes.sort(function (a, b) {
        return b.prix - a.prix;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesDecroissantes)
})


//afficher description
boutonDescription.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(function (piece){
        return piece.description;
    })
    document.querySelector(".fiches").innerHTML = "";
     genererPieces(piecesFiltrees);
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

    
//Exos trier par prix
const inputPrixMax = document.querySelector('#prix-max')
inputPrixMax.addEventListener('input', function(){
    const piecesFiltrees = pieces.filter(function(piece){
        return piece.prix <= inputPrixMax.value;
    })
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees)
})

const bouttonMettreAJour = document.querySelector(".btn-maj");
bouttonMettreAJour.addEventListener("click", function(){
    window.localStorage.removeItem(pieces)
})