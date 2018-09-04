routes = [
  {
    path: '/',
    url: './index.html',
    on: {
      pageInit: function () {
        pages.indexFunction();
      },
    },
  },
  {
    path: '/about/',
    url: './pages/about.html',
  },
  {
    path: '/login/',
    url: './pages/login-screen.html',
    on: {
      pageInit: function () {
        pages.login();
      },
    }
  },
  {
    path: '/create-account/',
    url: './pages/create-account.html',
    on: {
      pageInit: function () {
        pages.create_account();
      },
    }
  },
  {
    path: '/operation/:id/:name/',
    templateUrl: './pages/operation.html',
    on: {
      pageInit: function () {
        pages.operations();
      },
    },
  },
];
