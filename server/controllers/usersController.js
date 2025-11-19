import bcrypt from 'bcrypt';
import { connectDB } from "./helper";
import { createAccessJWT, validateJWT } from "../middleware/jwt";
import { ObjectId } from 'mongodb';

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

export const login = async (req, res) => {

    const client = await connectDB();

    try {
        const DB_RESPONSE = await client.db('project1').collection('users').findOne({ username: req.body.username });

        if (!DB_RESPONSE) {
            return res.status(404).send({ error: "No user was found with such username or password." })
        }

        if (!bcrypt.compareSync(req.body.password, DB_RESPONSE.password)) {
            return res.status(404).send({ error: "No user was found with such username or password." })
        }

        const { password, ...userNoPass } = loggedInUser;

        const accessJWT = createAccessJWT(userNoPass);

        res.header("Authorization", accessJWT).send({ success: "User was succesfully logged in.", userData: userNoPass });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: err, message: "Could not log you in. Please try again later." })
    } finally {
        await client.close()
    }
};

export const autoLogin = async (req, res) => {

    const client = await connectDB();

    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).send({ error: "Authorization header is missing." });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).send({ error: "Access token is missing." });
        }

        const verifyRes = validateJWT(token);
        if ("error" in verifyRes) {
            return res.status(401).send(verifyRes);
        }

        const userId = verifyRes.userId;
        if (!ObjectId.isValid(userId)) {
            return res.status(400).send({ error: "Invalid user ID in access token." })
        }

        const user = await client.db('project1').collection('users').findOne({ _id: ObjectId.createFromHexString(userId) });
        if (!user) {
            return res.status(404).send({ error: "User not found." });
        }

        const { password, userNoPass } = user;
        res.send({ userData: userNoPass });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: err, message: "Something went wrong with the server. Please try again later." })
    }
};

export const editUser = async (req, res) => {

    const client = await connectDB();

    try {
        const userId = req.userId;
        if (!ObjectId.isValid(userId)) {
            return res.status(400).send({ error: "Invalid user ID." });
        }

        const updated = { ...req.body };

        delete updated._id;
        delete updated.username;
        delete updated.dob;
        delete updated.createDate;
        delete updated.publishedBooks;
        delete updated.likedBooks;
        delete updated.dislikedBooks;
        delete updated.reviewedBooks;

        if (updated.password) {
            updated.password = bcrypt.hashSync(updated.password, 10);
            if (req.body.passwordText) {
                updated.passwordText = req.body.passwordText
            }
        }

        const updatedRes = await client.db('project1').collection('users').updateOne(
            { _id: ObjectId.createFromHexString(userId) },
            { $set: updated }
        );

        const updatedUser = await client.db('project1').collection('users').findOne({ _id: ObjectId.createFromHexString(userId) });

        const { password, ...userNoPass } = updatedUser;
        res.send(userNoPass);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: err, message: "Failed to edit user." });
    } finally {
        await client.close();
    }
}
