import { executeSQL } from "@main/config/db";
import apiResponse from "@main/utils/api-response";
import catchAsyncErr from "@main/utils/catch-async";
import hashPassword from "@main/utils/password/hash-password";
import httpStatus from "http-status";
import { Request, Response } from "express";
import accessTokenDetailAndRefreshTokenDetail from "@main/utils/token/generate-new-access-token";



const userRegister = catchAsyncErr(async (req: Request, res: Response) => {
    const { username, password } = req.body;


    // check if the user already exists
    const user = await executeSQL("SELECT * FROM users WHERE username = $1", [username]);

    if (user.length > 0) {
        return apiResponse(res, httpStatus.NOT_ACCEPTABLE, {
            message: "Email already exist.",
        });
    }

    // hash the password
    const hashedPassword = await hashPassword(password);

    // save the user
    await executeSQL("INSERT INTO users (username, password) VALUES ($1, $2)", [username, hashedPassword]);


    const token = await accessTokenDetailAndRefreshTokenDetail(
        { username },
    );

    return apiResponse(res, httpStatus.CREATED, {
        message: "User created successfully.",
        data: token,
    });
});


export default userRegister;