import React from "react";
import { Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";

const Homepage = Loadable({
  loader: () => import(/* webpackChunkName: "homepage" */ "./homepage"),
  loading: () => null,
  modules: ["homepage"]
});

const Dashboard = Loadable({
  loader: () => import(/* webpackChunkName: "Dashboard" */ "./admin/Dashboard"),
  loading: () => null,
  modules: ["dashboard"]
});

const Affiliates = Loadable({
  loader: () =>
    import(/* webpackChunkName: "Affiliates" */ "./admin/Affiliates"),
  loading: () => null,
  modules: ["affiliates"]
});

const Agents = Loadable({
  loader: () => import(/* webpackChunkName: "Agents" */ "./admin/Agents"),
  loading: () => null,
  modules: ["agents"]
});

const Bookings = Loadable({
  loader: () => import(/* webpackChunkName: "Bookings" */ "./admin/Bookings"),
  loading: () => null,
  modules: ["bookings"]
});

const Guides = Loadable({
  loader: () => import(/* webpackChunkName: "Guides" */ "./admin/Guides"),
  loading: () => null,
  modules: ["guides"]
});

const Inbox = Loadable({
  loader: () => import(/* webpackChunkName: "Inbox" */ "./admin/Inbox"),
  loading: () => null,
  modules: ["inbox"]
});

const Influencers = Loadable({
  loader: () =>
    import(/* webpackChunkName: "Influencers" */ "./admin/Influencers"),
  loading: () => null,
  modules: ["influencers"]
});

const Notifications = Loadable({
  loader: () =>
    import(/* webpackChunkName: "Notifications" */ "./admin/Notifications"),
  loading: () => null,
  modules: ["notifications"]
});

const Products = Loadable({
  loader: () => import(/* webpackChunkName: "Products" */ "./admin/Products"),
  loading: () => null,
  modules: ["products"]
});

const Reviews = Loadable({
  loader: () => import(/* webpackChunkName: "Reviews" */ "./admin/Reviews"),
  loading: () => null,
  modules: ["reviews"]
});

const Settings = Loadable({
  loader: () => import(/* webpackChunkName: "Settings" */ "./admin/Settings"),
  loading: () => null,
  modules: ["settings"]
});

const Transactions = Loadable({
  loader: () =>
    import(/* webpackChunkName: "Transactions" */ "./admin/Transactions"),
  loading: () => null,
  modules: ["transactions"]
});

const Travellers = Loadable({
  loader: () =>
    import(/* webpackChunkName: "Travellers" */ "./admin/Travellers"),
  loading: () => null,
  modules: ["travellers"]
});

const Users = Loadable({
  loader: () => import(/* webpackChunkName: "Users" */ "./admin/Users"),
  loading: () => null,
  modules: ["users"]
});

export default () => (
  <Switch>
    <Route exact path="/" component={Homepage} />
    <Route exact path="/admin/" component={Dashboard} />
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
    <Route exact path="/admin/users" component={Users} />
  </Switch>
);
