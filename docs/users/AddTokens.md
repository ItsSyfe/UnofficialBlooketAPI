# PUT /user/add-rewards

This endpoint is used to request the server to add rewards to a user, it is used at the end of a game.

Note:

- Requires an authenticated user.
- Requires body to be encrypted.

## Example request

```js
PUT /api/users/add-rewards HTTP/1.1
Host: api.blooket.com
x-blooket-build: {BuildID}
Content-Type: application/json
Cookie: {AuthCookie}

{
	name: {Username},
	addedTokens: {Token},
	addedXp: {XP}
}
```

Variables:

- Username: Username of the account, can be gotten from [login](./Login.md) request or [get user](./DOESNTEXIST.md).
- Token: Amount of tokens to add to the user.
- XP: Amount of XP to add to the user.

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
