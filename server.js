const express = require('express');
const Skill = require('./models/skill');
const mongoose = require('mongoose');
// import {express} from 'express'
// import {Skill} from './models/skill'
// import {mongoose} from 'mongoose'
const server = express();
server.set('view engine', 'ejs')
server.use(express.static( 'public'));
server.set('views','views');

server.use(express.urlencoded({extended: false}))

mongoose.connect('mongodb://localhost/portfolio'
    ,(db) => {
        // if (err) throw err;
        // var dbo = db.db("portfolio");
        // dbo.collection("skills").find({}).toArray((err, result)=> console.log(result))
        console.log("database connected successfully");
        
        // const skill =  Skill.findOne({skillName: 'a name'}).select('percentage skillName');
    }
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

server.get('/', (_, res)=>{
    // const skills = mongoose.model('skills',skillSchema);
    // console.log(skills.find());
    res.render('index',{servicesIcons,services});
});
server.get('/dashboard', async (_, res)=>{
    const skill = await Skill.find({ skillName: 'zero skill'}).exec();
    console.log(skill.skillName);
    res.render('dashboard');
});


server.post('/',async (req,res)=>{
    const skill = new Skill({
        skillName: req.body.skillName,
        percentage: req.body.percentage,
    });
    try{
        await skill.save(()=> {
            // console.log("data added successfully  "+req.body.skillName,"  ",req.body.percentage);
            console.log(skill);
        });
        res.redirect('/dashboard');
    } catch(e){
        res.send("failed to add data");
    }
})




const port = process.env.PORT || 3000
server.listen(port);