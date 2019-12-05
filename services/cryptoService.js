const crypto = require('crypto');

module.exports.encrypt = (val, salt = "apple") => {
    const cipher = crypto.createCipher("aes-256-cbc", salt);
    let result = cipher.update(val, 'utf8', 'base64');
    result += cipher.final('base64');
    return result;
};

module.exports.decrypt = (val, salt = 'apple') => {
    const decipher = crypto.createDecipher("aes-256-cbc", salt);
    let result = decipher.update(val, 'base64', 'utf8');
    result += decipher.final('utf8');
    return result;
};

module.exports.hash = (val, salt = 'apple') => {
    return crypto.pbkdf2Sync(val, salt, 100000, 64, 'sha512').toString('base64');
};

module.exports.verifyHash = (requestPassword, savedPassword) => {
    return this.hash(requestPassword) === savedPassword;
};