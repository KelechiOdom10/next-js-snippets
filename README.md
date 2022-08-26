[![License](https://img.shields.io/github/license/falberthen/ecommerceddd.svg)](LICENSE)

# Snippets

What is Snippets?
---------------------
* Platform aimed at helping developers speed up their workflow through code snippets

Introduction
---------------------
I created a platform aimed at helping developers, particularly new and incoming developers, speed up their workflow by allowing them to search for reusable code blocks that can easily be copied and added to their existing codebase. 
It would also act as a second brain for developers to dump all the code that they frequently reuse for future reference. 

One of the best ways to improve your skills is to gain the habit of reading through other peoples code while writing code that others can learn new coding techniques and styles from.

### Key Features
- Authentication
  - Login
  - Sign Up
- Browse through a list of code snippets
- Copy individual code snippets to be reused in your application
- Create Code snippets
- Toggle between your snippets and those created by others
- Logout functionality

## Technologies 🔧

- Next.js(React)
- React Query
- Postgres
- Prism Renderer
- Chakra UI
- React Hook Form
- Next Connect
- Vercel

## Installation 💾

```bash
git clone https://github.com/KelechiOdom10/next-js-snippets.git
```

Fill your `.env` variables:

```
USERNAME=
HOST=
PASSWORD=
DATABASE_NAME=
DB_PORT
DATABASE_URL="postgresql://<USERNAME>:<PASSWORD>@<HOST>:<DB_PORT>/<DATABASE_NAME>?schema=public&sslmode=prefer"

SECRET=
BASE_URL='http://localhost:3000'

NEXT_DOMAIN=
VERCEL_URL=
```

Install deps:

```bash
npm install
```

Run Next dev server:

```bash
npm run dev
```

## Contributing

This is an open source project, and contributions of any kind are welcome and appreciated. Open issues, bugs, and feature requests are all listed on the [issues](https://github.com/KelechiOdom10/next-js-snippets/issues) tab and labeled accordingly. Feel free to open bug tickets and make feature requests.
