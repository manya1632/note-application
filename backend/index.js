import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
// import { authenticateToken } from "./utilities";
import User from "./models/user.model.js"; 
import Note from "./models/note.model.js"

await mongoose.connect(process.env.DB_URI);

const app = express();

app.use(express.json());

app.use(
    cors({
        origin: "*",
    })
);

async function authenticateToken (req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    console.log("token", token);

    if (!token) {
        return res.sendStatus(401); 
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        console.log(user);
        req.user = user;
        next();
    } catch (err) {
        return res.sendStatus(401);
    }
}

app.get("/", (req, res) => {
    res.json({
        msg: "Hello Manya",
    });
});

// CREATE ACCOUNT 
app.post("/create-account", async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName) {
        return res.status(401).json({
            error: true,
            msg: "Full name is required",
        });
    }

    if (!email) {
        return res.status(401).json({
            error: true,
            msg: "Email is required",
        });
    }

    if (!password) {
        return res.status(401).json({
            error: true,
            msg: "Password is required",
        });
    }

    console.log("okay reached");

    const isUser = await User.findOne({ email });

    console.log(isUser);

    if (isUser) {
        console.log("isUser is true");
        return res.json({
            error: true,
            msg: "User already exists",
        });
    }

    console.log("above User");
    const user = new User({
        fullName,
        email,
        password,
    });

    await user.save();

    console.log(process.env.JWT_SECRET);
    const accessToken = jwt.sign({ user }, process.env.JWT_SECRET, {
        expiresIn: "36000m",
    });

    return res.json({
        error: false,
        user,
        accessToken,
        msg: "Registration Successful",
    });
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(401).json({
            error: true,
            msg: "Email is required",
        });
    }

    if (!password) {
        return res.status(401).json({
            error: true,
            msg: "Password is required",
        });
    }

    const userInfo = await User.findOne({ email: email });

    if (!userInfo) {
        res.status(401).json({
            error: true,
            msg: "No user found",
        });
    }

    if (userInfo.password == password) {
        const user = { user: userInfo };
        const accessToken = jwt.sign(user, process.env.JWT_SECRET, {
            expiresIn: "36000m",
        });

        return res.json({
            error: false,
            msg: "Login Successful",
            user,
            accessToken,
        });
    } else {
        return res.json({
            error: true,
            msg: "Invalid Credentials",
        });
    }
});

app.post("/add-note", authenticateToken, async (req, res) => {
        const { title, content, tag } = req.body;
        const userId = req.user.userId;

        if (!title || !content) {
            return res.status(401).json({
                error: true,
                msg: "Title and content are required",
            });
        }

        console.log("Above try");
        try {
            console.log("inside try")
            const note = new Note({
                title,
                content,
                tag: tag || [],
                userId,
            });

            console.log(note);

            console.log("note created");
            await note.save();
            console.log("note saved");


            res.json({
                error: false,
                note,
                msg: "Note added successfully",
            });
        } catch (error) {
            res.status(500).json({
                error: true,
                msg: "Internal server error",
            });
        }
});

const PORT = 8000;
app.listen(PORT, async() => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
