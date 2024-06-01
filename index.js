// /**
//  * @format
//  */

// import {AppRegistry} from 'react-native';
// import TaskList from './src/screens/TaskList';
// // import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => TaskList);

/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App'; // Importa o novo App.js
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

