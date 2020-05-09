"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Crypto Import
var crypto = __importStar(require("crypto"));
var algo = "aes-256-gcm";
var ivLength = 16;
var saltLength = 64;
var tagLength = 16;
var tagPosition = saltLength + ivLength;
var encryptPosition = tagPosition + tagLength;
var Refresher = /** @class */ (function () {
    function Refresher(secret) {
        this._secret = secret;
    }
    Refresher.prototype.getKey = function (salt) {
        return crypto.pbkdf2Sync(this._secret, salt, 100000, 32, "sha512");
    };
    Refresher.prototype.encrypt = function (state) {
        if (state == null) {
            throw new Error("value must not be null or undefined");
        }
        var value = JSON.stringify(state);
        var iv = crypto.randomBytes(ivLength);
        var salt = crypto.randomBytes(saltLength);
        var key = this.getKey(salt);
        var cipher = crypto.createCipheriv(algo, key, iv);
        var encrypted = Buffer.concat([
            cipher.update(value, "utf8"),
            cipher.final(),
        ]);
        var tag = cipher.getAuthTag();
        return Buffer.concat([salt, iv, tag, encrypted]).toString("hex");
    };
    Refresher.prototype.decrypt = function (value) {
        if (value == null) {
            throw new Error("value must not be null or undefined");
        }
        var stringValue = Buffer.from(value, "hex");
        var salt = stringValue.slice(0, saltLength);
        var iv = stringValue.slice(saltLength, tagPosition);
        var tag = stringValue.slice(tagPosition, encryptPosition);
        var encrypted = stringValue.slice(encryptPosition);
        var key = this.getKey(salt);
        var decipher = crypto.createDecipheriv(algo, key, iv);
        decipher.setAuthTag(tag);
        var result = decipher.update(encrypted) + decipher.final("utf8");
        return JSON.parse(result);
    };
    return Refresher;
}());
/**
 * @Method: Initialize Redux-Refresh
 * @Param {string}
 * @Return {Refresher}
 */
function initRefresh(secret) {
    var init = new Refresher(secret);
    return init;
}
exports.initRefresh = initRefresh;
