'use strict';

const user = require('../models/user');

exports.getProfile = nickname => 
	
	new Promise((resolve,reject) => {

		user.find({ nickname: nickname }, { nickname: 1, email: 1, created_at: 1, _id: 0 })

		.then(users => resolve(users[0]))

		.catch(err => reject({ status: 500, message: 'Internal Server Error !' }))

	});
