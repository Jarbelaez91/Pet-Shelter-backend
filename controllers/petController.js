const petsData = require ("..data/pets.js")

const getAllPets = async (req, res, next) => {

    try{
        const pets = petsData
        return res.status (200).json ({
            success: {message: "This route points to all the pets"},
            data: {pets},
            statsCode:200,
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
        const pet = petsData.find ((pet) => pet.id === id )
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
    const {name,species,age,image} = request.body

    const newPet = {
        name,
        species,
        age,
        image
    }
    try {
        petsData.push(newPet)

        return response.status(201).json ({
            success: {message: "a new pet was created"},
            data: {newPet},
            statsCode: 201
        })
    } catch (error) {
        return response.status(400).json({
        error: {message: "there was an error when creating a book"},
        statsCode: 400
        })
    }
}

const updatePet = async (request, response, next) => {
    const {id} = request.params;
    const {name, species, age, image} = request.body
    try {
        const updatePet = {
            name,
            species,
            age,
            image
        }

        const foundPetIndex = petsData.findIndex ((pet) => pet.id === id)
        petsData[foundPetIndex] = updatePet

        return response.status (201).json ({
            success: { message: "The pet is updated"},
            data: {updatePet},
            statusCode: 201,
        })

    }catch (error) {
        return response.status (400).json ({
            error: { message: "There is an error when updating a pet"},
            statusCode: 400,
        })
    }
}

const deletePet = async (request, response, next) => {
    const {id} = request.params

    try{
        const eraser = petsData.filter((pet) => pet.id !== id)
        console.log(eraser)

        return response.status(200).json ({
            success: {message: "pet deleted"} ,
            statusCode: 200,
        })
    } catch (error) {
        return response.status (400).json ({
            error: {message: "There is an error when deleting a pet"},
            statusCode: 400,
        })
    }
}



module.exports = {getAllPets, getPet, createPet, updatePet, deletePet}

