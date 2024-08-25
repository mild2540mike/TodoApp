const CryptoJS = require("crypto-js");
// require('dotenv').config()

function encryptSHA256(data: any) {
  const hash = CryptoJS.SHA256(data).toString()
  return hash
}


function encryptAES(data: any, salt: any, secret: any) {
  if (!data) return null
  return CryptoJS.AES.encrypt(JSON.stringify(data) + salt, secret).toString()
}

function decryptAES(data: any, salt: any, secret: any) {
  try {
    var bytes = CryptoJS.AES.decrypt(data, secret);
    var decrypted = bytes.toString(CryptoJS.enc.Utf8)
    var salted = decrypted.substring(decrypted.length - salt.length)
    var unsalted = decrypted.substring(0, decrypted.length - salt.length)
    if (salted !== salt) return null
    return JSON.parse(unsalted)
  } catch (e) {
    return null
  }
}

function encryptServerClientProp(data: any) {
  return process.env.NEXT_PUBLIC_TODO_SERVER_CLIENT_ENCRYPT_ENABLE === '1'
    ? encryptAES(data, process.env.NEXT_PUBLIC_TODO_SERVER_CLIENT_ENCRYPT_SALT, process.env.NEXT_PUBLIC_TODO_SERVER_CLIENT_ENCRYPT_SECRET)
    : data
}

function decryptServerClientProp(data: any) {
  return process.env.NEXT_PUBLIC_TODO_SERVER_CLIENT_ENCRYPT_ENABLE === '1'
    ? decryptAES(data, process.env.NEXT_PUBLIC_TODO_SERVER_CLIENT_ENCRYPT_SALT, process.env.NEXT_PUBLIC_TODO_SERVER_CLIENT_ENCRYPT_SECRET)
    : data
}

function generateToken(byteLength = 16) {
  const random = CryptoJS.lib.WordArray.random(byteLength);
  return encryptAES(random.toString(CryptoJS.enc.Hex), process.env.NEXT_PUBLIC_TODO_SERVER_CLIENT_ENCRYPT_SALT, process.env.NEXT_PUBLIC_TODO_SERVER_CLIENT_ENCRYPT_SECRET);
}

export {
  encryptSHA256,
  encryptAES, 
  decryptAES,
  generateToken,
  encryptServerClientProp,
  decryptServerClientProp
}