const bcryptjs = require('bcryptjs')

const encryptPassword = async (user_password) => {
    const dataCrypt = await bcryptjs.hash(user_password, 8)
    return dataCrypt;
}
const comparePassword = (user_password, dataCrypt) => {
    const compare = bcryptjs.compareSync(user_password, dataCrypt)
    return compare;
}

module.exports = { encryptPassword, comparePassword }