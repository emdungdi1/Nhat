import React from 'react';
import './App.scss';
import { BrowserRouter, Switch } from 'react-router-dom';
import * as contant from './contants/index';
import Adminroute from './commom/AdminRoute/index';
import ReactNotifications from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import MessengerCustomerChat from 'react-messenger-customer-chat';
import { Provider } from 'react-redux';
import configstore from './redux/configstore';
const store = configstore();

function App(props) {
	function renderAdminRoute() {
		let xhtml = null;
		xhtml = contant.ROUTESSTC.map((route) => {
			return (
				<Adminroute
					key={route.path}
					path={route.path}
					component={route.component}
					name={route.name}
					exact={route.exact}
				></Adminroute>
			);
		});
		return xhtml;
	}

	return (
		<Provider store={store}>
			<BrowserRouter>
				<ReactNotifications> </ReactNotifications>
				<div className="tong">
					<Switch> {renderAdminRoute()} </Switch>
					{/* <MessengerCustomerChat pageId="100952058765770" appId="929094977622295" />,
					 */}
				</div>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
