import jwt from "jsonwebtoken";

export const createAccessJWT = (newUser) => {

    return jwt.sign({ userId: newUser._id },
        process.env.JWT_ACCESS_SECRET, {
        expiresIn: '1h'
    }
    )
};

export const validateJWT = (providedJWT) => {
    let response;
    jwt.verify(providedJWT, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
        if (err) {
            response = { error: "Your session has expired. Please log in again." }
        } else {
            response = decoded;
        }
    });
    return response;
};