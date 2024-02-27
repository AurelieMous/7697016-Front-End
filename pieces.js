// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("pieces-autos.json");
const pieces = await reponse.json();

//déclaration des éléments
const article = pieces[0];

const imageElement = document.createElement("img");
imageElement.src = article.image;
const nomElement = document.createElement("h2");
nomElement.innerText = article.nom;
const prixElement = document.createElement("p");
prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;
const categorieElement = document.createElement("p");
categorieElement.innerText = article.categorie ?? "(aucune catégorie)";
const descriptionElement = document.createElement("p");
descriptionElement.innerText = article.description ?? "aucune description";

//génération des balises
const sectionFiches = document.querySelector(".fiches");
sectionFiches.appendChild(imageElement);
sectionFiches.appendChild(nomElement);
sectionFiches.appendChild(prixElement);
sectionFiches.appendChild(categorieElement);
sectionFiches.appendChild(descriptionElement);


const disponibiliteElement = document.createElement("p")
sectionFiches.appendChild(disponibiliteElement)

if (article.disponibilite === true) {
    disponibiliteElement.innerText = "En stock"
} else {
    disponibiliteElement.innerText = "Rupture de stock"
}



