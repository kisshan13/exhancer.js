import mongoose from "mongoose";

/**
 *
 * @param error {Error}
 * @returns {{message: string, status: number}}
 */
export default function mongoError(error) {
    if(error instanceof mongoose.Mon)
    switch (error.code) {
        case 11000:
            const alreadyExists = Object.keys(error?.keyPattern);
            return {
                status: 400,
                message: `${alreadyExists.join()} already exists`,
            };

        default:
            return {
                status: 500,
                message: "Internal server error",
            };
    }
}