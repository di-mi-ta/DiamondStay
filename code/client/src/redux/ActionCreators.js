import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

// for authentication 
export const requestLogin = (creds) => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        creds
    }
}

export const receiveLogin = (response) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: response.token
    }
}

export const loginError = (message) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
}

export const loginUser = (creds) => (dispatch) => {
    dispatch(requestLogin(creds))
    return fetch(baseUrl + 'users/login', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(creds)
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            throw error;
        })
    .then(response => response.json())
    .then(response => {
        if (response.success) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('creds', JSON.stringify(creds));
            dispatch(fetchFavorites());
            dispatch(receiveLogin(response));
        }
        else {
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error => {alert(error);dispatch(loginError(error.message))})
};

export const requestLogout = () => {
    return {
      type: ActionTypes.LOGOUT_REQUEST
    }
}

export const receiveLogout = () => {
    return {
      type: ActionTypes.LOGOUT_SUCCESS
    }
}

export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout())
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    dispatch(favoritesFailed("Error 401: Unauthorized"));
    dispatch(receiveLogout())
}


// for Promotions 
export const fetchHostPromos = (username) => (dispatch) => {
    dispatch(hostPromosLoading(true));
    return fetch(baseUrl + 'host-promotions?username=' + username)
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(promos => dispatch(addHostPromos(promos)))
        .catch(error => dispatch(promosFailed(error.message)));
}

export const fetchSystemPromos = () => (dispatch) => {
    dispatch(systemPromosLoading(true));
    return fetch(baseUrl + 'system-promotions')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(promos => dispatch(addSystemPromos(promos)))
        .catch(error => dispatch(promosFailed(error.message)));
}

export const addHostPromos = (promos) => ({
    type: ActionTypes.ADD_HOST_PROMOS,
    payload: promos
});

export const addSystemPromos = (promos) => ({
    type: ActionTypes.ADD_SYSTEM_PROMOS,
    payload: promos
});

export const hostPromosLoading = () => ({
    type: ActionTypes.HOST_PROMOS_LOADING
});

export const systemPromosLoading = () => ({
    type: ActionTypes.SYSTEM_PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addHostPromo = (promo) => ({
    type: ActionTypes.ADD_HOST_PROMO,
    payload: promo
});

export const addSystemPromo = (promo) => ({
    type: ActionTypes.ADD_SYSTEM_PROMO,
    payload: promo
<<<<<<< HEAD
});

export const updateSystemPromo = (promo) => ({
    type: ActionTypes.UPDATE_SYSTEM_PROMO,
    payload: promo
});

=======
});

export const updateSystemPromo = (promo) => ({
    type: ActionTypes.UPDATE_SYSTEM_PROMO,
    payload: promo
});

>>>>>>> tan-branch
export const updateHostPromo = (promo) => ({
    type: ActionTypes.UPDATE_HOST_PROMO,
    payload: promo
});
<<<<<<< HEAD

export const deleteSystemPromo = (promoId) => ({
    type: ActionTypes.DELETE_SYSTEM_PROMO,
    payload: promoId
});

=======

export const deleteSystemPromo = (promoId) => ({
    type: ActionTypes.DELETE_SYSTEM_PROMO,
    payload: promoId
});

>>>>>>> tan-branch
export const deleteHostPromo = (promoId) => ({
    type: ActionTypes.DELETE_HOST_PROMO,
    payload: promoId
});

export const fetchDeleteHostPromo = (promoId) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
        fetch(baseUrl + 'host-promotions/' + promoId, {
            method: "DELETE",
            headers: {
            'Authorization': bearer,
            credentials: "same-origin"
            },
        })
        .then(response => {
            if (response.ok) {
            return response;
            } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
            }
        },
        error => {
<<<<<<< HEAD
                throw error;
        })
        .then(response => response.json())
        .then((promo)=> dispatch(deleteHostPromo(promo)))
        .catch(error => dispatch(promosFailed(error.message)));
}

export const fetchDeleteSystemPromo = (promoId) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
        fetch(baseUrl + 'system-promotions/' + promoId, {
            method: "DELETE",
            headers: {
            'Authorization': bearer,
            credentials: "same-origin"
            },
        })
        .then(response => {
            if (response.ok) {
            return response;
            } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
            }
        },
        error => {
                throw error;
        })
        .then(response => response.json())
        .then((promo)=> dispatch(deleteSystemPromo(promo)))
        .catch(error => dispatch(promosFailed(error.message)));
}

