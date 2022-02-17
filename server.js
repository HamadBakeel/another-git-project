const express = require('express');
const server = express();
server.set('view engine', 'ejs')
server.use(express.static(__dirname + '/public'));
server.set('views', __dirname+'/views');
// server.listen(7000);

const servicesIcons =[
    'fas fa-user-shield fa-4x ',
    'fas fa-tools fa-4x',
    'fas fa-map-marked-alt fa-4x',
    'fas fa-laptop-code fa-4x',
    'fas fa-palette fa-4x',
    'fas fa-bullhorn fa-4x'
];
const services =[
    "Security",
    "Fixing issues",
    "Location",
    "Proffisional Coding",
    "Designing",
    "Marketing"
]
server.get('/',(req, res)=>{
    res.render('index',{servicesIcons,services});
});
