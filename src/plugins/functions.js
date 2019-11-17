//utils function used around
const math_operator = {
  '>': function ( x , y ){ return x > y; },
  '<': function ( x , y ){ return x < y; },
  '=': function ( x , y ){ return x = y; },
  '>=' : function ( x , y ){ return x >= y; },
  '<=' : function ( x , y ){ return x <= y; }
};
    
const _threshold = function tr(threshold,value){
  var op = threshold.split(';')[0];
  var y = parseFloat(threshold.split(';')[1]);
  return math_operator[op](parseFloat(value),y);
};

const _alertmsg = function am(context,msg){
  const slackUrl = context.app.settings.alert.slack.url;
  const slack = require('slack-notify')(slackUrl);
  slack.alert( msg );
}

module.exports =  {
  threshold : _threshold,
  alertmsg : _alertmsg
};