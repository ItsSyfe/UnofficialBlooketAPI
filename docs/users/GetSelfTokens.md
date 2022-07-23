# GET /users/tokens

Gets a strubg with token count for the current logged in user.

Note:

- Requires an authenticated user.

## Example request

```js
GET /api/users/tokens HTTP/1.1
Host: api.blooket.com
x-blooket-build: {BuildID}
Cookie: {AuthCookie}
```

## Example response

```js
200 OK

string
```
