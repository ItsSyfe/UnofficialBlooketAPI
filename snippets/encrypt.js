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

async function encrypt(json) {
	// create a UInt8Array (blocks of the data) from the json string to pass into WebCrypto
    const blocks = await (new TextEncoder).encode(JSON.stringify(json));
	// generate a random IV using the WebCrypto API
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
	// use the WebCrypto API to encrypt the data with the AES key and IV
    const ciphertext = await window.crypto.subtle.encrypt({
        name: "AES-GCM",
        iv
    }, await importKey((await getBuildConfig()).aesKey), blocks);
	// combines the IV and attaches it to the front of the combined cipher text and then encodes the whole thing in Base64
    return window.btoa(Array.from(iv).map(char => String.fromCharCode(char)).join("") + Array.from(new Uint8Array(ciphertext)).map(char => String.fromCharCode(char)).join(""));
}

/**
 * usage is as follows:
 * await encrypt(json)
 */