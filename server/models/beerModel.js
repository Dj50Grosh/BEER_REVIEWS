import mongoose from 'mongoose'

const Schema = mongoose.Schema

const reviewSchema = new Schema({
    reviewerName: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
}, { timestamps: true })

const beerSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    brewer: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    reviews: [reviewSchema]
}, {timestamps:true})

export default mongoose.model('Beer', beerSchema)