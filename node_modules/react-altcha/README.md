# React Altcha

React Altcha is a type-safe wrapper around [Altcha](https://altcha.org/), a fully open-source, self-hostable captcha solution.
Altcha is a good alternative to Google's reCaptcha and Cloudflare's Turnstile captcha solutions.
You can learn more about Altcha on their [official docs](https://altcha.org/docs/get-started/).

## Example

```tsx
import { Altcha } from "react-altcha"

export default function ProtectedForm() {
  async function handleSubmit() {
    // This form is captcha protected now.
    // ...handle form submition
  }

  return (
    <form onSubmit={handleSubmit}>
      <Altcha
        challengeurl={"https://example.com/api/captcha/challenge"}
        verifyurl={"https://example.com/api/captcha/verify"}
      />
      <button type="submit">Submit</button>
    </form>
  )
}
```

## Roadmap

These are the functionalities that we are going to be creating in order to make our captcha work.
You can create a todo list and follow the guide below.

Stuff to do:

1. [Install React Altcha library.](#install-react-altcha)
2. [Add Altcha widget to a form.](#add-altcha-widget-to-your-form)
3. [Create project secret.](#create-project-secret)
4. [Create crypto utils.](#create-crypto-utils)
5. [Create a challenge and verify route.](#create-api-routes)
6. [Test the widget.](#test-the-widget)

## Documentation

React Altcha is designed to painlessly implement a captcha system into your react frontend.
Since it is written in TypeScript you can expect smooth development experience with code suggestions.

### Install React Altcha

Install `react-altcha` using your preffered package manager:

```
npm i react-altcha
```

```
yarn add react-altcha
```

```
pnpm add react-altcha
```

---

### Add Altcha Widget To Your Form

The forms are protected by automatically blocking requests that do not have a captcha solved.
React Altcha currently blocks requests client side, but there are plans to support server side captcha validation.

Add a widget to your form:

```tsx
import Altcha from "react-altcha"

export default function ProtectedForm() {
  async function onSubmit() {
    // ...handle form submition
  }

  return (
    <form>
      {/* ...form fields */}
      <Altcha
        challenge={"https://example.com/api/captcha/challenge"}
        verifyurl={"https://example.com/api/captcha/verify"}
        workers={8}
        // ...more options
      />
      <button type="submit">Submit</button>
    </form>
  )
}
```

---

### Create Project Secret

We will need a common secret shared for encrypting the solution and decrypting it.
Best way to do this is to include it in a `.env` file, and export it as a constant.

Create a file `.env`:

```.env
# .env

# You should create a complex and fully random secret:
# c85c8942b388a495b8fd302568c1f8bab2b7752ed9eb6e306e3a489895cc123a881bd370c99c2b0572cdf4394564d574
ALTCHA_SECRET=some-complicated-secret
```

We are going to create a type-safe way of using it across the project.

Create a file `src/constants/index.ts`

```tsx
// src/constants/index.ts

export const ALTCHA_SECRET = process.env.ALTCHA_SECRET ?? "DefaultSecret"
```

You can now import this secret as a type-safe string accross the project.
Make sure you are not exposing this secret to the client.

---

### Create Crypto Utils

We will be using a couple of utils to make the code simpler and more readable.
Some of the utils are already provided by the official `altcha-lib` package.

Install `altcha-lib` package:

```
npm i altcha-lib
```

```
yarn add altcha-lib
```

```
pnpm add altcha-lib
```

---

Create a utils file `src/lib/utils.ts`:

```ts
// src/lib/utils.ts

import crypto from "crypto"
import { ALTCHA_SECRET } from "@/constants"

export function generateSalt(length = 20) {
  return crypto.randomBytes(length).toString("hex")
}

export function generateHmacKey() {
  const hmac = crypto.createHmac("sha256", ALTCHA_SECRET)

  return hmac.digest("hex")
}

export function generateSignature(message: string) {
  const hmac = crypto.createHmac("sha256", ALTCHA_SECRET)
  hmac.update(message)
  return hmac.digest("hex")
}
```

These utils along with the ones installed from the `altcha-lib` package will be used in our challenge creation and verification routes.

---

### Create Api Routes

In order for our captcha to work we need to create a challenge, and verify our captcha solution.
To do this we will create 2 Api routes, one for `creating a challenge` and another for `verifying the solution`.
This documentation will create an example of this setup in a next.js project.

Create following routes:

- `/api/captcha/challenge`
- `/api/captcha/verify`

### Challenge Api Route

This api route will handle the creation of a random number, and serving it to your altcha widget.
We will use the official altcha utils library for creating and verifying the challenge.

Create a file `src/app/api/captcha/challenge/route.ts`:

```ts
// src/app/api/captcha/challenge/route.ts

import { createChallenge } from "altcha-lib"
import { NextResponse } from "next/server"
import { generateHmacKey } from "@/lib/utils"

export async function GET() {
  const hmacKey = generateHmacKey()

  const { challenge, salt, algorithm, signature } = await createChallenge({
    hmacKey,
    algorithm: "SHA-256",
    maxnumber: 50000,
    saltLength: 20,
  })

  return NextResponse.json({
    challenge,
    salt,
    algorithm,
    signature,
  })
}
```

---

### Verify Api Route

This api route handles the verification of the solution provided by captcha widget.

Create a file `src/app/api/captcha/verify/route.ts`:

```ts
// src/app/api/captcha/verify/route.ts

import { ALTCHA_SECRET } from "@/constants"
import { verifySolution } from "altcha-lib"
import { type Payload } from "altcha-lib/types"
import { NextResponse } from "next/server"

type RequestDataType = {
  payload: string | Payload
}

export type VerifyCaptchaApiResponse = {
  ok: boolean
}

export async function POST(req: Request) {
  const data = (await req.json()) as RequestDataType

  const ok = await verifySolution(data.payload, ALTCHA_SECRET)

  return NextResponse.json({
    ok,
  })
}
```

### Test The Widget

Once you have created all of the things from [roadmap](#roadmap), you can try to test if the captcha widget is working correctly.
You should be able to press "I'm not a robot" and after a couple of seconds the captcha should be solved.

## Final Words

If you encounter any problems with the library please open an issue.
