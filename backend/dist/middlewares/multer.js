import multer from 'multer';
const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
        cb(null, true);
    }
    else {
        cb(new Error('Invalid file type, only images and videos are allowed!'));
    }
};
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 100, // 100MB
    },
});
export default upload;
//# sourceMappingURL=multer.js.map