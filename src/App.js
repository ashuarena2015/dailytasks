// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import Routes from './Root';
// import './App.css';

// export default class App extends Component {
// 	render() {
// 		return (
//       <div className="app">
//         <Routes />
//       </div>
// 		)
// 	}
// }

// ReactDOM.render(<App />, document.getElementById('root'));


import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Routes from './Root';
import createStore from './store';
import { setupInterceptors } from './actions/axios';
import './App.css';

const store = createStore({});
setupInterceptors();
export default class App extends Component {
	render() {
		return (
	    <Provider store={store}>
				<Routes />
	    </Provider>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));

