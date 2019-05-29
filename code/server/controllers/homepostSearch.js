/* for homepost search */

const Homepost = require('../models/homeposts');

function search(req, res, next) {
  const obj = req.query;
  allHomepost = Homepost.find({state: "Success"})
  .populate({
    path:     'rating',			
    populate: {
        path:  'author',
        model: 'Users'
    }
  })
  .populate('location')
  .then((homes) => {
    // filter price 
    if (obj.hasOwnProperty('price')){
      homes = homes.filter(home => home.weekdayPrice <= obj.price);
    }
    // filter homestay type 
    if (obj.hasOwnProperty('homestayType')){
      homes = homes.filter(home => home.typeHome === obj.homestayType);
    }
    // filter num guests
    if (obj.hasOwnProperty('numGuests')){
      homes = homes.filter(home => home.maxPeoples >= obj.numGuests);
    }
    // filter suitable for chilren or not 
    if (obj.hasOwnProperty('numChildren')){
      if (obj.numChildren > 0)
        homes = homes.filter(home => home.forFamily.includes("Phù hợp với trẻ nhỏ"));
    }
    //filter suitable for chilren or not 
    if (obj.childrenChecked){
      console.log('hihi')
      homes = homes.filter(home =>  home.forFamily.includes("Phù hợp với trẻ nhỏ"));
    }
    // filter smoking home  
    if (obj.noSmokingChecked){
      homes = homes.filter(home => home.forFamily.includes("Không hút thuốc"));
    }
    // filter home is not have bar 
    if (obj.barAvailableChecked){
      homes = homes.filter(home => home.funnyActs.includes("Bar"));
    }
    // filter home is not have nice view 
    if (obj.niceViewChecked){
      homes = homes.filter(home => home.funnyActs.includes("Cảnh quan đẹp"));
    }
    // check pool 
    if (obj.poolAvailableChecked){
      homes = homes.filter(home => home.funnyActs.includes("Bể bơi"));
    }
    // check gym 
    if (obj.gymAvailableChecked){
      homes = homes.filter(home => home.highlightFacs.includes("Phòng tập gym"));
    }
    // check wifi 
    if (obj.wifiAvailableChecked){
      homes = homes.filter(home => home.convenience.includes("Wifi"));
    }

    // for dateCome and dateOut 
    // TODO if booking is available 

    res.status(200).json(homes);
  },err => next(err))
  .catch(err => next(err));
}

module.exports = {
    search,
}
