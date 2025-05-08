import * as bcrypt from 'bcryptjs';

export const hashPassword = async (password: string): Promise<string> => {
  if (!password) {
    throw new Error('Password is required');
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error: unknown) {
    throw new Error(
      `Failed to hash password: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
};

export const comparePassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  if (!password || !hashedPassword) {
    throw new Error('Password and hashed password are required');
  }
  try {
    const result = await bcrypt.compare(password, hashedPassword);
    return result;
  } catch (error: unknown) {
    throw new Error(
      `Failed to compare passwords: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
};
