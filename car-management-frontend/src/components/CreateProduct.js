// import React, { useState } from 'react';
// import axios from 'axios';
// import './CreateProduct.css'; 

// const ProductCreation = () => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');

//   // Handle title input change
//   const handleTitleChange = (e) => {
//     setTitle(e.target.value);
//     console.log(e.target.value);
//   };

//   // Handle description input change
//   const handleDescriptionChange = (e) => {
//     setDescription(e.target.value);
//     console.log(e.target.value);
//   };

//   // Handle image file input change
//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//     console.log(e.target.value);
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!title || !description || !image) {
//       setMessage('Please fill all the fields.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('description', description);
//     formData.append('image', image);

//  Array.from(formData).forEach(([key, value]) => {
//   console.log(key, value);
// });

//     try {
//       setLoading(true);
      

//       const token = localStorage.getItem('token'); 

//       console.log(localStorage.getItem('token'));

//       const response = await axios.post('http://localhost:8000/api/cars/create', formData, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setLoading(false);
//       setMessage('Product created successfully!');
//       console.log(response.data); // Handle the response
//     } catch (error) {
//       setLoading(false);
//       setMessage('Error creating product.');
//       console.error(error);
//     }
//   };

//   return (
//     <div className="product-creation-page">
//       <h1>Create a New Product</h1>
//       <form onSubmit={handleSubmit} className="product-form">
//         <div className="form-group">
//           <label htmlFor="title">Title</label>
//           <input
//             type="text"
//             id="title"
//             value={title}
//             onChange={handleTitleChange}
//             placeholder="Enter product title"
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="description">Description</label>
//           <textarea
//             id="description"
//             value={description}
//             onChange={handleDescriptionChange}
//             placeholder="Enter product description"
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="image">Image</label>
//           <input
//             type="file"
//             id="image"
//             accept="image/*"
//             onChange={handleImageChange}
//           />
//         </div>

//         {message && <div className="message">{message}</div>}

//         <button type="submit" className="submit-btn" disabled={loading}>
//           {loading ? 'Submitting...' : 'Create Product'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ProductCreation;







// updated code

import React, { useState } from 'react';
import axios from 'axios';
import './CreateProduct.css';

const ProductCreation = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !image) {
      setMessage('Please fill all fields.');
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      console.log(token)

      // Step 1: Upload the image to Cloudinary via the backend
      const formData = new FormData();
      formData.append('image', image);

      const uploadResponse = await axios.post(
        'http://localhost:8000/api/upload',
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // Get the image URL from the Cloudinary upload response
      const imageUrl = uploadResponse.data.imageUrl;
      

      // Step 2: Submit the product data with the image URL
      const productData = {
        title,
        description,
        imageUrl,
      };

      const response = await axios.post(
        'http://localhost:8000/api/cars/create',
        productData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      setLoading(false);
      setMessage('Product created successfully!');
      console.log(response.data);
    } catch (error) {
      setLoading(false);
      setMessage('Error creating product.');
      console.error(error);
    }
  };

  return (
    <div className="product-creation-page">
      <h1>Create a New Product</h1>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter product title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter product description"
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        {message && <div className="message">{message}</div>}

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Submitting...' : 'Create Product'}
        </button>
      </form>
    </div>
  );
};

export default ProductCreation;
