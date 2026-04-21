import User from "../model/User.js";
import bcrypt from "bcryptjs"; // Make sure to install bcryptjs
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { email, password } = req.body;
  try {

    // 1. Validation: Check if fields are empty
    if (!email || !password) {
      return res.status(400).json({ message: "All feilds are required" });
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exist" });
    }

    // 3. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create and Save the user
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // 5. Success Response
    res.status(201).json({
      message: "User registered successfully",
      user: { email: newUser.email, id: newUser._id },
    });
  } catch (error) {

    // 6. Error handling
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error, please try again" });
  }
};

export const login = async (req, res) => {
    const {email,password} = req.body

    try {
      if(!email || !password){
        return res.status(400).json({message:"some error in login"});
      }

      const findUser = await User.findOne({email}).select("+password")
      if (!findUser) {
        return res.status(400).json({message:"User invalid"});
      }
      
      const isMatch = await bcrypt.compare(password, findUser.password)
      if (!isMatch) {
        return res.status(400).json({message:"password not matched"});
      }

      const token = jwt.sign(
        {id: findUser._id},
        process.env.JWT_SECRET,
        {expiresIn:"24h"}
      )

      return res.status(200).json({
        success:true,
        token,
        user:{
          id:findUser._id,
          name: findUser.name,
          email: findUser.email
        }
      })
      
    } catch (error) {
      console.log("Invalid details", error);
      return res.status(500).json({message:"Internal server error"})
    }

};

export const logout = async (req, res) => {
  try {
    // We just send a success message. 
    // The Frontend will see this and delete the token from LocalStorage.
    return res.status(200).json({ 
      success: true, 
      message: "Logged out successfully" 
    });
  } catch (error) {
    console.log("Logout Error:", error);
    return res.status(500).json({ message: "Server error during logout" });
  }
};

export const getProfile = async (req, res) => {
   try {
    // 1. req.user.id comes from your 'isAuth' or 'verifyToken' middleware
    const userId = req.user.id;

    // 2. Find user by ID but exclude the password field
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 3. Return user data
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get Profile Error:", error);
    return res.status(500).json({ message: "Server error while fetching profile" });
  }
};
