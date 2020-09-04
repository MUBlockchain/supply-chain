# supply-chain


## Description

This application is a front-end integration of the supply-chain smart contract activity provided by Consensys Academy. The front-end was created by using react and connects to the Soldity backend via Web3. The truffle.js file allows you to connect to a personal blockchain on your local machine, or by connecting to your own personal instance of the rinkeby testnet.

Note: Due to high traffic / usage, expect much slower speeds on rinkeby. 
 
## ENV Setup (required for rinkeby connection)

* You will need to change the name of the ".example.env" file to ".env". 

* Inside of the env you will see a variable named "MNEMONIC". This will require you to access your mnemonic that MetaMask provides you.

* Inside of the env you will see a variable named "INFURA". You need to get your Infura id from the URL provided by your customized Infura Ethereum node.
  The URL will take the following form: "https://rinkeby.infura.io/v3/<your id here>".

## Available Scripts

In the project directory, you can run:


### `npm run buildcontracts`

This script is essential for compiling the Solidity contracts into their abi form that is readable in the frontend of the application. Without running this the appliction will not start correctly.

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.


