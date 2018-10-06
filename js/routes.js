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
      pageInit: function (e, page) {
        dbUser.get(page.route.params.id).then(function (doc) {
          // handle doc
          page.route.context = doc;
          pages.operations();
        }).catch(function (err) {
          console.log(err);
        });
      },
    },
  },
  {
    path: '/step/:index/:name/',
    templateUrl: './pages/step.html',
    on: {
      pageInit: function () {

      },
    }
  },
];
