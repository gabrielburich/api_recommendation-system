import bcrypt from 'bcrypt';

export function encryptPassword(user) {
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(user.password, salt);
}

export function compareEncryptValue(password, encodedPassword) {
    return bcrypt.compareSync(password, encodedPassword)
}

