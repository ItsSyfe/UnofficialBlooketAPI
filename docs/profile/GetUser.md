# GET /users

Gets the current user, grabbed from the `AuthCookie` and provides public information on the user.

Note:

- Requires an authenticated user.

## Example request

```js
GET /api/users HTTP/1.1
Host: api.blooket.com
x-blooket-build: {BuildID}
Cookie: {AuthCookie}
```

## Example response

```js
200 OK

{
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
```
