// import express from 'express';
// import cloudinary from 'cloudinary';
// import multer from 'multer';

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET
// });

// // Set up Multer for handling image uploads
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// const router = express.Router();

// // Endpoint to upload image to Cloudinary
// router.post('/upload', upload.single('image',10), async (req, res) => {
//   try {
//     if (!req.file|| req.files.length ===0) {
//       return res.status(400).json({ msg: 'No file uploaded' });
//     }

//     // const imageUrls = [];

//     // // Loop through each file and upload it to Cloudinary
//     // for (let i = 0; i < req.files.length; i++) {
//     //   const file = req.files[i];

//     // Upload image to Cloudinary
//     const result = await cloudinary.v2.uploader.upload_stream(
//       { resource_type: 'image' },
//       (error, result) => {
//         if (error) {
//           return res.status(500).json({ msg: 'Cloudinary upload error', error: error.message });
//         }

//         // Send back the Cloudinary image URL
//         res.json({ imageUrl: result.secure_url });
//       }
//     );

//     // Use multer to handle file upload as a buffer
//     result.end(req.file.buffer);

//   } catch (error) {
//     res.status(500).json({ msg: 'Server Error', error: error.message });
//   }
// });

// export default router;



// updated code

import express from 'express';
import cloudinary from 'cloudinary';
import multer from 'multer';

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Set up Multer for handling image uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

// Endpoint to upload image to Cloudinary
router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  // Upload image to Cloudinary
  const uploadStream = cloudinary.v2.uploader.upload_stream(
    { resource_type: 'image' },
    (error, result) => {
      if (error) {
        return res.status(500).json({ msg: 'Cloudinary upload error', error: error.message });
      }

      // Send back the Cloudinary image URL
      
     // console.log(uploadStream.url)
     // res.json({ imageUrl: result.secure_url });
      res.json({imageUrl: uploadStream.url});
      //console.log(result.secure_url)
      
    }
  );

  // Use multer to handle file upload as a buffer
  uploadStream.end(req.file.buffer);
});

export default router;
