import { ensureDir, writeFile } from "fs-extra";
import fetch from 'node-fetch';
import sharp from 'sharp';
import { IGithubOrg, IGithubProfile, IGithubRepo, IGithubUserOrg } from "../src/global/definitions";

const { promisify } = require('util');
const sizeOf = promisify(require('image-size'));

const DESTINATION_DIR = './src/assets/github';
const GITHUB_PROFILE_FILE = './src/assets/github/profile.json';
const GITHUB_REPOS_FILE = './src/assets/github/repos.json';
const GITHUB_ORGS_FILE = './src/assets/github/orgs.json';
const PROFILE_AVATAR_WIDTH = 180;
const ORG_AVATAR_WIDTH = 85;

async function downloadImage(url: string, width: number) {
  let fileName = `${new URL(url).pathname.replace('/u/', '')}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);

  const type = response.headers.get('content-type').replace('image/', '');
  const buffer = await response.buffer();
  const originalFile = `${DESTINATION_DIR}/${fileName}.${type}`;
  const optimizedFile = (type !== "jpeg") ? `${DESTINATION_DIR}/${fileName}.webp` : null;

  await sharp(buffer).resize({ width: width, height: null }).toFile(originalFile);
  const dimensions = await sizeOf(originalFile);

  if (type !== "jpeg") {
    await sharp(originalFile).webp({ quality: 90 }).toFile(optimizedFile);
  }

  return {
    original: originalFile.replace('./src', ''),
    optimized: (optimizedFile) ? optimizedFile.replace('./src', '') : null,
    dimensions: {
      width: dimensions.width,
      height: dimensions.height
    }
  };
}

(async function () {
  try {
    await ensureDir(DESTINATION_DIR);
  } catch (e) { }

  const profileReq = await fetch(`https://api.github.com/users/adamlacombe`);
  const profile: IGithubProfile = await profileReq.json();

  profile.avatar_url = await downloadImage(profile.avatar_url as any, PROFILE_AVATAR_WIDTH);

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
    const res: IGithubOrg = await orgReq.json();
    return {
      ...res,
      avatar_url: await downloadImage(res.avatar_url as any, ORG_AVATAR_WIDTH),
    } as IGithubOrg
  }));

  await writeFile(GITHUB_ORGS_FILE, JSON.stringify(orgs, null, 2), {
    encoding: 'utf8'
  });

  console.log(`successfully downloaded github stats`);
})();
