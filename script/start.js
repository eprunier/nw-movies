var os = require('os');
var proc = require('child_process');

var isWin = /^win/.test(os.platform());
var isLinux = os.platform() === 'linux';

if (isWin) {
  proc.spawn('./vendor/node-webkit/win/nw.exe', ['.']);
} else if (isLinux) {
  proc.spawn('./vendor/node-webkit/linux/nw', ['.']);
}
