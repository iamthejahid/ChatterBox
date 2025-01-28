import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import passport from "passport";
import catchAsyncErr from "@main/utils/catch-async";
import apiResponse from "@main/utils/api-response";

const isClientAuthenticated = catchAsyncErr(
    async (req: Request, res: Response, next: NextFunction) => {
        const clientToken = req.headers["authorization"];
        if (!clientToken)
            return apiResponse(res, httpStatus.UNAUTHORIZED, {
                message: "Basic Client Required",
            });

        passport.authenticate("basic", (err, user, info) => {
            if (err || info || !user)
                return apiResponse(res, httpStatus.UNAUTHORIZED, {
                    message: "Invalid Client",
                });
            req.client = user;
            return next();
        })(req, res, next);
    }
);



export { isClientAuthenticated };