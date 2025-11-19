import jwt from "jsonwebtoken";

export const createAccessJWT = (newUser) => {

    return jwt.sign({ userId: newUser._id },
        process.env.JWT_ACCESS_SECRET, {
        expiresIn: '1h'
    }
    )
};

