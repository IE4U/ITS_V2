var error = {
  general: function(){
    sessionStorage.setItem('setup', 'False');
  },
}


var success = {
  general: function(){
    sessionStorage.setItem('setup', 'True');
  },
  logout: function(){
    sessionStorage.removeItem('username');
    sessionStorage.setItem('setup', 'False');
  }
}
