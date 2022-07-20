# How to navigate Unofficial Blooket API Documentation

To make it easier to understand how we have layed out the documentation we have a few examples below on the terminology we use.
Let's take an example of a request and breakdown how we will refer to it.

`https://api.blooket.com/api/users/login`

First off we have the Base URL which for the above request is `https://api.blooket.com/api`

Next we have the Path which for the above request is `/users`

And finally we have the Endpoint which for the above request is `/login`

Please note that while every URL requires a base url we will not be including it within titles for the sake of brevity. Unless stated otherwise take the value of BaseURL from the table below.

## Commonly used variables

Below are a list of commonly used variables within the documentation.

| Variable   | Description                                                                        | Value (if applicable)                                                            |
| ---------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| BaseURL    | The URL that we will be taking as the base of all requests made to the Blooket API | `https://api.blooket.com/api`                                                    |
| AuthCookie | The cookie that we will be using to authenticate our requests                      | Get one from the [this](./users/GetCookie.md) request.                           |
| BuildID    | The build ID of the Blooket API                                                    | Can be grabbed from the [getBuildConfig](../snippets/getBuildConfig.js) snippet. |
