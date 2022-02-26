const express = require('express');
const Skill = require('./models/skill');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const server = express();
server.set('view engine', 'ejs')
server.use(express.static( 'public'));
server.set('views','views');

server.use(methodOverride('_method'))
server.use(express.urlencoded({extended: false}))

mongoose.connect('mongodb://localhost/portfolio'
    ,() => console.log("database connected successfully")
    ,e => console.error(e));

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

server.get('/', async(_, res)=>{
    const skills = await Skill.find();
    res.render('index',{servicesIcons,services,skills});
});
server.get('/dashboard', async (_, res)=>{
    const skills = await Skill.find();
    res.render('dashboard',{skills: skills});
});


server.post('/', (req,res)=>{
    insertSkill(req,res);
    // const skill = Skill.findOne({skillName: req.body.})
})
server.delete('/:id',async (req,res)=>{
    await Skill.findOneAndDelete(req.params.skillName);
    console.log("mama");
    res.redirect('/dashboard')
})

async function insertSkill (req,res) {
    const skill = new Skill({
        skillName: req.body.skillName,
        percentage: req.body.percentage,
    });
    try{
        await skill.save();
        res.redirect('/dashboard');
    } catch(e){
        res.send("failed to add data");
    }
}


const port = process.env.PORT || 3000
server.listen(port);