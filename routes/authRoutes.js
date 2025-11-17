import authController from "../controllers/authController.js";

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/", authController.getUsers);
