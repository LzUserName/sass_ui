import JSEncrypt from 'jsencrypt/bin/jsencrypt.min'

// 密钥对生成 http://web.chacuo.net/netrsakeypair

const publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDe5SW8GmM1zMmxwnfysR7AYW/K\n' +
  'YsN4XlnoYJuED2ttWbSiDaMHg9cJRDXxAxetHL9AUCUkXq9xCkBhACgs4AlFeivl\n' +
  '/VF9UVy29b6UuyNlXjN2l+wmSDl25Ijgvw2unqaWqQkPaqgRouA4s+ZY9iO1NGUa\n' +
  '2M36jK9SwfEHmVFNAwIDAQAB'

const privateKey = 'MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAN7lJbwaYzXMybHC\n' +
  'd/KxHsBhb8piw3heWehgm4QPa21ZtKINoweD1wlENfEDF60cv0BQJSRer3EKQGEA\n' +
  'KCzgCUV6K+X9UX1RXLb1vpS7I2VeM3aX7CZIOXbkiOC/Da6eppapCQ9qqBGi4Diz\n' +
  '5lj2I7U0ZRrYzfqMr1LB8QeZUU0DAgMBAAECgYEA2tnrfxH5r21v7FWhKG24X/RL\n' +
  'q0/l1V3usTeJ+tSZCjk2Hpd9J3fPv4112TrMGHFNZ3xJu7gsUrVaGOPqjoU7E2NQ\n' +
  'swQpUiDS9CjAa44/2BoG+5w1CtuqNoZLAbmdxTNHjvfyMiNlianQeIXWDRvdNZrL\n' +
  'AOTsHR5H0Gc6kS5NC8ECQQD3LIS1ITHg5XCbzYQzQNzfzHNaheRFbA5CfbZh40La\n' +
  'LxA0DnhqRUF516WyjBh3IyM5N8rerJmMyKWiq8SiSb2pAkEA5tqwr9DaPP9Y0/rR\n' +
  'fKcB5/XII/OCcRgpV9VAJaE0LXHuPx+ANQNcI0Oq5exjuI1RrMDEk0skxgUjzwHR\n' +
  'k/moywJAaC1FSapSAX3ytlgqjgeakGD1hYPFMFVYtUGS6zMD7D3F0IsAyZmi/R2c\n' +
  '4uIVNbGDmQwg3zVUCnhPB37qA5Sc8QJAQEdUOyAkJCfVS/Dis5qs5TGCcMA06diY\n' +
  'amRuYAvqw1ydweW7hQdSeF83Dp4rhg+TVk62bWzW6Gw19EXFXTZ+0QJBAJP68X1A\n' +
  'lUFUmWHBHFp4+6i50Rswp9YKo0BJc/zxaFUjte3TkgleRBXAHLFapQc6LZBqVQDv\n' +
  'Dy34S7nC8im1AWQ='


// 加密
export function encrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey) // 设置公钥
  return encryptor.encrypt(txt) // 对数据进行加密
}

// 解密
export function decrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPrivateKey(privateKey) // 设置私钥
  return encryptor.decrypt(txt) // 对数据进行解密
}

