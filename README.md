# Expenses tracker

This project uses TypeScript along with several modern JavaScript frameworks such as Vue.js for building user interfaces. It uses Vue.js 3.3.10 as well as several supplementary packages for comprehensive application development, including pinia for state management, vue-router for routing and v-calendar for displaying calendars.

The project enforces quality JavaScript code and adheres to the best practices with the help of ESLint, enhanced with a set of plugins and configurations such as eslint-plugin-vue for Vue-specific linting rules, and eslint-config-prettier to integrate with Prettier for consistent code formatting.

We also use YUP for object schema validation and Day.js as a JavaScript date library alternative to moment.js. This project utilizes Nuxt.js, a powerful Vue.js framework for building server-rendered Vue.js applications.

For the deployment of the project to the web, we use gh-pages, a package that simplifies the process of deploying to a gh-pages branch on GitHub.

All package dependencies for the project are managed using npm, a well-known package manager for Node.js libraries.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Prerequisites

* [Node.js and npm](https://nodejs.org/en/) - Node.js is a JavaScript runtime. npm is Node's package ecosystem.

## Installing

Make sure to install the dependencies:

```bash
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

## Deployment

Build and deploy to Github Pages

```bash
npm run generate

npm run deploy
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
