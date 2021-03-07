# Set up

Follow the instructions below to install, build, and run the
Project Hoverboard locally in less than 15 minutes.

## Install the Hoverboard and dependencies

1. [Fork repository](https://github.com/gdg-x/hoverboard/fork) and clone your fork locally
1. Install [Node.js (v10+)](https://nodejs.org/en/download/)
1. Install project dependencies: `npm install` (`yarn` should work but it's not officially supported)
1. Create [Firebase account](https://console.firebase.google.com) and login into [Firebase CLI](https://firebase.google.com/docs/cli/): `npx firebase login`
1. Update [Hoverboard config](/config) and [Resources](/data). More info can be found [here](01-configure-app.md)
1. Import initial data to the Firebase Database
   - Generate `serviceAccount.json` file
     - Go to [console.firebase.google.com](https://console.firebase.google.com) -> Project settings -> Service accounts
     - Ensure that **Node.js** is selected and press **Generate new private key**
     - Read the warning and press **Generate key**
     - Save the file as `serviceAccount.json` and to the root of your hoverboard directory (❗Do NOT commit this file to the public repository)
   - Enable Firestore in web console at [console.firebase.google.com](https://console.firebase.google.com) -> Database -> Cloud Firestore -> Create database. Select **locked mode** and press **Enable**
   - [Optional] You can edit `docs/default-firebase-data.json)` file using your own data
   - Run `npm run firestore:init`

## Directory structure

The diagram below is a brief summary of the directories within the project.

    /
    |---appengine/
    |---config/
    |---data/
    |---dist/
    |---docs/
    |---functions/
    |---images/
    |---internals/
    |---node_modules/
    |---src/
    |   |---elements/
    |   |---mixins/
    |   |---pages/
    |

- `appengine/` contains App Engine application that runs CRON job to send scheduled push notifications.
- `dist/` is the directory to deploy to production.
- `config/` folder for core project setup.
- `data/` folder with all data for the template including rest of config and resources for pages.
- `docs/` documentation.
- `functions/` directory with Firebase [cloud functions](https://firebase.google.com/docs/functions/) used for notifications, optimizations, saving data, etc.
- `images/` is for static images.
- `internals/` contains scripts that helps user to work with the project and it's data ([docs](./firebase-utils.md)).
- `node_modules/` is the place of Node dependencies.
- `src/` is where you store all of your source code and do all of your development.
- `elements/` is where you keep your custom elements.
- `pages/` is where you keep your pages' description.

## Build and serve

1. Run locally
   - `npm start`
1. Deploy
   - `npm run deploy`

There are two CLI flags you can set when running npm scripts:

- `NODE_ENV`: Control if code should be optimized for a production deployment with minimization or a faster local development.
- `BUILD_ENV`: Which `config` JSON file should be used when building. This is where you set the Firebase project details.

The common npm scripts are:

- `npm start`: Start a local development server.
- `npm run build`: Build a production version of the site to the `dist` directory.
- `npm run serve`: Build a production version of the site and serve it locally.
- `npm run deploy`: Build a production version of the site and deploy it to Firebase.

Below is the grid of the common npm script commands and thier supported CLI flags.

|             | `start`                               | `build`                               | `serve`                               | `deploy`                              |
| ----------- | ------------------------------------- | ------------------------------------- | ------------------------------------- | ------------------------------------- |
| `NODE_ENV`  | `development`                         | `production`\|`development`           | `production`\|`development`           | `production`                          |
| `BUILD_ENV` | `development`\|`production`\|`custom` | `production`\|`development`\|`custom` | `production`\|`development`\|`custom` | `production`\|`development`\|`custom` |

For example `npm start` only supports `NODE_ENV=development` and defaults to `BUILD_ENV=development` while `npm run build` defaults to `NODE_ENV=production` and `BUILD_ENV=production` but supports `NODE_ENV=development` and `BUILD_ENV=development`.

## Next steps

Now that your Hoverboard is up and running, learn how to
[configure the app](01-configure-app.md) for your needs, or how to [deploy the app to the web](04-deploy.md).
