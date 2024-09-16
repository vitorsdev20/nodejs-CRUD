const multer = require('multer');
const sharp = require ('sharp');
const fs = require('fs'); /* file system */
const { error } = require('console');
const { request } = require('http');
const path = require('path');

const UploadController = {
    uploadImage: async (req, res) => {
        /* gatinh.png */
        const imageName = req.file.originalname;
        /*  data imagem */
        const ImageData = req.file.buffer;
        /* slavar a imagem original  */
        await sharp(ImageData).toFile(`uploads/${imageName}`);
        /* /upload/gatinho.png */

        return res.status(200).json({
            msg: 'Imagem Salva com sucesso!',
            status: 200
        })
    },

    listImages: async(req, res) => {
        
        fs.readdir('uploads/', (err, files) => {
            if(err) {
                return res.status(500).json({
                    msg:"Erro ao Listar imagens"
                });
            }

            const images = files.filter(
                (file) =>
                    file.endsWith(".jpg") ||
                    file.endsWith(".png") ||
                    file.endsWith(".jpeg") 
            );
            res.send(images);
        });
    },

    getImage: (req,res) => {
        const imageName = req.params.imageName;
        console.log(req.params.imageName)
        /* const path  */
        const imagePath = path.join(__dirname, '..','..','uploads', imageName);
        return res.sendFile(imagePath);
    }
}
module.exports = UploadController;