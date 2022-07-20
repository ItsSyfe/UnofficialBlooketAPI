/**
 * SPDX-FileCopyrightText: 2022, zastix
 * 
 * SPDX-License-Identifier: Modifided 3-Clause BSD (see LICENSES/BlooketCheatsTools-LICENSE)
 * 
 * The following functions have been modified from the original source code but still retains the original copyright and license.
 */

 const getBuildConfig = () =>
 new Promise((resolve, reject) => {
	 try {
		 // we grab the entire webpack and filter through it for grabbing the current Blooket build id and the aes key being used, these change with each build.
		 const buildConfig = window.webpackJsonp
			 .map(e => Object.keys(e[1])
				 .map(t => e[1][t]))
					 .reduce((e, t) => [...e, ...t], [])
						 .find(e => /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(e.toString()) && /\(new TextEncoder\)\.encode\(\"(.+?)\"\)/.test(e.toString()))
							 .toString();
		 resolve({
			 buildId: buildConfig.match(/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/)[0],
			 aesKey: buildConfig.match(/\(new TextEncoder\)\.encode\(\"(.+?)\"\)/)[1]
		 }) 
	 } catch (err) {
		 console.error(err)
		 reject(false)
	 }
 })

// Following functions are under our MIT license

// importKey is a common function between encrypt and decrypt
async function importKey(aesKey) {
	// uses built-in WebCrypto API to import key and create a subtle key which can be used to encrypt data in the WebCrypto API
    return await window.crypto.subtle.importKey("raw", await window.crypto.subtle.digest("SHA-256", (new TextEncoder).encode(aesKey)), {
        name: "AES-GCM"
    }, false, ["encrypt", "decrypt"])
}

async function decrypt(encoded) {
	// decode the Base64 encoded data
    let encrypted = await window.atob(encoded);
	// split the IV and ciphertext apart
    let iv = Uint8Array.from(encrypted.slice(0, 12)
        .split("")
            .map(char => char.charCodeAt(0)));
    let ciphertext = encrypted.slice(12);
	// use the WebCrypto API to decrypt the data with the AES key and IV
    let blocks = await window.crypto.subtle.decrypt({
        name: "AES-GCM",
        iv
    }, await importKey((await getBuildConfig()).aesKey), Uint8Array.from(ciphertext.split("")
        .map(char => char.charCodeAt(0))));
	// return the decrypted data as a json object
    return (new TextDecoder).decode(blocks);
}

/**
 * usage is as follows:
 * await decrypt(base64 string)
 */