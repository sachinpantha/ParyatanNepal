import jwt from 'jsonwebtoken'
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {    //PAYLOAD  AND SECRETKEY
        expiresIn: '30d'
    })
}
export default generateToken

//NOW USING JSONWEBTOKEN WE CAN ACCESS THE PROTECTIVE ROUTE AND CALLED AS AUTHORIZATION