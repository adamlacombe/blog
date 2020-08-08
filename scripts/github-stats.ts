import { ensureDir, writeFile } from "fs-extra";
import fetch from 'node-fetch';
import { IGithubProfile, IGithubRepo } from "../src/global/definitions";

const DESTINATION_DIR = './src/assets/github';
const GITHUB_PROFILE_FILE = './src/assets/github/profile.json';
const GITHUB_REPOS_FILE = './src/assets/github/repos.json';

(async function () {
  try {
    await ensureDir(DESTINATION_DIR);
  } catch (e) { }

  const profileReq = await fetch(`https://api.github.com/users/adamlacombe`);
  const profile: IGithubProfile = await profileReq.json();

  await writeFile(GITHUB_PROFILE_FILE, JSON.stringify(profile, null, 2), {
    encoding: 'utf8'
  });

  const reposReq = await fetch(`https://api.github.com/users/adamlacombe/repos`);
  const repos: IGithubRepo[] = (await reposReq.json()).sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

  await writeFile(GITHUB_REPOS_FILE, JSON.stringify(repos, null, 2), {
    encoding: 'utf8'
  });

  console.log(`successfully downloaded github stats`);
})();