export const fetchUpdateHostPromo = (updatedPromo) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
        fetch(baseUrl + 'host-promotions/' + updatedPromo._id, {
            method: "PUT",
            body: JSON.stringify(updatedPromo),
            headers: {
            "Content-Type": "application/json",
=======
                throw error;
        })
        .then(response => response.json())
        .then((promo)=> dispatch(deleteHostPromo(promo)))
        .catch(error => dispatch(promosFailed(error.message)));
}

export const fetchDeleteSystemPromo = (promoId) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
        fetch(baseUrl + 'system-promotions/' + promoId, {
            method: "DELETE",
            headers: {
>>>>>>> tan-branch
            'Authorization': bearer,
            credentials: "same-origin"
            },
        })
        .then(response => {
            if (response.ok) {
            return response;
            } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
            }
        },
        error => {
                throw error;
<<<<<<< HEAD
=======
        })
        .then(response => response.json())
        .then((promo)=> dispatch(deleteSystemPromo(promo)))
        .catch(error => dispatch(promosFailed(error.message)));
}

export const fetchUpdateHostPromo = (updatedPromo) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
        fetch(baseUrl + 'host-promotions/' + updatedPromo._id, {
            method: "PUT",
            body: JSON.stringify(updatedPromo),
            headers: {
            "Content-Type": "application/json",
            'Authorization': bearer,
            credentials: "same-origin"
            },
        })
        .then(response => {
            if (response.ok) {
            return response;
            } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
            }
        },
        error => {
                throw error;
>>>>>>> tan-branch
        })
        .then(response => response.json())
        .then((promo)=> dispatch(updateHostPromo(promo)))
        .catch(error => dispatch(promosFailed(error.message)));
}

export const fetchUpdateSystemPromo = (updatedPromo) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
        fetch(baseUrl + 'system-promotions/' + updatedPromo._id, {
            method: "PUT",
            body: JSON.stringify(updatedPromo),
            headers: {
            "Content-Type": "application/json",
            'Authorization': bearer,
            credentials: "same-origin"
            },
        })
        .then(response => {
            if (response.ok) {
            return response;
            } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
            }
        },
        error => {
                throw error;
        })
        .then(response => response.json())
        .then((promo)=> dispatch(updateSystemPromo(promo)))
        .catch(error => dispatch(promosFailed(error.message)));
}

export const fetchCreateHostPromo = (promo) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
        fetch(baseUrl + 'host-promotions/', {
            method: "POST",
            body: JSON.stringify(promo),
            headers: {
            "Content-Type": "application/json",
            'Authorization': bearer,
            credentials: "same-origin"
            },
        })
        .then(response => {
            if (response.ok) {
            return response;
            } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
            }
        },
        error => {
                throw error;
        })
        .then(response => response.json())
        .then((promo)=> dispatch(addHostPromo(promo)))
        .catch(error => dispatch(promosFailed(error.message)));
}

export const fetchCreateSystemPromo = (promo) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
        fetch(baseUrl + 'system-promotions/', {
            method: "POST",
            body: JSON.stringify(promo),
            headers: {
            "Content-Type": "application/json",
            'Authorization': bearer,
            credentials: "same-origin"
            },
        })
        .then(response => {
            if (response.ok) {
            return response;
            } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
            }
        },
        error => {
                throw error;
        })
        .then(response => response.json())
        .then((promo)=> dispatch(addSystemPromo(promo)))
        .catch(error => dispatch(promosFailed(error.message)));
}


// for homepost 
<<<<<<< HEAD
export const updateCurrentHomepost = (homepost) => ({
    type: ActionTypes.UPDATE_CURRENT_HOMEPOST,
    payload: homepost
})

=======
>>>>>>> tan-branch
export const addHomeposts = (homeposts) => ({
    type: ActionTypes.ADD_HOMEPOSTS,
    payload: homeposts
});

export const addHomepost = (homepost) => ({
    type: ActionTypes.ADD_HOMEPOST,
    payload: homepost
});

export const updateHomepost = (homepost) => ({
    type: ActionTypes.UPDATE_HOMEPOST,
    payload: homepost
});

