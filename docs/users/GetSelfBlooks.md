# GET /users/blooks

Gets a JSON array with all the blooks for the current logged in user.

Note:

- Requires an authenticated user.

## Example request

```js
GET /api/users/blooks HTTP/1.1
Host: api.blooket.com
x-blooket-build: {BuildID}
Cookie: {AuthCookie}
```

## Example response

```js
200 OK

{
	// all unlocks would be listed here
    "Rainbow Panda": int,
}
```
