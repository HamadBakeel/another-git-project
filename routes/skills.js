const express = require("express");
const Skill = require("../models/skill");
const router = express.Router();
const methodOverride = require("method-override");
router.use(methodOverride("_method"));
router.use(express.urlencoded()); //Parse URL-encoded bodies

router.post("/", async (req, res) => {
  const skill = new Skill({
    skillName: req.body.skillName,
    percentage: req.body.percentage,
  });
  try {
    await skill.save();
    res.redirect("/dashboard");
  } catch (e) {
    res.send("failed to add data");
  }
});

router.delete("/:id", async (req, res) => {
  await Skill.findByIdAndDelete(req.params.id.replace(/ /g, ""));
  res.redirect("/dashboard");
});

router.post("/edit/:id", async (req, res) => {
  const skill = await Skill.findById(req.params.id.replace(/ /g, ""));
  res.render("editSkill", {
    skillName: skill.skillName,
    skillPercentage: skill.percentage,
    id: skill.id,
  });
});
router.post("/updateSkill", async (req, res) => {
  await Skill.updateOne(
    {
      _id: req.body.id.replace(/ /g, ""),
    },
    {
      skillName: req.body.skillName,
      percentage: req.body.skillPercentage,
    },
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log("Updated User : ", docs);
      }
    }
  ).clone();
  res.redirect("/dashboard");
});
router.post("/disable/:id", async (req, res) => {
  const ss = await Skill.findById(req.params.id.replace(/ /g, ""));
  console.log(ss.isDeleted);
  await Skill.updateOne(
    {
      _id: req.params.id.replace(/ /g, ""),
    },
    {
      isDeleted: !ss.isDeleted,
    },
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log("Updated User : ", docs);
      }
    }
  ).clone();
  console.log(ss.isDeleted);
  res.redirect("/dashboard");
});
router.get("/cancelUpdate", (req, res) => {
  res.redirect("/dashboard");
});

module.exports = router;
