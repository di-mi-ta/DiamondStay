/* for homepost search */

const Homepost = require('../models/homeposts');

function search(req, res, next) {
  const query = getCleanQueryObject(req.query);
  let searchObject = {
    state: "Success"
  };
  if (query.hasOwnProperty('homestayName')) {
    searchObject = {
      ...searchObject,
      $text: {
        $search: query.homestayName
      }
    };
  }
  // TODO homestayName
  allHomepost = Homepost.find(searchObject)
  .populate({
    path:     'rating',
    populate: {
        path:  'author',
        model: 'Users'
    }
  })
  .populate('location')
  .then((homes) => {
    // Homestay critera
    if (query.hasOwnProperty('homestayType'))
      homes = homes.filter(home => home.typeHome === query.homestayType);
    if (query.hasOwnProperty('roomType'))
      homes = homes.filter(home => home.typeRoom === query.roomType);
    if (query.hasOwnProperty('price'))
      homes = homes.filter(home => home.weekdayPrice <= query.price);
    if (query.hasOwnProperty('numBed'))
      homes = homes.filter(home => home.numBed >= query.numBed);

    // Family criteria
    if (query.hasOwnProperty('numGuests'))
      homes = homes.filter(home => home.maxPeoples >= query.numGuests);
    if (query.hasOwnProperty('numChildren') && query.numChildren > 0)
      homes = homes.filter(home => home.forFamily.includes("Phù hợp với trẻ nhỏ"));
    if (query.hasOwnProperty('childrenChecked'))
      homes = homes.filter(home =>  home.forFamily.includes("Phù hợp với trẻ nhỏ"));
    if (query.hasOwnProperty('extraBedChecked'))
      homes = homes.filter(home => home.forFamily.includes("Đệm bổ sung"));
    if (query.hasOwnProperty('noSmokingChecked'))
      homes = homes.filter(home => home.forFamily.includes("Không hút thuốc"));

    // Kitchen criteria
    if (query.hasOwnProperty('electricKitchenChecked'))
      homes = homes.filter(home => home.kitchenFacs.includes('Bếp điện'));
    if (query.hasOwnProperty('gasKitchenChecked'))
      homes = homes.filter(home => home.kitchenFacs.includes('Bếp ga'));
    if (query.hasOwnProperty('microwaveChecked'))
      homes = homes.filter(home => home.kitchenFacs.includes('Lò vi sóng'));
    if (query.hasOwnProperty('freezerChecked'))
      homes = homes.filter(home => home.kitchenFacs.includes('Tủ lạnh'));

    // Entertainment
    if (query.hasOwnProperty('forPetChecked'))
      homes = homes.filter(home => home.funnyActs.includes('Cho thú cưng'));
    if (query.hasOwnProperty('bbqAvailableChecked'))
      homes = homes.filter(home => home.funnyActs.includes('BBQ'));
    if (query.hasOwnProperty('niceViewChecked'))
      homes = homes.filter(home => home.funnyActs.includes('Cảnh quan đẹp'));
    if (query.hasOwnProperty('toBeachChecked'))
      homes = homes.filter(home => home.funnyActs.includes('Hướng biển'));
    if (query.hasOwnProperty('nearGolfChecked'))
      homes = homes.filter(home => home.funnyActs.includes('Gần sân golf'));
    if (query.hasOwnProperty('fishingChecked'))
      homes = homes.filter(home => home.funnyActs.includes('Câu cá'));
    if (query.hasOwnProperty('poolAvailableChecked'))
      homes = homes.filter(home => home.funnyActs.includes('Bể bơi'));
    if (query.hasOwnProperty('barChecked'))
      homes = homes.filter(home => home.funnyActs.includes('Bar'));

    // Room criteria
    if (query.hasOwnProperty('balconyChecked'))
      homes = homes.filter(home => home.roomFacs.includes('Ban công'));

    // Convenience
    if (query.hasOwnProperty('wifiChecked'))
      homes = homes.filter(home => home.convenience.includes('Wifi'));
    if (query.hasOwnProperty('tiviChecked'))
      homes = homes.filter(home => home.convenience.includes('Tivi'));
    if (query.hasOwnProperty('conditionerChecked'))
      homes = homes.filter(home => home.convenience.includes('Điều hòa'));
    if (query.hasOwnProperty('washerChecked'))
      homes = homes.filter(home => home.convenience.includes('Máy giặt'));
    if (query.hasOwnProperty('convenienceChecked'))
      homes = homes.filter(home => home.convenience.includes('Dầu gội, dầu xã'));
    if (query.hasOwnProperty('waterChecked'))
      homes = homes.filter(home => home.convenience.includes('Nước khoáng'));
    if (query.hasOwnProperty('elevatorChecked'))
      homes = homes.filter(home => home.convenience.includes('Thang máy'));
    if (query.hasOwnProperty('dryerChecked'))
      homes = homes.filter(home => home.convenience.includes('Máy sấy'));

    // Highlight criteria
    if (query.hasOwnProperty('projectorChecked'))
      homes = homes.filter(home => home.highlightFacs.includes('Máy chiếu phim'));
    if (query.hasOwnProperty('massagerChecked'))
      homes = homes.filter(home => home.highlightFacs.includes('Ghế massage'));
    if (query.hasOwnProperty('smartTiviChecked'))
      homes = homes.filter(home => home.highlightFacs.includes('Smart tivi'));

    // for dateCome and dateOut
    // TODO if booking is available

    res.status(200).json({ homes });
  })
  .catch(err => {
    res.status(500).json({
      err: {
        type: 'ServerError',
        message: 'Lỗi server',
        detail: err
      }
    })
  });
}

function getCleanQueryObject(query) {
  query = {...query};
  const numericProps = ['price', 'numBed', 'numGuests', 'numChildren'];
  numericProps.forEach((prop) => {
    if (query.hasOwnProperty(prop)) {
      query[prop] = Number(query[prop]);
    }
  });
  return query;
}

module.exports = {
    search,
}
