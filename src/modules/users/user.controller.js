import asyncHandler from "../../utils/asyncHandler.js";
import { success } from "../../utils/apiResponse.js";
import {
  createUserService,
  getAllUsersService,
  getUserByIdService,
} from "./user.service.js";
import { loginUserService } from "./user.service.js";

export const createUser = asyncHandler(async (req, res) => {
  const user = await createUserService(req.body);
  success(res, user, "User created successfully");
});

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await getAllUsersService();
  success(res, users, "Users fetched successfully");
});

export const getUserById = asyncHandler(async (req, res) => {
  const user = await getUserByIdService(req.params.id);
  success(res, user, "User fetched successfully");
});

export const loginUser = asyncHandler(async (req, res) => {
  const result = await loginUserService(req.body);
  success(res, result, "Login successful");
});