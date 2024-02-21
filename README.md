# 🚀 Mon Vieux Grimoire - Application Backend 🚀

Voici ma proposition de **l'app Mon Vieux Grimoire** ! 👋

⬇️ Lien pour y accéder ⬇️

PAS DISPONIBLE POUR LE MOMENT

---

## 📌 Introduction 📌

🔍 **Qu'est-ce que c'est ?**

*Cette app* est le <ins>7ème projet de la formation Développeur Web par Openclassrooms
</ins>.

---

## 📖 Description 📖
Ce projet a pour but de faire toute la partie backend du projet, plus précisément le bon fonctionnement du CRUD, afin de correctement afficher les livres. Toute la partie frontend a été fournie, mais il était demandé de ne rien toucher.
C'est un excellent exercice pour se familiariser avec Node.js mais égalément Express et les quelques packages que j'ai dû utiliservtout au long de ce projet.

## 🎯 Objectif

L'objectif principal de ce projet (P7) était principalement de [commencer à comprendre les bases en node.js, savoir rendre le site fonctionnel, respecter les bonnes "coding practices"] et savoir utiliser et gérér une API ainsi que savoir utiliser des outils extérieurs tel que Postman pour vérifier le fonctionnement de l'API plus facilement.

### 🚀 Fonctionnalités

- Mise en place d'une page d'inscription/connexion avec champs de saisie pour l'email et le mot de passe, ainsi que des boutons correspondants.
- Création d'un header comprenant le logo de l'entreprise et un menu avec des liens vers l'accueil, la création d'un livre et la déconnexion.
- Développement d'un footer affichant l'adresse, le numéro de téléphone, une carte et le copyright.
- Affichage de la liste des ouvrages sur la page d'accueil, avec image et titre de chaque livre.
- Création d'une page pour chaque livre, affichant toutes les informations relatives à celui-ci, y compris l'image, le titre, l'auteur, l'année, le genre et la note moyenne.
- Possibilité pour les utilisateurs de renseigner une note (entre 0 et 5 étoiles) sur la page du livre.
- Ajout de fonctionnalités supplémentaires pour les créateurs de livres, notamment la possibilité de supprimer ou modifier un livre.

### ⚙️ Contraintes

- Utilisation d'un back-end avec une base de données MongoDB pour stocker les données des livres et des utilisateurs.
- Implémentation des contraintes de sécurité pour l'authentification des utilisateurs, notamment le cryptage des mots de passe et la gestion des tokens JWT.
- Gestion du système d'upload d'images pour les couvertures de livres, avec optimisation des images pour réduire la taille des fichiers.
- Implémentation des fonctionnalités CRUD (Create, Read, Update, Delete) pour les livres et les utilisateurs.
- Mise en place de validations pour s'assurer de l'unicité des adresses électroniques dans la base de données.
- Utilisation de middleware pour sécuriser les routes de l'API.
- Respect des directives du Green Code en optimisant la taille des images envoyées par les utilisateurs.


## 🛠 Technologies Utilisées

![Static Badge](https://img.shields.io/badge/node.js-white?style=for-the-badge&logo=node.js&color=1E1E1E)
![Static Badge](https://img.shields.io/badge/express-white?style=for-the-badge&logo=express&color=%231E1E1E)
![Static Badge](https://img.shields.io/badge/mongoose-white?style=for-the-badge&logo=mongoose&color=%231E1E1E)


- **Node.js:** Utilisé comme environnement d'exécution côté serveur pour la logique de l'application, la gestion des requêtes API, et l'interaction avec la base de données.
- **Express:** Employé pour la création de routes API et la gestion des requêtes et réponses HTTP.
- **Mongoose:** Utilisé pour simplifier les interactions avec la base de données MongoDB en permettant la définition de schémas et la manipulation de données.

---

## 📚 Informations pour installer et lancer le projet

 Pour configurer l'environnement de développement de cette application, suivez les étapes suivantes :

1. Crééz un dossier avec le nom de votre choix, ouvrez le dossier dans votre IDE et exécutez la commande dans le terminal :

    ```bash
    git clone https://github.com/Phisicz/Mon-Vieux-Grimoire.git
    ```

2. Maintenant que vous avez cloné le repo, il va falloir installer toutes les dépendances (dans package.json) à la fois pour le côté frontend et le côté backend. Pour se faire, exécutez les commandes suivantes dans les deux dossiers (en prenant soin de vous y placer avec la commande "cd") :

    ```bash
    npm install
    ```
3. À présent vous avez votre fork du projet, mais il ne fonctionnera pas si vous ne précisez pas vos variables ".env". Pour ça créez un fichier ".env" à la racine de votre backend puis collez-y ceci:

    ```bash
    DB_URI=VOTRE_LIEN_DE_CONNEXION_MONGODB
    JWT_SECRET=VOTRE_TOKEN_SECRET_POUR_JSONWEBTOKEN
    ```
Remplacez "VOTRE_LIEN_DE_CONNEXION_MONGODB" et "VOTRE_TOKEN_SECRET_POUR_JSONWEBTOKEN" par vos éléments à vous.

4. Le projet est maintenant prêt à être lancé en local, pour lancer l'application exécutez ceci dans le dossier backend (si vous n'avez pas nodemon, installez-le) :

    ```bash
    nodemon server
    ```
    Puis dans votre dossier frontend, executez ceci :

    ```bash
    npm start
    ```

5. Vous pouvez maintenant commencer à utiliser le l'application pour y ajouter vos propres livres, noter les livres, modifier/supprimer, etc.

Si vous souhaitez mettre en ligne le projet, il faudra un hébergeur qui prend en charge le frontend et le backend sinon il faudra penser à rendre le projet serverless pour l'héberger sur Vercel par exemple.

---

🤝 Merci d'avoir consulté ma version de *l'app Mon Vieux Grimoire* !