const petsData = require ("../data/pets.js")

const getAllPets = async (req, res, next) => {

    try{
        const pets = petsData
        return res.status (200).json ({
            success: {message: "This route points to all the pets"},
            data: {pets},
            statusCode:200,
        }) 
    } catch (error) {
        return res.status (400).json ({
            error: { message: "resource not found. Search again"},
            statusCode: 400
        })
    }
}

const getPet = async (req,res,next) => {
    const {id} = req.params

    try{
        const pet = petsData.find ((pet) => pet._id === Number(id))
        return res.status (200).json ({
            success: {message: "Pet found"},
            data: {pet},
            statusCode:200
        })
    } catch (error) {
        return res.status (400).json ({
            error: { message: "there is an error when retrieving a pet"},
            statusCode: 400
        })
    }
}

const createPet = async (req,res,next) => {
    const {name,species,age,image} = req.body

    const newPet = {
        name,
        species,
        age,
        image
    }
    try {
        petsData.push(newPet)

        return res.status(201).json ({
            success: {message: "a new pet was created"},
            data: {newPet},
            statusCode: 201
        })
    } catch (error) {
        return res.status(400).json({
        error: {message: "there was an error when creating a book"},
        statusCode: 400
        })
    }
}

const updatePet = async (req, res, next) => {
    const {id} = req.params;
    const {name, species, age, image} = req.body
    try {
        const updatePet = {
            name,
            species,
            age,
            image
        }

        const foundPetIndex = petsData.findIndex ((pet) => pet._id === id)
        petsData[foundPetIndex] = updatePet

        return res.status (201).json ({
            success: { message: "The pet is updated"},
            data: {updatePet},
            statusCode: 201,
        })

    }catch (error) {
        return res.status (400).json ({
            error: { message: "There is an error when updating a pet"},
            statusCode: 400,
        })
    }
}

const deletePet = async (req, res, next) => {
    const {id} = req.params

    try{
        const eraser = petsData.filter((pet) => pet.id !== id)
        console.log(eraser)

        return res.status(200).json ({
            success: {message: "pet deleted"} ,
            statusCode: 200,
        })
    } catch (error) {
        return res.status (400).json ({
            error: {message: "There is an error when deleting a pet"},
            statusCode: 400,
        })
    }
}



module.exports = {getAllPets, getPet, createPet, updatePet, deletePet}

