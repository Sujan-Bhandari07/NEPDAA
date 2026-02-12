import express from "express";
import { bookmarkpost, commentonpost, createpost, deletecomment, deletepost, getallpost, getallstories, getbookmarkpost, getownpost, likeorunlikepost } from "../controllers/postcontroller.js";
import { auth } from "../middlewares/authmiddleware.js";
import upload from "../middlewares/multer.js";
const postrouter = express.Router();
postrouter.post("/createpost", auth, upload.fields([{ name: "post", maxCount: 1 }]), createpost);
postrouter.post("/like", auth, likeorunlikepost);
postrouter.post("/bookmark", auth, bookmarkpost);
postrouter.post("/comment", auth, commentonpost);
postrouter.get("/getallpost", auth, getallpost);
postrouter.get("/getallstory", auth, getallstories);
postrouter.get("/getownpost", auth, getownpost);
postrouter.get("/getbookmarkpost", auth, getbookmarkpost);
postrouter.post("/deletecomment", auth, deletecomment);
postrouter.post("/deletepost", auth, deletepost);
export { postrouter };
//# sourceMappingURL=postroute.js.map