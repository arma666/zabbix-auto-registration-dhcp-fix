# zabbix-auto-registration-dhcp-fix
A simple fix, written on the node js.

### _What does it do?_
For example, in a network of windows, you use the autoregistration of domain computers, installing a client on them (manually or by group policy). If the network uses dhcp and at some point one of the hosts will change the ip address, the zabbix will stop monitoring it. This script monitors the ip address of hosts, matches them with the DNS name and if they diverge changes in the host properties on the server.
### _Install_
1. You need to install node js on the computer where the script will run (I use zabbix server).
2. copy app.js and package.json
3. open folder where files was copied in terminal (cmd)
4. run ```npm i```
5. edit app.js (config)
6. Put in crontab ```*/5 * * * * node /youfolder/app.js > /var/log/zabbix.dns```
(windows - scheduler task -> node c:\youfolder\app.js)

### _Config_
groupid:
![group](https://image.ibb.co/dswkh7/2018_03_27_20_41_27.png)

usedns: if true, zabbix connect to host by dns name (In any case, the ip address is changing)
