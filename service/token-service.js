const jwt = require('jsonwebtoken');
const db = require('../db/db.js');

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOP_SECRET, {expiresIn: '15m'});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOP_SECRET, {expiresIn: '30d'});
        return {
            accessToken,
            refreshToken,
        };
    };

    async saveToken(userId, refreshToken) {
        const tokenData = await db.query(`SELECT * FROM token where user_id = "${userId}"`);
        if (tokenData[0].length) {
            await db.query(`UPDATE token SET refresh`)
        };
        await db.query(`INSERT INTO token (user_id, refreshToken) values ("${userId}", "${refreshToken}")`);
        const token = await db.query(`SELECT * FROM token where user_id = ${userId}`);
        return token[0];
    };
};

module.exports = new TokenService;