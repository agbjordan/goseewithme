//dependencies
const express = require('express');
const router = express.Router();

//functions
const routeFunctions = require('../../../functions/routeFunctions');
const routerSet = new routeFunctions();

//Route     GET /api/travellers
//Desc      Return the current traveller
//Access    Private
routerSet.publicRoute({
	router,
	routeType: 'get',
	route: '/',
	incFile: '../routes/api/travellers/get.js',
});

//Route     GET /api/travellers/:id
//Desc      Return the travellers by ID
//Access    public
routerSet.publicRoute({
	router,
	routeType: 'get',
	route: '/:id',
	incFile: '../routes/api/travellers/get_byID.js',
});

//Route     POST /api/travellers
//Desc      Create a Traveller profile
//Access    Private
routerSet.publicRoute({
	router,
	routeType: 'post',
	route: '/',
	incFile: '../routes/api/travellers/post.js',
});

//Route     DELETE /api/travellers
//Desc      Delete a Traveller profile
//Access    Private
routerSet.publicRoute({
	router,
	routeType: 'delete',
	route: '/:id',
	incFile: '../routes/api/travellers/delete.js',
});

//export
module.exports = router;
