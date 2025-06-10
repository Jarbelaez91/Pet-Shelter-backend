// const petsData = require ("../data/pets.js")

const Pet = require ("../models/petModel")

const getAllPets = async (req, res, next) => {

    try{
        const pets = await Pet.find ({})
        return res.status (200).json ({
            success: {message: "This route points to all the pets"},
            data: {pets},
            statusCode:200,
        }) 
    } catch (error) {
        return next (error)
    }
}

const getPet = async (req,res,next) => {
    const {id} = req.params

    try{
        if (!id){
            throw new Error ("Id is required")
        }
        const pet = await Pet.findById(id)
        if (!pet){
            throw new Error 
        }
        return res.status(200).json({
      success: { message: "Pet found" },
      data: { pet },
        })

    } catch (error) {
       return next (error)
    }
}


const createPet = async (req,res,next) => {
    const {name,species,age,image} = req.body

    try {
        if (!name|| !species || !age) {
            throw new Error ("missing required fields, please review")
    }

    const newPet = {
        name,
        species,
        age,
        image
    }
    await newPet.save()
    
    return res.status(201).json ({
        success: {message: "a new pet was created"},
        data: {newPet},
        statusCode:201,
    })

    } catch (error) {
     return next (error)
        }
}


const updatePet = async (req, res, next) => {
    const {id} = req.params;
    const {name, species, age, image} = req.body

    try {

        if (!name, species,age){
            throw new Error ("missing required fields")
        }

        const updatePet = await Pet.findByIdAndUpdate
        id,(
            {
                $set:{
            name,
            species,
            age,
            image
        }
    },
    {new: true}
        )
         if (!updatePet){
            throw new Error ("pet not found")
        }

        return res.status (201).json ({
            success: { message: "The pet is updated"},
            data: {updatePet},
            statusCode: 201,
        })

    }catch (error) {
        return next (error)
    }
}

const deletePet = async (req, res, next) => {
    const {id} = req.params

    try{
        if (!id) {
            throw new Error ("id is required")
        }

        await Pet.findByIdAndDelete(id)

        return res.status(200).json ({
            success: {message: "book deleted"} ,
            statusCode: 200,
        })
    } catch (error) {
       return  next (error)
    }
}



module.exports = {getAllPets, getPet, createPet, updatePet, deletePet}