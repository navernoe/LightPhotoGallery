import fs from "fs";

const imgsFolder = "img/galleryImgs";
const imgsListJsonPath = "data/imgsList.json";

export default () => {
    fs.readdir(imgsFolder, (err, files) => {
        if (err) {
    
            console.log(err);
    
        } else {
            const imgsNames = [];
    
            files.forEach(file => {
                imgsNames.push(file);
            });
    
            const imgsListJson = JSON.stringify({
                imgsList: imgsNames
            });
    
            fs.writeFileSync(imgsListJsonPath, imgsListJson);
        }
    });
}

