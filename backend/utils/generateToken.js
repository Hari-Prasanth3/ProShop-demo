import  jwt  from "jsonwebtoken";

const generateToken = (res, userId) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET || '1234567890',{
        expiresIn: '30d',
    })
    //set JWT http-only cookie
    res.cookie('jwt',token,{
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 30 * 24 * 60 * 60 * 1000,  //30days
    })
}

export default generateToken;