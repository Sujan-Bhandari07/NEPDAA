import jwt from "jsonwebtoken";
const gettoken = (id) => {
    return jwt.sign({ _id: id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};
export { gettoken };
//# sourceMappingURL=jwt.js.map