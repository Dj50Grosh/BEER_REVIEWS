import Beer from '../models/beerModel.js'
import mongoose from 'mongoose'

//GET - ALL BEERS
export const getBeers = async (req, res) => {
    const beers = await Beer.find({}).sort({createdAt: -1})
    res.status(200).json(beers)
}

//GET - ONE BEER
export const getBeer = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'This beer does not exist'})
    }
    const beer = await Beer.findById(id)
    if(!beer) {
        return res.status(404).json({error: 'This beer does not exist'})
    }
    res.status(200).json(beer)
}

//POST - CREATE A NEW BEER
export const createBeer = async (req, res) => {
        const {title, brewer, rating, reviews} = req.body
        let emptyFields = []

        if(!title) {emptyFields.push('title')}
        if(!brewer) {emptyFields.push('brewer')}
        if(!rating) {emptyFields.push('rating')}
        // if(!reviews) {emptyFields.push('reviews')}
        if(emptyFields.length > 0) {
            return res.status(400).json({error: 'All fields must be filled in', emptyFields})
        }
        
        try {
            const beer = await Beer.create({title, brewer, rating, reviews})
            res.status(200).json(beer) 
        } catch(error) {
            res.status(400).json({error: error.message})
        }
    }

// PUT - UPDATE A BEER
export const updateBeer = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'This beer does not exist'})
    }
    const beer = await Beer.findOneAndUpdate({_id: id}, {...req.body})
    if(!beer) {
        return res.status(404).json({error: 'This beer does not exist'})
    }
    res.status(200).json(beer)
}

// DELETE - A BEER
export const deleteBeer = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'This beer does not exist'})
    }
    const beer = await Beer.findOneAndDelete({_id: id})
    if(!beer) {
        return res.status(404).json({error: 'This beer does not exist'})
    }
    res.status(200).json(beer)
}

