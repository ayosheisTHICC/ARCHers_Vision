"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Address = void 0;
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
const keccak_js_1 = require("ethereum-cryptography/keccak.js");
const web3_utils_1 = require("web3-utils");
const constants_js_1 = require("./constants.js");
const utils_js_1 = require("../common/utils.js");
class Address {
    constructor(buf) {
        if (buf.length !== 20) {
            throw new Error('Invalid address length');
        }
        this.buf = buf;
    }
    /**
     * Returns the zero address.
     */
    static zero() {
        return new Address((0, utils_js_1.zeros)(20));
    }
    /**
     * Is address equal to another.
     */
    equals(address) {
        return (0, web3_utils_1.uint8ArrayEquals)(this.buf, address.buf);
    }
    /**
     * Is address zero.
     */
    isZero() {
        return this.equals(Address.zero());
    }
    /**
     * Returns hex encoding of address.
     */
    toString() {
        return (0, web3_utils_1.bytesToHex)(this.buf);
    }
    /**
     * Returns Uint8Array representation of address.
     */
    toArray() {
        return this.buf;
    }
    /**
     * Returns the ethereum address of a given public key.
     * Accepts "Ethereum public keys" and SEC1 encoded keys.
     * @param pubKey The two points of an uncompressed key, unless sanitize is enabled
     * @param sanitize Accept public keys in other formats
     */
    static publicToAddress(_pubKey, sanitize = false) {
        let pubKey = _pubKey;
        (0, utils_js_1.assertIsUint8Array)(pubKey);
        if (sanitize && pubKey.length !== 64) {
            pubKey = constants_js_1.secp256k1.ProjectivePoint.fromHex(pubKey).toRawBytes(false).slice(1);
        }
        if (pubKey.length !== 64) {
            throw new Error('Expected pubKey to be of length 64');
        }
        // Only take the lower 160bits of the hash
        return (0, keccak_js_1.keccak256)(pubKey).slice(-20);
    }
}
exports.Address = Address;
//# sourceMappingURL=address.js.map