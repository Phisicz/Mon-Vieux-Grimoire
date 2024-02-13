# 🚀 Mon Vieux Grimoire - Application Backend 🚀

Voici ma proposition de **l'app Mon Vieux Grimoire** ! 👋

⬇️ Lien pour y accéder ⬇️

https://p6-kasa-nine.vercel.app

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

![Static Badge](https://img.shields.io/badge/node-white?style=for-the-badge&logo=react&color=%231E1E1E)
![Static Badge](https://img.shields.io/badge/express-white?style=for-the-badge&logo=react-router&color=%231E1E1E)
![Static Badge](https://img.shields.io/badge/mongoose-white?style=for-the-badge&logo=sass&color=%231E1E1E)


- **Node.js:** Utilisé pour construire l'interface utilisateur avec des composants réutilisables.
- **Express:** Employé pour gérer le routage dans l'application.
- **Mongoose:** Utilisé pour écrire des styles CSS plus avancés et maintenables.

---

## 📚 Informations pour installer et lancer le projet

 Pour configurer l'environnement de développement de cette application, suivez les étapes suivantes :

1. Crééz un dossier avec le nom de votre choix, ouvrez le dossier dans votre IDE et exécutez la commande dans le terminal :

    ```bash
    git clone https://github.com/Phisicz/P6-Kasa.git
    ```

2. Maintenant que vous avez cloné le repo, il va falloir installer toutes les dépendances (dans package.json), et pour se faire, exécutez les commandes suivantes :

    ```bash
    yarn
    ```

3. Le projet est maintenant prêt à être lancé en local, pour lancer l'application exécutez ceci :

    ```bash
    yarn start
    ```

Si vous souhaitez avoir votre fork en ligne il faudra le mettre en ligne à l'aide de vercel ou autre hébergeur.

---

🤝 Merci d'avoir consulté ma version de *l'app Kasa* !