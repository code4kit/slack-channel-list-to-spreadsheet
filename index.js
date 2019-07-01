"use strict";

require("dotenv").config();
const CronJob = require('cron').CronJob;

const http = require("http");
const {
    WebClient
} = require("@slack/web-api");

const webClient = new WebClient(process.env.BOT_TOKEN);
const ArrayToGoogleSheets = require('array-to-google-sheets');
const cred = require('./keys.json');
const url = "https://code4kit.slack.com/messages/";
const a2g = new ArrayToGoogleSheets(process.env.SHEET_ID, cred);

let data;
async function exportChannel() {
    try {
        const slackChannel = await webClient.channels.list({});

        data = slackChannel.channels.filter(channel => !channel.is_private || !channel.is_archived).map(channel => [
            channel.name,
            channel.id,
            url + channel.id,
            channel.topic.value,
            channel.purpose.value
        ]);
        data.unshift(['channel name', 'channel id', "channel url", 'channel topic', 'channel purpose']);

    } catch (e) {
        console.log("error occur");
    }
}
async function pushToSheet() {
    try {
        await exportChannel();
        await a2g.updateGoogleSheets(process.env.SHEET_NAME, data, {
            margin: 2,
            minRow: 10,
            minCol: 10,
            resize: true,
            clear: true,
        });
        console.log("add successful");
    } catch (e) {
        console.log("error occur");
    }
}

const task = new CronJob('0 */1 * * * *', function () {
    pushToSheet();
});
task.start();

http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.write('Export slack to google sheet');
    res.end();
}).listen(process.env.port);