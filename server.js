const express = require('express');
const server = express();

const db = require('./db');

/* const ideas = [
    {
        img: 'https://image.flaticon.com/icons/svg/2729/2729073.svg',
        title: 'Cozinhar',
        category: 'Bem Estar',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad odio ipsa earum rem architecto necessitatibus',
        url: 'https://gnosisbrasil.com/introducao-a-meditacao/?gclid=Cj0KCQjwncT1BRDhARIsAOQF9LlK31lEE9h5bQC-NpJm-InhqZNK8OHu7WlKsmKszzXJistgOXU-ChkaAjrrEALw_wcB'  
    }
] */


server.use(express.static('public'));

server.use(express.urlencoded ({ extended: true }));


// Configuração do nunjucks
const nunjucks = require('nunjucks');
nunjucks.configure('views', {
    express: server,
    noCache: true,
})


// Criação de rotas
server.get('/', function(req, res) {

    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err) {
            console.log(err)
            return res.send('Erro no Banco de Dados!');
        }
        const reversedIdeas = [...rows].reverse();
        let lastIdeas = [];

        for (let idea of reversedIdeas) {
            if (lastIdeas.length < 2) {
                lastIdeas.push(idea);
            }
        }

        return res.render('index.html', {ideas: lastIdeas})
    })

    
});

server.get('/ideias', function(req, res) {

    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err) {
            console.log(err);
            return res.send('Erro no Banco de dados')
        }
        const reversedIdeas = [...rows].reverse();
        return res.render('ideias.html', {ideas: reversedIdeas})

    })
});

server.post('/', function(req, res) {
    const query = `
    INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
    ) VALUES (?, ?, ?, ?, ?);`

    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link
    ];

    db.run(query, values, function(err) {
        if (err) {
            console.log(err)
            return res.send('Erro da banco de dados')
        }

        res.redirect('/ideias');
    }) 
});


//Configura o servidor para a porta 3000
server.listen(3000);