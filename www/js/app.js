// Framework7 App main instance
var app  = new Framework7({
  root: '#app', // App root element
  id: 'i_Time_Study', // App bundle ID
  name: 'i Time Study', // App name
  theme: 'auto', // Automatic theme detection
  // App root data;
  // App root methods
  methods: {},
  // App routes
  routes: routes,
});

// Init/Create main view
var mainView = app.views.create('.view-main', {
  url: '/'
});
