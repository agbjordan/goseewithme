import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

const Login = Loadable({
	loader: () => import(/* webpackChunkName: "login" */ './Login'),
	loading: () => null,
	modules: ['login'],
});

const Homepage = Loadable({
	loader: () => import(/* webpackChunkName: "homepage" */ './homepage'),
	loading: () => null,
	modules: ['homepage'],
});

const Dashboard = Loadable({
	loader: () => import(/* webpackChunkName: "Dashboard" */ './Dashboard'),
	loading: () => null,
	modules: ['dashboard'],
});

const Affiliates = Loadable({
	loader: () => import(/* webpackChunkName: "Affiliates" */ './Affiliates'),
	loading: () => null,
	modules: ['affiliates'],
});

const Agents = Loadable({
	loader: () => import(/* webpackChunkName: "Agents" */ './Agents'),
	loading: () => null,
	modules: ['agents'],
});

const Bookings = Loadable({
	loader: () => import(/* webpackChunkName: "Bookings" */ './Bookings'),
	loading: () => null,
	modules: ['bookings'],
});

const Guides = Loadable({
	loader: () => import(/* webpackChunkName: "Guides" */ './Guides'),
	loading: () => null,
	modules: ['guides'],
});

const Inbox = Loadable({
	loader: () => import(/* webpackChunkName: "Inbox" */ './Inbox'),
	loading: () => null,
	modules: ['inbox'],
});

const Influencers = Loadable({
	loader: () => import(/* webpackChunkName: "Influencers" */ './Influencers'),
	loading: () => null,
	modules: ['influencers'],
});

const Notifications = Loadable({
	loader: () =>
		import(/* webpackChunkName: "Notifications" */ './Notifications'),
	loading: () => null,
	modules: ['notifications'],
});

const Products = Loadable({
	loader: () => import(/* webpackChunkName: "Products" */ './Products'),
	loading: () => null,
	modules: ['products'],
});

const Reviews = Loadable({
	loader: () => import(/* webpackChunkName: "Reviews" */ './Reviews'),
	loading: () => null,
	modules: ['reviews'],
});

const Settings = Loadable({
	loader: () => import(/* webpackChunkName: "Settings" */ './Settings'),
	loading: () => null,
	modules: ['settings'],
});

const Transactions = Loadable({
	loader: () =>
		import(/* webpackChunkName: "Transactions" */ './Transactions'),
	loading: () => null,
	modules: ['transactions'],
});

const Travellers = Loadable({
	loader: () => import(/* webpackChunkName: "Travellers" */ './Travellers'),
	loading: () => null,
	modules: ['travellers'],
});

const Administrators = Loadable({
	loader: () =>
		import(/* webpackChunkName: "Administrators" */ './Administrators'),
	loading: () => null,
	modules: ['users'],
});

const AdministratorsUpdate = Loadable({
	loader: () =>
		import(/* webpackChunkName: "Administrators" */ './Administrators/update'),
	loading: () => null,
	modules: ['users'],
});

const AdministratorsCreate = Loadable({
	loader: () =>
		import(/* webpackChunkName: "Administrators" */ './Administrators/create'),
	loading: () => null,
	modules: ['users'],
});

export default () => (
	<Switch>
		<Route exact path="/" component={Homepage} />
		<Route exact path="/admin/" component={Dashboard} />
		<Route exact path="/admin/login" component={Login} />
		<Route exact path="/admin/affiliates" component={Affiliates} />
		<Route exact path="/admin/agents" component={Agents} />
		<Route exact path="/admin/bookings" component={Bookings} />
		<Route exact path="/admin/guides" component={Guides} />
		<Route exact path="/admin/inbox" component={Inbox} />
		<Route exact path="/admin/influencers" component={Influencers} />
		<Route exact path="/admin/notifications" component={Notifications} />
		<Route exact path="/admin/products" component={Products} />
		<Route exact path="/admin/reviews" component={Reviews} />
		<Route exact path="/admin/settings" component={Settings} />
		<Route exact path="/admin/transactions" component={Transactions} />
		<Route exact path="/admin/travellers" component={Travellers} />
		<Route exact path="/admin/administrators" component={Administrators} />
		<Route
			exact
			path="/admin/administrators/create"
			component={AdministratorsCreate}
		/>
		<Route
			exact
			path="/admin/administrators/update/:id"
			component={AdministratorsUpdate}
		/>
	</Switch>
);
