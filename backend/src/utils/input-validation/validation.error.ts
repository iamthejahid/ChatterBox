
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import Joi from "joi";
import apiResponse from "../apiResponse";

import { pick } from "lodash";

type typeValidationError = {
    [key: string]: string;
  };
  

const validateRequest =
  (schema: object) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const validSchema = pick(schema, ["params", "query", "body"]);
    const object = pick(req, Object.keys(validSchema));
    const { value, error } = Joi.compile(validSchema)
      .prefs({ errors: { label: "key" } })
      .validate(object, { abortEarly: false });

    if (error) {
      const err: typeValidationError = {};
      error.details.forEach((e) => {
        err[e.path[1]] = e.message.toString();
      });
      return apiResponse(
        res,
        httpStatus.UNPROCESSABLE_ENTITY,
        { message: "Validation Error" },
        err
      );
    }

    Object.assign(req, value);
    return next();
  };


export default validateRequest;