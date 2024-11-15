// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './ProductList.css';

// const ProductList = () => {
//   // State to store all cars and search query
//   const [cars, setCars] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   //const API_URL = process.env.REACT_APP_API_URL;

//   // Fetch cars created by the logged-in user
//   const fetchCars = async () => {
//     try {
//       const token = localStorage.getItem('token'); 
//       const response = await axios.get('http://localhost:8000/api/cars/myCars', {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         }
//       });
//       // const response = await axios.get(`${API_URL}/api/cars/myCars`, {
//       //   headers: {
//       //     'Authorization': `Bearer ${token}`,
//       //   }
//       // });
//       setCars(response.data);
//       setLoading(false);
//     } catch (err) {
//       setError('Failed to fetch cars');
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCars();
//   }, []);

//   // Filter cars based on the search term
//   const filteredCars = cars.filter(car => {
//     return car.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//            car.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//            car.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
//   });

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   return (
//     <div className="product-list-page">
//       <h1>My Cars</h1>
      
//       {/* Search Bar */}
//       <input
//         type="text"
//         placeholder="Search cars..."
//         value={searchTerm}
//         onChange={handleSearchChange}
//         className="search-bar"
//       />

//       {/* Error message */}
//       {error && <div className="error-message">{error}</div>}

//       {/* Loading spinner */}
//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         <div className="cars-list">
//           {/* Display list of filtered cars */}
//           {filteredCars.length === 0 ? (
//             <div>No cars found</div>
//           ) : (
//             filteredCars.map(car => (
//               <div key={car._id} className="car-card">
//                 <h2>{car.title}</h2>
//                 <p>{car.description}</p>
//                 <div>Tags: {car.tags.join(', ')}</div>
//                 {/* Add more fields as necessary */}
//               </div>
//             ))
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductList.css';

const ProductList = () => {
  // State to store all cars and search query
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  //const API_URL = process.env.REACT_APP_API_URL;

  // Fetch cars created by the logged-in user
  const fetchCars = async () => {
    try {
      const token = localStorage.getItem('token'); 
      const response = await axios.get('http://localhost:8000/api/cars/myCars', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setCars(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch cars');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  // Filter cars based on the search term
  const filteredCars = cars.filter(car => {
    return (
      car.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="product-list-page">
      <h1>My Cars</h1>
      
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search cars..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-bar"
      />

      {/* Error message */}
      {error && <div className="error-message">{error}</div>}

      {/* Loading spinner */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="cars-list">
          {/* Display list of filtered cars */}
          {filteredCars.length === 0 ? (
            <div>No cars found</div>
          ) : (
            filteredCars.map(car => (
              <div key={car._id} className="car-card">
                <h2>{car.title}</h2>
                <p>{car.description}</p>
                <div>Tags: {car.tags.join(', ')}</div>
                {/* Display images */}
                <div className="car-images">
                  {car.images.length > 0 ? (
                    car.images.map((image, index) => (
                      <img
                        key={index}
                        src={image} // Assuming each image is a valid URL
                        alt={car.title}
                        className="car-image"
                      />
                    ))
                  ) : (
                    <p>No images available</p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;

