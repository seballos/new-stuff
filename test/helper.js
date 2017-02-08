'use strict';
var jsdom = require('jsdom');
var XMLHttpRequest  = require('fake-xml-http-request');

global.window = global.document = jsdom.jsdom();
global.window.Event = () => true;
global.XMLHttpRequest = XMLHttpRequest;

function skipExtension() {
  return null;
}
require.extensions['.scss'] = skipExtension;
require.extensions['.css'] = skipExtension;
