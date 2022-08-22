<h2 align="center">⚠️ UNDER CONSTRUCTION, A LOT STILL NEEDS TO BE DOCUMENTED ⚠️</h2>
<h2 align="center">HERE BE DRAGONS</h2>

# Unofficial Blooket API Documentation

This is a repository with everything you need to know about the Blooket API (blooket.com).

If you have any suggestions or find any issues, feel free to open a GitHub issue.

_Note: Use of these endpoints are at your own risk. We do not take ANY responsibility for what you do with anything in this repository._

## Credits

Before talking about where to start I would like to thank all [contributors](https://github.com/ItsSyfe/UnofficialBlooketAPI/contributors) as well as a massive thank you to the people below.

- [zastix](https://github.com/notzastix) - Existing [repo](https://github.com/notzastix/BlooketCheatTools) on creating Blooket cheats our AES encryptor is based off their work.
- [Goose](https://github.com/GooseterV/) - Helping with countless issues and providing a good insight into Blooket cheats for an outside developer (myself).

## Getting Started with the Blooket API

To get started you first need to understand that while Blooket requests are mostly client sided the creator of Blooket, Ben, has tried to restrict what can be done and prevent abuse of the API by implementing an encryption method called AES-GCM.

More about AES-GCM **(YOU CAN SKIP THIS IF YOU DO NOT WISH TO UNDERSTAND HOW EXACTLY AES-GCM CRYPTOGRAPHY WORKS)**, AES-GCM is an implementation of a cryptography method called Galois/Counter Mode which is a mode of operation for symmetric-key cryptographic block ciphers (widely used for performance and most likely is why it was chosen).
GCM has high throughput rates which can be leveraged even on lower speed hardware.

To encrypt plaintext AES-GCM places blocks into sequential order and combines it with an initialization vector (IV) and is then encrypted with a block cipher E (which in our case is an AES key).
The result of the encryption is then XORed with the plaintext to produce the ciphertext, due to the result of this operation being essentially a stream cipher it's required that a different IV is used for each plaintext input, we then create an authentication tag by considering the ciphertext blocks as coefficients of polynomials which is then evaluated at a key-dependent point H, using finite field arithmetic.
It's then encrypted producing our authentication tag that can verify the integrity of the data.
Finally the encrypted text then contains the IV, ciphertext and authentication tag, Blooket then encodes the encrypted text with Base64.

**tl;dr** Many operations are used to produce a encrypted text with an IV, ciphertext and authentication tag which is then encoded in Base64.

---

Using AES-GCM we are required to use a hash key (AES key) which is provided to us within Blooket's code.

```js
// For full transparency, this is not a function created by me and requires you to follow the license on zastix's repository for using it in your own work.
const getBuildConfig = () =>
  new Promise((resolve, reject) => {
    try {
      // we grab the entire webpack and filter through it for grabbing the current Blooket build id and the aes key being used, these change with each build.
      const buildConfig = window.webpackJsonp
        .map((e) => Object.keys(e[1]).map((t) => e[1][t]))
        .reduce((e, t) => [...e, ...t], [])
        .find(
          (e) =>
            /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(e.toString()) &&
            /\(new TextEncoder\)\.encode\(\"(.+?)\"\)/.test(e.toString())
        )
        .toString();
      resolve({
        buildId: buildConfig.match(/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/)[0],
        aesKey: buildConfig.match(
          /\(new TextEncoder\)\.encode\(\"(.+?)\"\)/
        )[1],
      });
    } catch (err) {
      console.error(err);
      reject(false);
    }
  });
```

Calling the above function will return a promise which will resolve with an object containing the buildId and secret. We can then use the `aesKey` to encrypt our own data.

```js
// importKey is a common function between encrypt and decrypt
async function importKey(aesKey) {
  // uses built-in WebCrypto API to import key and create a subtle key which can be used to encrypt data in the WebCrypto API
  return await window.crypto.subtle.importKey(
    "raw",
    await window.crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(aesKey)
    ),
    {
      name: "AES-GCM",
    },
    false,
    ["encrypt", "decrypt"]
  );
}

async function encrypt(json) {
  // create a UInt8Array (blocks of the data) from the json string to pass into WebCrypto
  const blocks = await new TextEncoder().encode(JSON.stringify(json));
  // generate a random IV using the WebCrypto API
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  // use the WebCrypto API to encrypt the data with the AES key and IV
  const ciphertext = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv,
    },
    await importKey((await getBuildConfig()).aesKey),
    blocks
  );
  // combines the IV and attaches it to the front of the combined cipher text and then encodes the whole thing in Base64
  return window.btoa(
    Array.from(iv)
      .map((char) => String.fromCharCode(char))
      .join("") +
      Array.from(new Uint8Array(ciphertext))
        .map((char) => String.fromCharCode(char))
        .join("")
  );
}
```

Doing it in reverse is a simple process and thus we create a similar function to decrypt the encrypted data.

```js
// importKey is a common function between encrypt and decrypt
async function importKey(aesKey) {
  // uses built-in WebCrypto API to import key and create a subtle key which can be used to encrypt data in the WebCrypto API
  return await window.crypto.subtle.importKey(
    "raw",
    await window.crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(aesKey)
    ),
    {
      name: "AES-GCM",
    },
    false,
    ["encrypt", "decrypt"]
  );
}

async function decrypt(encoded) {
  // decode the Base64 encoded data
  let encrypted = await window.atob(encoded);
  // split the IV and ciphertext apart
  let iv = Uint8Array.from(
    encrypted
      .slice(0, 12)
      .split("")
      .map((char) => char.charCodeAt(0))
  );
  let ciphertext = encrypted.slice(12);
  // use the WebCrypto API to decrypt the data with the AES key and IV
  let blocks = await window.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv,
    },
    await importKey((await getBuildConfig()).aesKey),
    Uint8Array.from(ciphertext.split("").map((char) => char.charCodeAt(0)))
  );
  // return the decrypted data as a json object
  return new TextDecoder().decode(blocks);
}
```

---

With that your should now have the necessary functions to encrypt and decrypt data thus allowing you to use the Blooket API and create your own projects!

We have other writeups within this repository that explain how to use specific API requests which may be of interest to you, if they are please check them out, we also have a few examples of simple scripts that use the Blooket API.

Along with this we also have information about creating GUIs, toasts and other limitations within the Blooket ecosystem.

## License

This project is under the MIT license unless stated otherwise.

To see the full license please visit [here.](./LICENSE)

## Contributing

When contributing to this project we ask you to create an issue and tell us about it, if you would like to fix your own issue please do but make sure to link your pull request to the issue you are fixing.

If you do not have the knowledge to fix an issue yourself, don't worry! We'll review your issue and if we deem it valid then we'll fix it for you.

For commiting guidelines we don't have a strict structure but we do want you to make them at least somewhat consistent and related to what you're doing with the commit, pull requests are also squashed before they are merged unless it's a major change so don't worry about commiting many times.
