// Crypto Import
import * as crypto from "crypto";

const algo = "aes-256-gcm";
const ivLength = 16;
const saltLength = 64;
const tagLength = 16;
const tagPosition = saltLength + ivLength;
const encryptPosition = tagPosition + tagLength;

class Refresher {
  private _secret: string;
  constructor(secret: string) {
    this._secret = secret;
  }

  private getKey(salt: any) {
    return crypto.pbkdf2Sync(this._secret, salt, 100000, 32, "sha512");
  }

  encrypt(state: object) {
    if (state == null) {
      throw new Error("value must not be null or undefined");
    }

    const value = JSON.stringify(state);

    const iv = crypto.randomBytes(ivLength);
    const salt = crypto.randomBytes(saltLength);

    const key = this.getKey(salt);

    const cipher = crypto.createCipheriv(algo, key, iv);
    const encrypted = Buffer.concat([
      cipher.update(value, "utf8"),
      cipher.final(),
    ]);

    const tag = cipher.getAuthTag();

    return Buffer.concat([salt, iv, tag, encrypted]).toString("hex");
  }

  decrypt(value: string) {
    if (value == null) {
      throw new Error("value must not be null or undefined");
    }

    const stringValue = Buffer.from(value, "hex");

    const salt = stringValue.slice(0, saltLength);
    const iv = stringValue.slice(saltLength, tagPosition);
    const tag = stringValue.slice(tagPosition, encryptPosition);
    const encrypted = stringValue.slice(encryptPosition);

    const key = this.getKey(salt);

    const decipher = crypto.createDecipheriv(algo, key, iv);

    decipher.setAuthTag(tag);
    const result = decipher.update(encrypted) + decipher.final("utf8");

    return JSON.parse(result);
  }
}

/**
 * @Method: Initialize Redux-Refresh
 * @Param {string}
 * @Return {Refresher}
 */
export function initRefresh(secret: string) {
  const init = new Refresher(secret);
  return init;
}
