import React from 'react';
import { Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import AuthenticatedRoute from '../components/Auth/isAuthorised';
import UnauthenticatedRoute from '../components/Auth/unAuthorised';

const Login = Loadable({
	loader: () => import(/* webpackChunkName: "login" */ './Login'),
	loading: () => null,
	modules: ['login'],
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
		<UnauthenticatedRoute
			exact
			path="/"
			redirect="/admin/dashboard"
			component={Login}
		/>

		<UnauthenticatedRoute
			exact
			path="/admin"
			redirect="/admin/dashboard"
			component={Login}
		/>

		<UnauthenticatedRoute
			exact
			path="/admin/login"
			redirect="/admin/dashboard"
			component={Login}
		/>
		<AuthenticatedRoute
			exact
			path="/admin/dashboard"
			redirect="/admin/login"
			component={Dashboard}
		/>
		<AuthenticatedRoute
			exact
			path="/admin/affiliates"
			redirect="/admin/login"
			customRole="affiliates"
			redirectRole="/admin/dashboard"
			component={Affiliates}
		/>
		<AuthenticatedRoute
			exact
			path="/admin/agents"
			redirect="/admin/login"
			customRole="agents"
			redirectRole="/admin/dashboard"
			component={Agents}
		/>
		<AuthenticatedRoute
			exact
			path="/admin/bookings"
			redirect="/admin/login"
			customRole="bookings"
			redirectRole="/admin/dashboard"
			component={Bookings}
		/>
		<AuthenticatedRoute
			exact
			path="/admin/guides"
			component={Guides}
			customRole="guides"
			redirectRole="/admin/dashboard"
			redirect="/admin/login"
		/>
		<AuthenticatedRoute
			exact
			path="/admin/inbox"
			component={Inbox}
			redirect="/admin/login"
		/>
		<AuthenticatedRoute
			exact
			path="/admin/influencers"
			component={Influencers}
			customRole="influencers"
			redirectRole="/admin/dashboard"
			redirect="/admin/login"
		/>
		<AuthenticatedRoute
			exact
			path="/admin/notifications"
			component={Notifications}
			redirect="/admin/login"
		/>
		<AuthenticatedRoute
			exact
			path="/admin/products"
			component={Products}
			customRole="products"
			redirectRole="/admin/dashboard"
			redirect="/admin/login"
		/>
		<AuthenticatedRoute
			exact
			path="/admin/reviews"
			component={Reviews}
			customRole="reviews"
			redirectRole="/admin/dashboard"
			redirect="/admin/login"
		/>
		<AuthenticatedRoute
			exact
			path="/admin/settings"
			component={Settings}
			customRole="settings"
			redirectRole="/admin/dashboard"
			redirect="/admin/login"
		/>
		<AuthenticatedRoute
			exact
			path="/admin/transactions"
			component={Transactions}
			customRole="transactions"
			redirectRole="/admin/dashboard"
			redirect="/admin/login"
		/>
		<AuthenticatedRoute
			exact
			path="/admin/travellers"
			component={Travellers}
			customRole="travellers"
			redirectRole="/admin/dashboard"
			redirect="/admin/login"
		/>
		<AuthenticatedRoute
			exact
			path="/admin/administrators"
			component={Administrators}
			customRole="administrators"
			redirectRole="/admin/dashboard"
			redirect="/admin/login"
		/>
		<AuthenticatedRoute
			exact
			path="/admin/administrators/create"
			component={AdministratorsCreate}
			customRole="administrators"
			redirectRole="/admin/dashboard"
			redirect="/admin/login"
		/>
		<AuthenticatedRoute
			exact
			path="/admin/administrators/update/:id"
			component={AdministratorsUpdate}
			customRole="administrators"
			redirectRole="/admin/dashboard"
			redirect="/admin/login"
		/>
	</Switch>
);
