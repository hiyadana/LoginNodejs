'use strict';

const user = require('../models/user');
const bcrypt = require('bcryptjs');

exports.registerUser = (nickname, email, password, gender, birthyear, extra) => 

	new Promise((resolve,reject) => {

	    const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(password, salt);

		const newUser = new user({

			nickname: nickname,
			email: email,
			hashed_password: hash,
			gender: gender,
			birthyear: birthyear,
			extra: extra,
			created_at: new Date()
		});

		newUser.save()

		.then(() => resolve({ status: 201, message: 'User Registered Sucessfully !' }))

		.catch(err => {

			if (err.code == 11000) {
						
				reject({ status: 409, message: 'User Already Registered !' });

			} else {

				reject({ status: 500, message: 'Internal Server Error !' });
			}
		});
	});


