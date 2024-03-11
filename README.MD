# Urls API

GET http://10.129.129.116:3000/api/articles/all
GET http://10.129.129.116:3000/api/articles/draft

POST http://10.129.129.116:3000/api/articles

PATCH http://10.129.129.116:3000/api/articles/{idArticle}

PUT http://10.129.129.116:3000/api/articles/{idArticle}

DELETE http://10.129.129.116:3000/api/articles/{idArticle}

# Format des données

## POST, PUT

Tous les champs sont obligatoires

```
{
    name: string,
    price: number
}
```

## PATCH

Un ou plusieurs des champs uniquement si modifiés

```
{
    name: string,
    price: number
}
```
