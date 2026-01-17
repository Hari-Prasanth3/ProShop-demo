import  jwt  from "jsonwebtoken";

const generateToken = (res, userId) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET || '1234567890',{
        expiresIn: '30d',
    })
    //set JWT http-only cookie
    const isProduction = process.env.NODE_ENV === 'production';
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: isProduction, // Only send over HTTPS in production
        sameSite: isProduction ? 'none' : 'lax', // 'none' requires secure: true
        maxAge: 30 * 24 * 60 * 60 * 1000,  //30days
        path: '/', // Ensure cookie is available for all paths
    })
    console.log('Token cookie set - secure:', isProduction, 'sameSite:', isProduction ? 'none' : 'lax');
    
    // Return token so it can be included in response body if needed
    return token;
}

export default generateToken;