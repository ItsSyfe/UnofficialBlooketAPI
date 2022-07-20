async function getUserFromUsername(username) {
  return await fetch(`https://api.blooket.com/api/users?name=${username}`, {
    credentials: "include",
  }).then((res) => res.json());
}

/**
 * usage is as follows:
 * await getUserFromUsername(username)
 */
