'use strict';

/**
 * @fileOverview index.js
 *
 * @author chensokheng
 * @author waricoma
 * @version 1.0.1
 */

require('dotenv').config();
const packageJson = require('../package.json');
const { CronJob } = require('cron');
const http = require('http');
const childProcess = require('child_process');

const msgForSlackChToSheet = {
  slackToken: process.env.SLACK_TOKEN,
  includeArchived: (process.env.INCLUDE_ARCHIVED.toLowerCase() === 'on'),
  includePrivate: (process.env.INCLUDE_PRIVATE.toLowerCase() === 'on'),
  arrToSheetServerEndPoint: process.env.ARR_TO_SHEET_SERVER_END_POINT,
  arrToSheetServerToken: process.env.ARR_TO_SHEET_SERVER_TOKEN,
  docKey: process.env.DOC_KEY,
  sheetName: process.env.SHEET_NAME
};

// ⚠ you must set this path from execution place
let slackChToSheet = childProcess.fork('./src/slack-ch-to-sheet');
slackChToSheet.send(msgForSlackChToSheet);

const cronTask = new CronJob(process.env.CRON, () => {
  slackChToSheet.kill();
  slackChToSheet = null; // GC

  slackChToSheet = childProcess.fork('./src/slack-ch-to-sheet');

  slackChToSheet.send(msgForSlackChToSheet);
});
cronTask.start();

http.createServer((req, res) => {
  res.writeHead(
    200,
    {
      'Content-Type': 'text/html'
    }
  );
  res.write(packageJson.name);
  res.end();
}).listen(process.env.PORT, process.env.HOST, () => {
  console.log(`Server running at http://${process.env.HOST}:${process.env.PORT}`);
});
