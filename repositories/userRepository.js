import User from "../models/User.js";


const findbyEmail = async (email) => await User.findOne({ email });
const findById = async (id) => await User.findById(id);
const create = async (userData) => await User.create(userData);


export default { findById, findbyEmail, create };

