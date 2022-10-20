<!-- markdownlint-disable MD014 -->

# MERN-stack aplikacija sa CRUD funkcionalnostima

Aplikacija za pregled, dodavanje, uređivanje i brisanje mušterija.

## Inicijalizacija

### Frontend

Inicijalizacija React appa:

```console
$ npx create-react-app frontend
```

Inicijalizacija i instalacija paketa:

```console
$ cd frontend
$ npm init -y
$ npm install react-router-dom bootstrap axios
```

Pokretanje:

```console
$ npm start
```

### Bakcned

Inicijalizacija backenda:

```console
$ mkdir backend
```

Inicijalizacija i instalacija paketa:

```console
$ cd backend
$ npm init -y
$ npm install -g nodemon
$ npm install body-parser cors express mongoose 
```

Pokretanje:

```console
$ nodemon server
```

## MongoDB

Pokretanje servera (CMD as admin):

```console
$ mongod
```

Povezivanje preko shella:

```console
$ mongosh
```
