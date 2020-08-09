import { IGithubOrg, IGithubProfile, IGithubRepo } from "./definitions";

export async function getProfile(): Promise<IGithubProfile> {
  const req = await fetch(`/assets/github/profile.json`);
  return req.json();
}

export async function getRepos(): Promise<IGithubRepo[]> {
  const req = await fetch(`/assets/github/repos.json`);
  return req.json();
}

export async function getOrgs(): Promise<IGithubOrg[]> {
  const req = await fetch(`/assets/github/orgs.json`);
  return req.json();
}