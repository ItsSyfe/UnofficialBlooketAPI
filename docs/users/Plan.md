# PUT /users/plan

Returns the plan that the user is on as well as the stripe id.

Note:

- Requires an authenticated user.
- Requires body to be encrypted.

## Example request

```js
PUT /api/users/plan HTTP/1.1
Host: api.blooket.com
x-blooket-build: {BuildID}
Content-Type: text/plain
Cookie: {AuthCookie}


```

Body needs to be nothing but encrypted

## Example response

```js
200 OK

{
	"plan": string,
	"stripe": string
}
```
