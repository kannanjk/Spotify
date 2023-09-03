import jwt  from 'jsonwebtoken'


export default async (req, res, next) => {
    try {
        const {token} = req.body
        jwt.verify(token, process.env.TOKEN, (err, decode) => {
            if (err) {
                return res.status(200).send({
                    message: "auth Fail error",  
                    success: false
                })
            } else {
                req.body.userId = decode
              return  next()
            }
        })
    } catch (error) {
        console.log(error);
        res.status(401).send({
            message: "Auth Fail",
            success: false
        })
    }
}

