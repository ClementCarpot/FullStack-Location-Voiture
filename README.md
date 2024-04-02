# Projet de Location de Véhicule

Ce projet consiste en une application de location de véhicules, comprenant à la fois un backend développé avec Java Spring pour l'API et un frontend en React pour l'interface utilisateur.

## Fonctionnalités

L'application offre les fonctionnalités suivantes :

-   **Inscription et Authentification**: Les utilisateurs peuvent s'inscrire et se connecter pour accéder à leur compte.
-   **Gestion des Utilisateurs**: Les utilisateurs peuvent mettre à jour leurs informations personnelles.
-   **Gestion des Véhicules**: Les administrateurs peuvent ajouter, supprimer et modifier des informations sur les véhicules disponibles à la location.
-   **Réservation de Véhicules**: Les utilisateurs peuvent réserver un véhicule pour une période donnée.
-   **Historique des Réservations**: Les utilisateurs peuvent consulter leur historique de réservations passées.

## Technologies Utilisées

-   **Backend**:
    -   Java Spring Boot
    -   Spring MVC pour la gestion des requêtes HTTP
    -   Spring Security pour l'authentification et l'autorisation
    -   Spring Data JPA pour la couche d'accès aux données
    -   MySQL pour la base de données
-   **Frontend**:
    -   React.js pour la construction de l'interface utilisateur
    -   React Router pour la gestion des routes
    -   Material-UI pour les composants d'interface utilisateur

## Configuration et Installation

### Backend

1. Clonez le dépôt GitHub du backend de l'application.
2. Assurez-vous d'avoir Java JDK et Apache Maven installés sur votre système.
3. Configurez votre base de données MySQL et mettez à jour les informations de connexion dans le fichier `src/main/resources/application.yaml`.
4. Exécutez `mvn clean install` pour télécharger les dépendances et construire le projet.
5. Exécutez l'application à l'aide de votre IDE ou avec la commande `mvn spring-boot:run`.

### Frontend

1. Clonez le dépôt GitHub du frontend de l'application.
2. Assurez-vous d'avoir Node.js et npm installés sur votre système.
3. Exécutez `npm install` pour installer les dépendances.
4. Mettez à jour les URL de l'API backend dans les fichiers nécessaires.
5. Lancez l'application avec la commande `npm start`.

## Contributeurs

Ce projet est développé et maintenu par Clément CARPOT.

## Licence

Ce projet est sous licence MIT.
