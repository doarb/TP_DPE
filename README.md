# DPE

## Description



## Installation

Instructions sur comment installer et configurer votre projet.

```bash
git clone https://github.com/doarb/TP_DPE.git
cd TP_DPE
npm install
```

# Utilisation

Le projet peut contenir différentes routes pour récupérer des informations, telles que les détails d'un logement avec son DPE, GES et sa géolocalisation, ainsi que pour la gestion de la connexion et l'accès aux anciennes recherches.

## Routes d'Authentification

- `POST /api/v1/auth/login` : Permet la connexion d'un utilisateur existant.

## Routes d'Utilisateur

- `GET /api/v1/users/me` : Récupère les informations de l'utilisateur actuellement connecté.
  
- `POST /api/v1/users/create` : Crée un nouvel utilisateur.

## Routes Recherche DPE ou GES et Géolocalisation
  
- `POST /api/v1/dpe/search` : Recherche un logement en vente avec son DPE, GES et sa géolocalisation, prenant en paramètre d'autres informations sur le logement.

## Routes Recherche des Anciennes Requêtes

- `GET /api/v1/searches/me` : Recherche les anciennes recherches effectuées par l'utilisateur courant.

- `DELETE /api/v1/searches/del/:id` : Supprime la recherche de l'utilisateur en fonction de l'ID fourni.

- `GET /api/v1/searches/reload/:id` : Relance la recherche de l'utilisateur en fonction de l'ID.

### Start
```bash
npm start
```
### Test
```bash
npm test
```


