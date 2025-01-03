import Devteam from '../models/devteam.js';

export const getAllDevelopers = async (req, res) => {
  try {
    const developers = await Devteam.find();
    res.status(200).json(developers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching developers', error: error.message });
  }
};