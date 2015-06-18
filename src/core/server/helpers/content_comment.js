// # Tag cloud helper
// Usage: `{{content_comment limit="5"}}`
// Defaults to limit="5"

var _               = require('lodash'),
    template        = require('./template'),
    config          = require('../config'),

    content_comment;

content_comment = function (options) {
    
   return template.execute('content_comment',  {disqus_shortname:config.disqus_shortname});
};

module.exports = content_comment;
