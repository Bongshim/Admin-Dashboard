const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');
const salesRoutes = require('./sales.route');
const clientRoutes = require('./client.route');
const managementRoutes = require('./management.route');
const generalRoutes = require('./general.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/client',
    route: clientRoutes,
  },
  {
    path: '/sales',
    route: salesRoutes,
  },
  {
    path: '/management',
    route: managementRoutes,
  },
  {
    path: '/general',
    route: generalRoutes,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