export const homepostsLoading = () => ({
    type: ActionTypes.HOMEPOSTS_LOADING
});

export const homepostsFailed = (errmess) => ({
    type: ActionTypes.HOMEPOSTS_FAILED,
    payload: errmess
});

export const fetchUpdateHomepost = (homepost) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
        fetch(baseUrl + 'homeposts/' + homepost._id, {
            method: "PUT",
            body: JSON.stringify(homepost),
            headers: {
            "Content-Type": "application/json",
            'Authorization': bearer,
            credentials: "same-origin"
            },
        })
        .then(response => {
            if (response.ok) {
            return response;
            } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
            }
        },
        error => {
                throw error;
        })
        .then(response => response.json())
        .then((homepost)=> dispatch(updateHomepost(homepost)))
        .catch(error => dispatch(homepostsFailed(error.message)));
}

<<<<<<< HEAD
export const fetchHomeposts = (query='') => (dispatch) => {
    return fetch(baseUrl + 'homeposts' + query)
=======
export const fetchHomeposts = () => (dispatch) => {
    dispatch(homepostsLoading(true));
    return fetch(baseUrl + 'homeposts')
>>>>>>> tan-branch
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(homeposts => dispatch(addHomeposts(homeposts)))
        .catch(error => dispatch(homepostsFailed(error.message)));
}

export const fetchCreateHomepost = (homepost) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
        fetch(baseUrl + 'homeposts', {
            method: "POST",
            body: JSON.stringify(homepost),
            headers: {
            "Content-Type": "application/json",
            'Authorization': bearer,
            credentials: "same-origin"
            },
        })
        .then(response => {
            if (response.ok) {
            return response;
            } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
            }
        },
        error => {
                throw error;
        })
        .then(response => response.json())
        .then((promo)=> dispatch(addHomepost(homepost)))
        .catch(error => dispatch(homepostsFailed(error.message)));
}

<<<<<<< HEAD
=======

>>>>>>> tan-branch
// for ratings
export const addRating = (rating) => ({
    type: ActionTypes.ADD_RATING,
    payload: rating
});

export const postRating = (homepostId, rating, comment) => (dispatch) => {

    const newRating = {
        homepost: homepostId,
        rating: rating,
        comment: comment
    }
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'ratings', {
        method: 'POST',
        body: JSON.stringify(newRating),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(addRating(response)))
    .catch(error => { console.log('Post ratings ', error.message);
        alert('Your rating could not be posted\nError: '+ error.message); })
}

export const fetchRatings = () => (dispatch) => {
    return fetch(baseUrl + 'ratings')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(ratings => dispatch(addRatings(ratings)))
        .catch(error => dispatch(ratingsFailed(error.message)));
}

export const ratingsFailed = (errmess) => ({
    type: ActionTypes.RATINGS_FAILED,
    payload: errmess
});

export const addRatings = (ratings) => ({
    type: ActionTypes.ADD_RATINGS,
    payload: ratings
});


// for favorites
export const postFavorite = (homepostId) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'favorites/' + homepostId, {
        method: "POST",
        body: JSON.stringify({"_id": homepostId}),
        headers: {
          "Content-Type": "application/json",
          'Authorization': bearer
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(favorites => { console.log('Favorite Added', favorites); dispatch(addFavorites(favorites)); })
    .catch(error => dispatch(favoritesFailed(error.message)));
}

export const deleteFavorite = (homepostId) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'favorites/' + homepostId, {
        method: "DELETE",
        headers: {
          'Authorization': bearer
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(favorites => { console.log('Favorite Deleted', favorites); dispatch(addFavorites(favorites)); })
    .catch(error => dispatch(favoritesFailed(error.message)));
};

export const fetchFavorites = () => (dispatch) => {
    dispatch(favoritesLoading(true));
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'favorites', {
        headers: {
            'Authorization': bearer
        },
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(favorites => dispatch(addFavorites(favorites)))
    .catch(error => dispatch(favoritesFailed(error.message)));
}

export const favoritesLoading = () => ({
    type: ActionTypes.FAVORITES_LOADING
});

export const favoritesFailed = (errmess) => ({
    type: ActionTypes.FAVORITES_FAILED,
    payload: errmess
});

export const addFavorites = (favorites) => ({
    type: ActionTypes.ADD_FAVORITES,
    payload: favorites
});

// for messages

// for reservation 
