import Car from '../models/car.js';

// Create a new car
export const createCar = async (req, res) => {
  const { title, description, images,  } = req.body; //tags is removed
  try {
    const car = new Car({
      title,
      description,
      images,
      // tags,
      owner: req.user.id, // Assuming `auth` middleware adds `user` to `req`
    });
    await car.save();
    res.status(201).json(car);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
};

// Get all cars created by the logged-in user
export const getCars = async (req, res) => {
  try {
    const car = await Car.find({ owner: req.user.id });
    res.json(car);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
};

// Get a specific car by ID
// export const getCarById = async (req, res) => {
//   try {
//     const car = await Car.findById(req.params.id);
//     if (!car ) { //|| car.owner.toString() !== req.user.id
//       return res.status(404).json({ msg: 'Car not found' });
//     }
//     res.json(car);
//   } catch (err) {
//     res.status(500).json({ msg: 'Server Error', error: err.message });
//   }
// };

export const getCarById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Received ID:", id);  // Log the ID to ensure it’s being received correctly

    // Check if the ID is valid
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ msg: 'Invalid ID format' });
    }

    const car = await Car.findById(id);
    if (!car) {
      return res.status(404).json({ msg: 'Car not found' });
    }
    res.json(car);
  } catch (err) {
    console.error(err.message); // Log the error for debugging
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
};

// Update a specific car by ID
export const updateCar = async (req, res) => {
  const { title, description, images, tags } = req.body;
  try {
    let car = await Car.findById(req.params.id);
    if (!car || car.owner.toString() !== req.user.id) {
      return res.status(404).json({ msg: 'Car not found' });
    }

    // Update fields
    car.title = title || car.title;
    car.description = description || car.description;
    car.images = images || car.images;
    car.tags = tags || car.tags;

    await car.save();
    res.json(car);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
};

// Delete a specific car by ID
export const deleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car || car.owner.toString() !== req.user.id) {
      return res.status(404).json({ msg: 'Car not found' });
    }

    await car.remove();
    res.json({ msg: 'Car removed' });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
};

// Search for cars based on a keyword
export const searchCars = async (req, res) => {
  const { keyword } = req.query;
  try {
    const cars = await Car.find({
      owner: req.user.id,
      $or: [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
        { tags: { $regex: keyword, $options: 'i' } },
      ],
    });
    res.json(cars);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
};
