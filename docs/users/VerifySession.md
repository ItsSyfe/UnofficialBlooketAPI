# GET /users/verify-session

Used to check a cookie to see if its a valid auth cookie.

Also this is called twice by the client upon login for some unknown reason.

## Example request

```js
GET /api/users/verify-session HTTP/1.1
Host: api.blooket.com
x-blooket-build: {BuildID}
Cookie: {AuthCookie}
```

## Example response

```js
200 OK

{
    "_id": string,
    "name": string,
    "email": string,
    "gamesPlayed": int,
    "hasPassword": boolean,
    "plan": string,
    "role": string,
    "groupId": int,
    "groupName": string,
    "planName": string,
    "dateCreated": string
}
```
