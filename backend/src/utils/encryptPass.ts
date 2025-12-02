import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10);

export const encryptPassword = async (password: string): Promise<string> => {
  try {
    console.log('Contraseña a encriptar:', password);
    if (!password || password.length === 0) {
      throw new Error('Contraseña vacía');
    }

    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    console.log('Contraseña encriptada:', hash);
    if (!hash) {
      throw new Error('Error al encriptar la contraseña');
    }
    console.log('Contraseña encriptada:', hash);
    return hash;
  } catch (error) {
    throw new Error(`Error al encriptar la contraseña: ${error}`);
  }
};

export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  try {
    if (!password || !hash) {
      throw new Error('Contraseña o hash vacío');
    }

    const isPasswordValid = await bcrypt.compare(password, hash);

    if (!isPasswordValid) {
      throw new Error('Contraseña incorrecta');
    }

    return isPasswordValid;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};