import { Person, WebSite } from 'schema-dts';
import * as githubProfile from '../assets/github/profile.json';
import { defaults } from './store';

export const SCHEMA_MOTHER_ID = `${window.location.origin}/#PersonRuthLaCombe`;
export const schemaMother: Person = {
  "@type": "Person",
  "@id": SCHEMA_MOTHER_ID,
  name: "Ruth LaCombe",
  birthDate: "1971-02-26",
  gender: "Female",
  nationality: "American"
};

export const SCHEMA_ME_ID = `${window.location.origin}/#PersonAdamLaCombe`;
export const schemaMe: Exclude<Person, string> = {
  "@type": "Person",
  "@id": SCHEMA_ME_ID,
  name: "Adam LaCombe",
  image: githubProfile.avatar_url.original,
  birthDate: "1994-02-22",
  email: "adamlacombe@pm.me",
  gender: "Male",
  jobTitle: "Web Developer",
  knowsAbout: [
    {
      "@type": "ComputerLanguage",
      name: "Typescript"
    },
    {
      "@type": "ComputerLanguage",
      name: "Javascript"
    },
    {
      "@type": "ComputerLanguage",
      name: "PHP",
      alternateName: "PHP: Hypertext Preprocessor"
    },
    {
      "@type": "ComputerLanguage",
      name: "HTML",
      alternateName: "Hypertext Markup Language"
    },
    {
      "@type": "ComputerLanguage",
      name: "CSS",
      alternateName: "Cascading Style Sheets"
    },
    {
      "@type": "ComputerLanguage",
      name: "SQL",
      alternateName: "Structured Query Language"
    },
    {
      "@type": "SoftwareApplication",
      name: "Redis",
      applicationCategory: "Developer Tools",
      applicationSubCategory: "Database"
    },
    {
      "@type": "SoftwareApplication",
      name: "MySQL",
      applicationCategory: "Developer Tools",
      applicationSubCategory: "Database"
    },
    {
      "@type": "Thing",
      name: "Google Cloud Platform"
    },
    {
      "@type": "Thing",
      name: "StencilJS"
    }
  ],
  nationality: "American",
  parent: [schemaMother],
  url: "https://adamlacombe.com",
  sameAs: [
    "https://stackoverflow.com/users/9238321/adam-lacombe",
    "https://github.com/adamlacombe",
    "https://dev.to/adamlacombe",
    "https://www.npmjs.com/~adamlacombe",
    "https://twitter.com/adamlacombe",
    "https://facebook.com/adamlacombe",
    "https://www.instagram.com/webdev204"
  ]
};

export const SCHEMA_WEBSITE_ID = `${window.location.origin}/#WebSite`;
export const schemaWebsite: WebSite = {
  '@type': 'WebSite',
  "@id": SCHEMA_WEBSITE_ID,
  name: 'Adam LaCombe',
  creator: schemaMe,
  keywords: defaults.keywords,
  description: defaults.description,
  image: defaults.image,
  inLanguage: "en-US"
};

export const schema = [
  {
    '@context': 'https://schema.org',
    ...schemaWebsite
  },
  {
    '@context': 'https://schema.org',
    ...schemaMe
  }
];