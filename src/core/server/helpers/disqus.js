// # Tag cloud helper
// Usage: `{{disqus limit="5"}}`
// Defaults to limit="5"

var _               = require('lodash'),
    template        = require('./template'),
    config          = require('../config'),
    disqus;

disqus = function () {
 
    return template.execute('disqus',  {shortname:config.disqus});
 };

module.exports = disqus;
