export async function getProfile() {
  const req = await fetch(`/assets/github/profile.json`);
  return req.json();
}

export async function getRepos() {
  const req = await fetch(`/assets/github/repos.json`);
  return req.json();
}