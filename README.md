# Sonrisa Donuts

## Getting started

This is a monorepo that contains the server and client code, as well as a core package which containing types and interfaces common to all. The repo is managed by Lerna and yarn workspaces. To get started, simply run `yarn install`. Dependencies for each package will be installed, with all common dependencies living in the root level `node_modules` folder.

Before a dev environment can be spun up, `@sonrisa/server` needs to be built. This is because it uses typescript to transpile files into the dist folder, where nodemon will be watching for changes to `dist/server.js`. Run `yarn build` from the repo root to build all packages (There are also scripts to build each package individually). Then to spin up a dev environment, run `yarn start` from the repo root.

## Gmail Api

When someone places an order, they are sent a confirmation email with a receipt using the gmail API. This requires an OAuth2 access token, which is continuously refreshed with a refresh token. The refresh token can go stale for a number of reasons, including if the sonrisa google account password changes. If this occurs, a new refresh token can be created here: https://developers.google.com/oauthplayground. Click the gear icon in the top right, and paste in the sonrisa client id and client secret, found in the google cloud console. Then follow the steps on the left side.

## Instagram Basic Display API

Same as gmail, the long lived access token can be invalid if insta/facebook password is changed. Go to facebook developers console in Sonrisa app, select Instagram Basic Display. Scroll down to test users and generate a new token with the new login information.
