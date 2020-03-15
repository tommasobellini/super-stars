const app = require('express')()
var Slack = require('node-slack');
var options = {}
var slack = new Slack('https://hooks.slack.com/services/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',options);

module.exports = { path: '/api', handler: app}

app.post('/sendSlack', (req,res) => {
    console.log('message sent')
    console.log(req.body)
    if(req.body.star == true && req.body.coffee == false) {
        slack.send({
            text: 'New Star assigned to ' + req.body.user,
            channel: '#superstars',
            username: 'Tommaso'
        });
    }
    if(req.body.star == false && req.body.coffee == true) {
        slack.send({
            text: 'New Coffee assigned to ' + req.body.user,
            channel: '#superstars',
            username: 'Tommaso'
        });
    }
    if(req.body.star == true && req.body.coffee == true) {
        slack.send({
            text: 'New Star and Coffee assigned to ' + req.body.user,
            channel: '#superstars',
            username: 'Tommaso'
        });
    }

    
    res.json({message: req.toString()})
})