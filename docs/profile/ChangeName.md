# PUT /users/change/name

Change the name of the account logged into.

Note:

- Requires an authenticated user.
- Requires body to be encrypted.

## Example request

```js
PUT /api/users/change/name HTTP/1.1
Host: api.blooket.com
x-blooket-build: {BuildID}
Content-Type: text/plain
Cookie: {AuthCookie}

{
	"name": {Username},
	"newName": {NewName}
}
```

Variables:

- Username: Username of the account, can be gotten from [login](../auth/Login.md) request or [get user](./GetUser.md).
- NewName: User input of name to change to.

## Example response

```js
200 OK
Content-Type: application/json

// TODO: Add response by using breakpoint
```
