import bcrypt from 'bcrypt';
import { connectDB } from "./helper";
import { createAccessJWT } from "../middleware/jwt";

export const register = async (req, res) => {
    const client = await connectDB();

    try {
        const { username, email, firstName, lastName, dob } = req.body;

        const existingUser = await client.db('project1').collection('users').findOne({ username: req.body.username });

        if (existingUser) {
            return res.status(400).send({ error: "User with this username already exists." })
        }

        const newUser = {
            username,
            email,
            firstName,
            lastName,
            dob,
            password: bcrypt.hashSync(req.body.passwordText, 10),
            passwordText: req.body.password,
            createDate: new Date(),
            publishedBooks: [],
            likedBooks: [],
            dislikedBooks: [],
            reviewedBooks: []
        };

        const result = await client.db('project1').collection('users').insertOne(newUser);

        newUser._id = result.insertedId;

        const { password, ...userNoPass } = newUser;

        const accessJWT = createAccessJWT(userNoPass);

        res.status(201).header("Authorization", accessJWT).send({ success: "User registered succesfully.", userData: userNoPass });

    } catch (err) {
        console.error(err);
        res.status(500).send({ error: err, message: "Registration failed. Please try again later." })
    } finally {
        await client.close();
    }
};