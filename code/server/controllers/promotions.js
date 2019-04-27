import mongoose, { SchemaType, SchemaTypes } from 'mongoose'; 

const Users = mongoose.model('Users');
const Promotions = mongoose.model('Promotions');
const Messages = mongoose.model('Messages');
const Reservations = mongoose.model('Reservations');
const HomePosts = mongoose.model('HomePosts');

export const createNewHostPromotion =  () => {
    /* This function to add new host promotions */
    // TODO 
}

export const createNewSystemPromotion =  () => {
    /* This function to add new system promotions */
    // TODO 
}

export const updatePromotion =  () => {
    // TODO 
}

export const deletePromotion =  () => {
    // TODO 
}