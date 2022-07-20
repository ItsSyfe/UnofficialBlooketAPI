async function getUserFromUsername(username) {
  return await fetch(`https://api.blooket.com/api/users?name=${username}`, {
    credentials: "include",
  }).then((res) => res.json());
}

await getUserFromUsername("Ben");
