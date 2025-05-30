const express = require("express")

const { getAllPets, getPet, createPet, updatePet, deletePet } = require("../controllers/petController");

const router = express.Router()

router.get ("/", getAllPets)


router.get ("/:id", getPet)



router.post ("/create/new", createPet) 


router.put ("/update/:id", updatePet)


router.delete ("/delete/:id", deletePet)


module.exports = router