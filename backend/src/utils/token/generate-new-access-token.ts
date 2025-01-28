import e from "express";
import jsonwebtoken from "jsonwebtoken";


const accessTokenDetailAndRefreshTokenDetail = (user: any) => {
    const accessToken = jsonwebtoken.sign({ user }, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: "7d",
    });

    const refreshToken = jsonwebtoken.sign({ user }, process.env.REFRESH_TOKEN_SECRET!, {
        expiresIn: "14d",
    });

    const token = {
        access: {
            token: accessToken,
            expiredAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
        refresh: {
            token: refreshToken,
            expiredAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        },
    };

    return token;
};


export default accessTokenDetailAndRefreshTokenDetail;