import express from "express";
import { createUser, getPageOfUsers, getUser } from "../services/userService";
import { getPageOfInteractedPosts } from "../services/postService";
import { CreateUserRequest } from "../models/api/createUserRequest";
import { body, validationResult } from "express-validator";
import { format } from "date-fns";


const router = express.Router();

router.get("/", async (request, response) => {
  const page = request.query.page ? parseInt(request.query.page as string) : 1;
  const pageSize = request.query.pageSize
    ? parseInt(request.query.pageSize as string)
    : 10;

  const userList = await getPageOfUsers(page, pageSize);
  return response.render("user_list", userList);
});

router.get("/create/", (request, response) => {
  return response.render("create_user");
});

router.post(
  "/create/",
  body("name").notEmpty(),
  body("username").notEmpty().isLowercase().not().contains(" "),
  body("email").notEmpty().isEmail(),
  body("coverImageUrl").notEmpty(),
  body("profileImageUrl").notEmpty(),
  async (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    const user = request.body;

    await createUser(user as CreateUserRequest);
    return response.redirect("/users/");
  }
);

router.get("/:userId/", async (request, response) => {
  const userId = parseInt(request.params.userId);

  const user = await getUser(userId);
  
  const likedPosts = await getPageOfInteractedPosts(1,10,userId,"LIKE")
  const dislikedPosts = await getPageOfInteractedPosts(1,10,userId,"DISLIKE")

  return response.render("user_detail", {user, likedPosts, dislikedPosts, format});
});

export default router;
