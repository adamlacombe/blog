import { ensureDir, writeFile } from "fs-extra";
import fetch from 'node-fetch';
import { IGithubUserOrg, IGithubProfile, IGithubRepo, IGithubOrg } from "../src/global/definitions";

const DESTINATION_DIR = './src/assets/github';
const GITHUB_PROFILE_FILE = './src/assets/github/profile.json';
const GITHUB_REPOS_FILE = './src/assets/github/repos.json';
const GITHUB_ORGS_FILE = './src/assets/github/orgs.json';

(async function () {
  try {
    await ensureDir(DESTINATION_DIR);
  } catch (e) { }

  const profileReq = await fetch(`https://api.github.com/users/adamlacombe`);
  const profile: IGithubProfile = await profileReq.json();

  await writeFile(GITHUB_PROFILE_FILE, JSON.stringify(profile, null, 2), {
    encoding: 'utf8'
  });

  const reposReq = await fetch(`https://api.github.com/users/adamlacombe/repos?type=all&per_page=200`);
  const repos: IGithubRepo[] = (await reposReq.json()).sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

  await writeFile(GITHUB_REPOS_FILE, JSON.stringify(repos, null, 2), {
    encoding: 'utf8'
  });

  const userOrgsReq = await fetch(`https://api.github.com/users/adamlacombe/orgs`);
  const userOrgs: IGithubUserOrg[] = await userOrgsReq.json();
  
  const orgs: IGithubOrg[] = await Promise.all(userOrgs.map(async org => {
    const orgReq = await fetch(org.url);
    return await orgReq.json();
  }));

  await writeFile(GITHUB_ORGS_FILE, JSON.stringify(orgs, null, 2), {
    encoding: 'utf8'
  });

  console.log(`successfully downloaded github stats`);
})();
