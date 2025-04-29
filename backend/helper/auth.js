import CryptoJS from "crypto-js";
import jwt from 'jsonwebtoken';

export function encryptPassword(password) {
  const secretKey = process.env.SECRET;
  return CryptoJS.AES.encrypt(password, secretKey).toString();
}

export function decryptPassword(encryptedPassword) {
  const secretKey = process.env.SECRET;
  const password = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
  return password.toString(CryptoJS.enc.Utf8);
}

export function comparePassword(password, encryptedPassword) {
  const decryptedPassword = decryptPassword(encryptedPassword);
  if (password === decryptedPassword) return true;
  return false;
}

export function sendToken(id, email) {
    const secretKey = process.env.SECRET;
    const token = jwt.sign({id, email}, secretKey, {expiresIn: 24 * 60 * 60});

    return token;
}

export function verifyToken(req, res, next) {
    const token = req.headers.token;
}