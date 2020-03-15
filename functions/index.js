// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

const cors = require("cors")
const express = require("express")
const app2 = express()
var Slack = require('node-slack');
var request = require('request');
var options = {}
var slack = new Slack('https://hooks.slack.com/services/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',options);

app2.use(cors({ origin: true }))

app2.post("/sendSlack", (req, res) => {
    console.log('message sent')
    console.log(req.body.toString())
    console.log(req.body.star.toString())
    console.log(req.body.coffee.toString())
    if(req.body.star == true && req.body.coffee == false) {
        console.log('ciao')
        request.post('http://hooks.slack.com/services/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',
            { json: { text: 'New Star assigned to ' + req.body.user}}
        )
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

    console.log('func finished')
    res.json({message: req.toString()})
  })
  
  const api = functions.https.onRequest(app2)
  
  module.exports = {
    api
  }