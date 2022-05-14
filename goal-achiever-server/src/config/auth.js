export const { JWT_SECRET = 'secret_key', JWT_EXPIRE_WITHIN = '1h' } =
  process.env;

export const jwt_secret = JWT_SECRET;
export const jwt_expire_within = JWT_EXPIRE_WITHIN;
