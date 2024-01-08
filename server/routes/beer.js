import express from "express";
import Beer from '../models/beerModel.js'
import * as controller from '../controllers/controller.js'

const router = express.Router()


// GET - ALL BEERS 
router.get('/', controller.getBeers)

// GET - ONE BEER 
router.get('/:id', controller.getBeer)

// POST - CREATE A NEW BEER 
router.post('/', controller.createBeer)

// PUT - UPDATE A BEER 
router.put('/:id', controller.updateBeer)

// DELETE - A BEER 
router.delete('/:id', controller.deleteBeer)



export default router