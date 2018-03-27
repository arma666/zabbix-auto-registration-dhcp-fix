//*********************************
//config
var zabbixserver = 'localhost', //ip or dns name zabbix server
  username = 'Admin', //user name
  pass = 'zabbix',  // and password
  groupid = 15,  //Group id,  where hosts are registered after auto registration
  usedns = true; //
//*********************************

var dns = require('dns');
var zabbix = require('zabbix-node');
var client = new zabbix('http://' + zabbixserver + '/zabbix/api_jsonrpc.php', username, pass);

client.login(function(error, resp, body) {
  client.call('host.get', {
    'groupids': groupid,
    'output': ['itemid', 'name']
  }, function(error, resp, body) {
    var newarr = [];
    body.forEach(function(element) {
      newarr.push(element.hostid);
    });
    client.call('hostinterface.get', {
      "output": "extend",
      "hostids": newarr
    }, function(error, resp, body) {
      body.forEach(function(element) {
        if (element.dns != '')
          dns.lookup(element.dns, function(err, addresses, family) {
            if (addresses != element.ip) {
              client.call('hostinterface.update', {
                "interfaceid": element.interfaceid,
                "ip": addresses
              }, function(error, resp, body) {
                console.log(new Date(), 'change ip for', element.dns);
              });
            }
          });

        if ((element.useip) && (usedns)){
          client.call('hostinterface.update', {
            "interfaceid": element.interfaceid,
            "useip": "0"
          }, function(error, resp, body) {
            console.log(new Date(), 'Set dns for', element.dns, element.ip);
          });
        }
      });
    });
  });
});
