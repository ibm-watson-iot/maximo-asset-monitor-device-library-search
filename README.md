# EDC - device catalog search

### Note

- Add a new file in the [`/src/devices/`](/src/devices/) folder with the version number. You can generate the export file using [_export_devices_csv.py_](https://github.ibm.com/omnio/omnio_server/blob/master/omnio_db/management/commands/export_devices_csv.py) management command.

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) - the required version is specified in the [`.nvmrc`](/.nvmrc)
  - If you're on macOS or using WSL on Windows, we recommend using [`nvm`](https://github.com/nvm-sh/nvm) as your version manager for Node.
- Git
- if you don't have yarn on your MAC Machine then run `brew install yarn`

You'll also need a code editor to make changes. There are many to choose from but we suggest to use [VSCode](https://code.visualstudio.com/).

### Install dependencies

```bash
# install the dependencies
yarn install
```

### Build and start the development server

```bash
# run the server
yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Adding a dependency

```bash
# To add dependencies to the project
yarn add <packageName>
```

**Do not use `npm install`**.

## Storybook

### Start the storybook

```bash
# run the storybook
yarn storybook
```

Open [http://localhost:6006](http://localhost:6006) with your browser to see the result.

### Build the storybook

```bash
# Build the storybook which generate storybook-static folder
yarn build-storybook
```

### Deploy the storybook to git hub page

- Once we have _storybook-static_ folder we can publish the storybook to github pages by running below script
- This script will push the content of storybook-static folder into the _gh-pages_ branch of the git repo.
- Git repo details need to be added in _homepage_ properties of **package.json** file

```bash
yarn deploy-storybook
```
