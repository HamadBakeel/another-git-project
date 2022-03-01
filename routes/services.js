const express = require("express");
const router = express.Router();
const Service = require("../models/service");
const methodOverride = require("method-override");
router.use(methodOverride("_method"));

router.use(express.urlencoded()); //Parse URL-encoded bodies

router.get("/insertService", (req, res) => {
  res.render("services");
});

router.post("/insertService", async (req, res) => {
  console.log(typeof req.body.serviceDescription);

  const service = new Service({
    serviceName: req.body.serviceName,
    serviceDescription: req.body.serviceDescription,
    servedClients: req.body.servedClients,
  });
  try {
    await service.save();
    res.redirect("/dashboard");
  } catch (e) {
    res.send("failed to add service");
  }
});


router.delete("/:id", async (req, res) => {
    
  console.log( req.params.id.length);
  console.log( req.params.id);
  await Service.findByIdAndDelete(req.params.id.replace(/ /g, ""));
  res.redirect("/dashboard");
});

router.post('/edit/:id',async(req,res)=>{
  const service =   await Service.findById(req.params.id.replace(/ /g, ""));
  console.log(service.servedClients);
  res.render('editService',
  {
    serviceName: service.serviceName,
    serviceDescription: service.serviceDescription, 
    servedClients: service.servedClients,
    id: service.id
});
});
router.post('/update',async(req,res)=>{
  console.log(req.body.id," from update button");
  await Service.updateOne({
    _id: req.body.id.replace(/ /g,"")
        },{ 
            serviceName: req.body.serviceName,
            serviceDescription: req.body.serviceDescription,
            servedClients: req.body.servedClients
            },
            function (err, docs) {
              if (err){
                  console.log(err);
              }
              else{
                  console.log("Updated User : ", docs);
              }
            }).clone();

    res.redirect('/dashboard')
});


router.post('/disable/:id',async(req,res)=>{
  const ss = await Service.findById(req.params.id.replace(/ /g, ""));
  console.log(ss.isDeleted);
    await Service.updateOne({
    _id: req.params.id.replace(/ /g,"")
        },{ 
            isDeleted: !ss.isDeleted
            },
            function (err, docs) {
              if (err){
                  console.log(err);
              }
              else{
                  console.log("Updated User : ", docs);
              }
            }).clone();
    res.redirect('/dashboard')
})
module.exports = router;
