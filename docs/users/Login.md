# POST /users/login

Login to user account, requires a cookie to be sent with it and makes the cookie into an authenticated session if ``success`` is true.

Note:
- Requires body to be encrypted.

## Example request

```js
POST /api/users/login HTTP/1.1
Host: api.blooket.com
x-blooket-build: {BuildID}
Content-Type: text/plain
Cookie: {AuthCookie}

{
	name: {Username},
	password: {Password}
}
```

Variables:
- Username: Username or email of the account.
- Password: Password of the account.

## Example response

```js
200 OK
Content-Type: application/json

{
    "success": true,
    "user": {
        "_id": string,
        "isUnsubscribed": boolean,
        "numUnlocks": int,
        "wins": int,
        "topFives": int,
        "totalPoints": int,
        "totalBlooks": int,
        "playersDefeated": int,
        "avgPoints": int,
        "tens": int,
        "fifties": int,
        "classicPoints": int,
        "racingProgress": int,
        "gamesPlayed": int,
        "correctAnswers": int,
        "racingCorrects": int,
        "racesWon": int,
        "totalCash": int,
        "upgrades": int,
        "showdownWins": int,
        "totalCandy": int,
        "totalGold": int,
        "totalToys": int,
        "totalCrypto": int,
        "totalFishWeight": int,
        "boxesOpened": int,
        "gameHistory": array,
        "favorites": array,
        "tokens": int,
        "totalTokens": int,
        "tokensAvailable": int,
        "news": boolean,
        "plan": string,
        "stagesCleared": int,
        "towerClears": int,
        "towerSaves": array,
        "cafeCash": int,
        "foodServed": int,
        "cafeSaves": array,
        "defenseRounds": int,
        "defenseDmg": int,
        "defenseSaves": array,
        "guestsAnswered": int,
        "games": array,
        "histories": array,
        "homeworks": array,
        "questCount": int,
        "numRefers": int,
        "classes": array,
        "joinedClasses": array,
        "name": string,
        "dateCreated": string,
        "lastTokenDay": string,
        "modalMessage": string,
        "quests": json,
        "role": string,
        "unlocks": {
			// all unlocks would be listed here
            "Rainbow Panda": int,
        },
        "blookUsage": json,
        "folders": array,
        "favoriteFolders": array,
        "xp": int,
        "xpAvailable": int,
        "customBlooks": array
    }
}
```

```js
500 Internal Server Error
Content-Type: text/plain

internal server error
```