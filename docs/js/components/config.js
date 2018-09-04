var httpDatabase = '10.0.0.113:5984'
var db = new PouchDB('http://' + httpDatabase + '/_users', {skip_setup: true});
var dbUser = new PouchDB('http://' + httpDatabase + '/_users', {skip_setup: true});;

var $$ = Dom7;

//sudo -i -u couchdb /opt/couchdb/bin/couchdb
