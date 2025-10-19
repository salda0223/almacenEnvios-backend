import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken";
import userRepository from "../repositories/userRepository";
import AppError from "../errors/AppError";

const register = async (data) => {
    const { name, email, password, cedula } = data;

    if (!name || !email || !password || !cedula ) {
        throw new AppError("Todos los campos son obligatorios", 400);

    }

    const userExists = await userRepository.findbyEmail(email);
    if (userExists) throw new AppError("El usuario ya existe", 409);

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userRepository.create({
        name,
        email,
        password: hashedPassword,
        cedula,
    });


    const token = generateToken(newUser._id);
    return { user: newUser, token };

};

const login = async (data) => {
    const { email, password } = data;
    if(!email || !password)
        throw new AppError("Correo y contraseña requeridos", 400);

    const user = await userRepository.findbyEmail(email);
    if (!user) throw new AppError("Usuario no ENCONTRADO", 404);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new AppError("Contraseña incorrecta", 401);

    const token = generateToken(user._id);
    return { user, token };


};

export default { register, login };

