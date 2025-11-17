import User from "../models/User.js";

class UserRepository {
  async findbyEmail(email) {
    return await User.findOne({ email });
  }

  async findById(id) {
    return await User.findById(id);
  }

  async create(userData) {
    return await User.create(userData);
  }
}

export default new UserRepository();
