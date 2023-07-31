import { diskStorage } from "multer"; 
import { v4 as uuidv4 } from 'uuid'; 


export const storage = diskStorage({
    destination: (req, file, cb) => {
        const location: number = file.originalname.lastIndexOf('.') + 1;
        const typeFile: string = file.originalname.slice(location);
        let locationSaveFile: string = './uploads';
        if (typeFile === 'jpg' || typeFile === 'png' || typeFile === 'jpeg') {
            locationSaveFile += '/images';
        } else if (typeFile === 'docs' || typeFile === 'doc' || typeFile === 'docx') {
            locationSaveFile += `/docs`;
        } else if (typeFile === 'pdf' || typeFile === 'xlsx') {
            locationSaveFile += `/${typeFile}`;
        } else {
            locationSaveFile += '/others';
        }
        cb(null, locationSaveFile);
    },
    filename: (req, file, cb) => {
        const location: number = file.originalname.lastIndexOf('.') + 1;
        const typeFile: string = file.originalname.slice(location);
        const fileName: string = file.originalname.slice(0,location);

        // const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
        // const extension: string = path.parse(file.originalname).ext;
        cb(null, `${fileName}${uuidv4()}.${typeFile}`);
    },
});