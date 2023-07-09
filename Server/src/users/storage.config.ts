import multer, { diskStorage } from "multer";

export const storageAvatar = diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/avatars')
    },
    filename: function (req, file, cb) {
        const filename = file.originalname;
        const fileExtension = filename.split(".")[1];
        cb(null, Date.now() + "." + fileExtension);
    }
})
