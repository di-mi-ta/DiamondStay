import moment from 'moment';

export const time = {
  serialize: function(input) {
    // input is string or moment object
    return moment(input).format('DD-MM-YYYY');
  },
  deserializeToMoment: function(input) {
    return moment(input, 'DD-MM-YYYY');
  },
  deserializeToDate: function(input) {
    return moment(input, 'DD-MM-YYYY').toDate();
  }
};
