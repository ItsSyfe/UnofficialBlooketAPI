# GET /users/check-auth

Get's a cookie to be used in a login request, cookie needs to be saved and reused for future authenticated requests.

Throughout the documentation the returned cookie from this request is referred to as the ``AuthCookie``.

## Example request

```js
GET /api/users/check-auth HTTP/1.1
Host: api.blooket.com
```

## Example response

```js
200 OK

null

HEADERS:
 - Set-Cookie: Use this cookie for future requests.
```