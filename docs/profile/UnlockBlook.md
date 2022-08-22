# PUT /users/unlockblook

Used to open a box and returns the blook that the user has received.

Note:

- Requires an authenticated user.
- Requires body to be encrypted.

## Example request

```js
PUT /api/users/unlockblook HTTP/1.1
Host: api.blooket.com
x-blooket-build: {BuildID}
Content-Type: text/plain
Cookie: {AuthCookie}

{
	name: {Username},
	box: {BoxName}
}
```

Variables:

- Username: Username of the account, can be gotten from [login](../auth/Login.md) request or [get user](./GetUser.md).
- BoxName: Name of the box you want to open.

## Example response

```js
200 OK
Content-Type: application/json

{
	"tokens": int,
	"isNewBlook": boolean,
	"unlockedBlook": string
}
```

```js
500 Internal Server Error
Content-Type: text/plain

internal server error
```
