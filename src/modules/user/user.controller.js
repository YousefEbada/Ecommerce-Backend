import { UserModel } from "../../../db/models/user.model.js";
import bcrypt from "bcrypt";

const getAllUsers = async (req, res) => {
  const users = await UserModel.find();
  res.json({ message: "All Users", users });
};

const register = async (req, res) => {
  req.body.password = await bcrypt.hashSync(req.body.password, 10);
  const addedUser = await UserModel.insertOne(req.body);
  addedUser.age = Math.floor((new Date().getTime() - new Date(addedUser.birthDate).getTime()) /1000 /60 /60 /24 /365);
  if (!addedUser) {
    return res.status(400).json({ message: "Error Adding User" });
  }
  addedUser.password = undefined;
  res.json({ message: "User Added", addedUser });
};

const login = async(req, res) => {
    const exist = await UserModel.findOne({email: req.body.email});
    if(!exist){
        return res.status(404).json({message: "User Not Found, Please Register"});
    }
    const match = await bcrypt.compareSync(req.body.password, exist.password);
    if(!match){
        return res.status(401).json({message: "Invalid Email or Password"});
    }
    res.json({message: `Welcome Back ${exist.firstName} ${exist.lastName}`});

}

const updateUser = async (req, res) => {
  let { id } = req.params;
  const updatedUser = await UserModel.findByIdAndUpdate(
    id,
    { ...req.body },
    { new: true }
  );
  res.json({ message: "User Updated", updatedUser });
};

const deleteUser = async (req, res) => {
  let { id } = req.params;
  const deletedUser = await UsersModel.findByIdAndDelete(id);
  res.json({ message: "User Deleted", deletedUser });
};

export { getAllUsers, register, updateUser, deleteUser, login };
