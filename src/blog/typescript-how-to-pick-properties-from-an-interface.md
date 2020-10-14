---
title: How to pick properties from an interface
date: October 15, 2020
url: /blog/typescript-how-to-pick-properties-from-an-interface
author: Adam LaCombe
twitter: adamlacombe
description: Pick is a built-in type which allows you to pick specific properties from an interface.
tags: TypeScript
img: /assets/blog/images/typescript-how-to-pick-some-properties-from-an-interface/main3.png
---

You can use the built-in type [Pick](https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys). `Pick<MyInterface, "prop1" | "prop2">` is a built-in type which allows you to pick specific properties from an interface.

A great use-case would be verifying user credentials. You might have a `User` interface such as the following:


```typescript
interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
```

Instead of creating a new interface with the `email` and `password` properties from the `User` interface, lets `Pick` them! 

```typescript
// without Pick
async function verifyLoginCredentials(credentials: { email: string, password: string }) {
  // ... ...
}

// with Pick
async function verifyLoginCredentials(credentials: Pick<User, "email" | "password">) {
  const user = await getUserByEmail(credentials.email);

  if (!passwordMatches(credentials.password, user.password)) {
    throw new BadRequestError('incorrect password');
  }

  return user;
}

verifyLoginCredentials({ email: "example@example.com", password: "123" });
```