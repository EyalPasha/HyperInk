import jwt from "jsonwebtoken";

export const verifyUserToken = async (req,res, next) =>{

    try {
        const {token} = await req.cookies;

        if (!token) {

            return res.status(403).send({ message: "Access Denied"});


        } else {
            await jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
                if (err){
                    throw err;
                }

                const user = userData

                if(!user){
                    return res.status(403).send({ message: "Access Denied"});
                }


                req.user = user
                next();
            });
        }

    }catch(error){
        return res.status(403).send({ message: `${error}`});
    }
}

export const verifyAdminToken = async (req,res, next) =>{

    try {
        const {token} = await req.cookies;

        if (!token) {

            return res.status(403).send({ message: "Access Denied"});


        } else {
            await jwt.verify(token, process.env.JWT_SECRET, {}, async (err, adminData) => {
                if (err){
                    throw err;
                }


                const admin = adminData

                if(!admin){
                    return res.status(403).send({ message: "Access Denied"});
                }

                if(!admin.isAdmin){
                    return res.status(403).send({ message: "Access Denied"});
                }


                req.admin = admin
                next();
            });
        }

    }catch(error){
        return res.status(500).send({ message: `${error}`});
    }
}