const express = require("express");
const Skill = require("./models/skill");
const Service = require("./models/service");
const PersonalInfo = require("./models/personalInfo");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const server = express();
server.set("view engine", "ejs");
server.use(express.static("public"));
server.set("views", "views");

const serviceRouter = require("./routes/services");
const skillRouter = require("./routes/skills");
const read = require("body-parser/lib/read");
server.use("/services", serviceRouter);
server.use("/skills", skillRouter);

server.use(methodOverride("_method"));
server.use(express.urlencoded({}));

mongoose.connect(
    "mongodb://localhost/portfolio",
    () => console.log("database connected successfully"),
    (e) => console.error(e)
);

const servicesIcons = [
    "fas fa-user-shield fa-4x ",
    "fas fa-tools fa-4x",
    "fas fa-map-marked-alt fa-4x",
    "fas fa-laptop-code fa-4x",
    "fas fa-palette fa-4x",
    "fas fa-bullhorn fa-4x",
];
const services = [
    "Security",
    "Fixing issues",
    "Location",
    "Proffisional Coding",
    "Designing",
    "Marketing",
];

server.get("/", async(_, res) => {
    const skills = await Skill.find();
    // const personalInfo = await PersonalInfo.find();
    res.render("index", { servicesIcons, services, skills });
});

server.get("/dashboard", async(_, res) => {
    const skills = await Skill.find();
    const services = await Service.find();
    const personalInfo = await PersonalInfo.find();
    console.log(personalInfo);
    res.render("dashboard", {
        skills: skills,
        services: services,
        personalInfo: personalInfo,
    });
});

server.post('/updatePersonalInfo', async(req, res) => {
    const ss = await PersonalInfo.find();
    // console.log(ss[0]);
    await PersonalInfo.updateOne({
            _id: req.body.id.replace(/ /g, "")
        }, {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            Address: {
                country: req.body.country,
                city: req.body.city,
                street: req.body.street
            },
            phoneNumbers: {
                work: req.body.work,
                home: req.body.home
            },
            jobTitle: req.body.jobTitle
        },
        function(err, docs) {
            if (err) {
                console.log(err);
            } else {
                console.log("Updated User : ", docs);
            }
        }).clone();
    res.redirect('/dashboard')
});
const port = process.env.PORT || 3000;
server.listen(port);