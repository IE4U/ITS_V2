var httpDatabase = '10.0.0.113:6984'
var db = new PouchDB('https://' + httpDatabase + '/_users', {skip_setup: true});
var dbUser = new PouchDB('https://' + httpDatabase + '/_users', {skip_setup: true});;

var $$ = Dom7;

//sudo -i -u couchdb /opt/couchdb/bin/couchdb
