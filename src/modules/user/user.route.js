import { Router } from "express";
import { deleteUser, getAllUsers, register, updateUser, login } from "./user.controller.js";
import express from "express";
import { checkEmail } from "../../middleware/checkEmail.js";

export const userRoutes = Router();

userRoutes.use(express.json());


userRoutes.get("/users", getAllUsers);

userRoutes.post("/users", checkEmail, register);

userRoutes.post("/users/login", login);

userRoutes.put("/users/:id", updateUser);

userRoutes.delete("/users/:id", deleteUser);




