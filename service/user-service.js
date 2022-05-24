const db = require('../db/db.js');
const ApiError = require('../exceptions/api-error.js');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const UserDto = require('../dtos/user-dto.js');
const tokenService = require('./token-service.js');

class UserService {
    async registration(username, email, password) {
        const candidateUsername = await db.query(`SELECT username FROM user WHERE username = "${username}"`);
        const candidateEmail = await db.query(`SELECT email FROM user WHERE email = "${email}"`);
        if (candidateUsername[0].length) {
            throw ApiError.BadRequest(`Пользователь с именем ${username} уже существует`);
        };
        if (candidateEmail[0].length) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`);
        };
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();

        await db.query(`INSERT INTO user (username, email, password, activationLink) values ("${username}", "${email}", "${password}", "${activationLink}")`);

        // await mailService.sendActivationMail(email, activationLink);

        const user = await db.query(`SELECT * FROM user WHERE email = "${email}"`);

        const userDto = new UserDto(user[0][0]);

        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto};
    };
};

module.exports = new UserService;