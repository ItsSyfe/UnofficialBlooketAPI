# GET /users/check-auth

Get's a cookie to be used in a login request, cookie needs to be saved and reused for future authenticated requests.

Not entirely sure what the difference between having a session and being authed is as they seem one and the same but this is called by the client after verifying the session.

Throughout the documentation the returned cookie from this request is referred to as the `AuthCookie`.

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
