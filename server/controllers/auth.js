import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";


export const login = async (req, res) =>{

    try{

        return res.status(200)
        //get email and password from frontend
        const { email, password} = req.body

        console.log("arrived", email, password)

        //search for user
        const user = await User.findOne({email})

        //if user not exist return
        if(!user){

            return res.status(401).json({message: `User not found `})
        }

        //if exist, check if password correct
        const isMatch = await bcrypt.compare(password, user.password);


        //if not return
        if (!isMatch){

            return res.status(401).json({ message: "Invalid credentials. " });
        }


        //sign jwt token to user
        jwt.sign({

                isAdmin: user.isAdmin,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                id: user._id,
                imageUrl: user.imageUrl
            },
            process.env.JWT_SECRET,  {expiresIn: "12h"}, (error,token) =>{
                if(error){
                    throw error;
                }


                res.cookie('token', token)

                //return user details to frontend
                res.status(201).json(user)

            })

    }catch(error){
        return res.status(500).json({error})
    }

}

export const register = async (req,res) =>{

    try{

        const { firstName, lastName, email, password, imageUrl} = req.body


        /* VALIDATION */
        if(firstName < 2 || lastName < 2 || email < 5 || password < 5){
            res.status(400).json({message: "invalid fields"})
        }


        //check if user exist
        const user = await User.findOne({email})

        if(user){
            res.status(400).json({message: "User already exist"})
            return;
        }


        //create hashed password
        const salt = await bcrypt.genSalt(12)
        const hash = await bcrypt.hash(password, salt)


        //create user
        await User.create({
            firstName,
            lastName,
            email,
            password: hash,
            imageUrl

        })


        return res.status(201).json({message: "Successes"})



    }catch(error){
        return res.status(500).json({error})
    }

}

export const signout = async (req,res) =>{

    res.clearCookie('token', '').status(200).json(true);

}