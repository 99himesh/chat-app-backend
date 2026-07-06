const Users = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sequelize = require("sequelize");
const { Op } = require("sequelize");
const generatejwtToken = async (userId, name) => {
    return await jwt.sign({ userId: userId, name: name }, process.env.JWT_SECRET_KEY);
}

const signUp = async (req, res) => {
    try {
        const { name, email, password, mobile } = req.body;
        const user = await Users.findAll({
            where: {
                [Op.or]: {
                    email: email,
                    mobile: mobile
                }

            }
        })
        if (user.length) {
            return res.status(400).send("User aready  exist")
        }
        bcrypt.hash(password, 10, async function (err, hash) {
            if (err) {
                throw new Error("Somethinggfsngkjsfdn went wrong!")
            }
            const user = await Users.create({ name, email, password: hash, mobile });
            res.status(201).json({ success: true, user, message: "User created successfully" })
        });
    } catch (error) {
        console.log(error, "fgjbdfjhgfdjh");

        res.status(500).json(error)

    }
}


const logIn = async (req, res) => {
    try {
        const { emailAndMobile, password } = req.body;
        console.log(emailAndMobile);

        const user = await Users.findAll({
            where: {
                [Op.or]: [
                    { email: emailAndMobile },
                    { mobile: emailAndMobile }
                ]
            }
        });
        console.log(user[0].password);

        if (!user.length) {
            return res.status(404).send("User not exist");
        }

        await bcrypt.compare(password, user[0]?.password, async (err, result) => {
            if (err) {
                throw new Error("Something went wrong!")
            }
            if (result) {
                res.status(200).json({ success: true, user, token: await generatejwtToken(user[0].id, user[0].name), message: "User Login successfully" })
            } else {
                return res.status(401).send("User not authorized");
            }

        })

    } catch (error) {
        res.status(500).json(error.message)

    }
}


const getUsers = async (req, res) => {
  const { search } = req.query;
  try {
     const where = {};
        if (search?.trim()) {
        where.name = {
            [Op.like]: `%${search.trim()}%`,
        }
        }

    const users = await Users.findAll({
      where
    });

    res.status(200).json({
      success: true,
      users,
      message: "Users fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, profile, cover, mobile, password,location,dob,maritalStatus,gender,language } = req.body;
        const user = await Users.findByPk(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        user.name = name || user.name
        user.email = email || user.email
        user.profile = profile || user.profile
        user.cover = cover || user.cover
        user.mobile = mobile || user.mobile
        user.location=location || user.location
        user.dob=dob || user.dob
        user.gender=gender || user.gender
        user.language=language || user.language
        user.maritalStatus=maritalStatus || user.maritalStatus
        
        if (password) {
            const hashPassword = await bcrypt.hash(password, 10);
            user.password = hashPassword;
        }
        await user.save();
        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            user,
        });


    } catch (error) {
        console.log(error);

    }
}



const getProfile=async(req,res)=>{
    try {
       res.status(200).json({success:true,user:req.user,message:"User fetch successfully"})
        
    } catch (error) {
        res.status(500).json({success:false,message:"Something went wrong"})
    }

}



module.exports = {
    signUp,
    logIn,
    getUsers,
    updateUser,
    getProfile
};


        