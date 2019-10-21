'use strict';

/**
 * @fileOverview slack-ch-to-sheet.js
 *
 * @author waricoma
 * @version 1.0.1
 */

const { WebClient } = require('@slack/web-api');
const chValidation = require('./lib/ch-validation');
const replaceMemberIdToMemberIdWithName = require('./lib/replace-member-id-to-member-id-with-name');
const arrToSheetClient = require('arr-to-sheet-client');
const moment = require('moment');

process.on('message', (msg) => {
  console.log('start child process of slack-ch-to-sheet');

  main(
    msg.slackToken,
    msg.includeArchived,
    msg.includePrivate,
    msg.arrToSheetServerEndPoint,
    msg.arrToSheetServerToken,
    msg.docKey,
    msg.sheetName
  );
});

/**
 * main
 * @param {string} slackToken
 * @param {boolean} includeArchived
 * @param {boolean} includePrivate
 * @param {string} arrToSheetServerEndPoint
 * @param {string} arrToSheetServerToken
 * @param {string} docKey
 * @param {string} sheetName
 */
const main = async (
  slackToken,
  includeArchived,
  includePrivate,
  arrToSheetServerEndPoint,
  arrToSheetServerToken,
  docKey,
  sheetName
) => {
  /**
   * slack web client
   * @type {object}
   */
  const webClient = new WebClient(slackToken);

  /**
   * slack team info
   * @type {object}
   */
  let slackTeamInfo = {};

  /**
   * slack channel list
   * @type {object}
   */
  let slackChannelsList = {};

  try {
    slackTeamInfo = await webClient.team.info();
    slackChannelsList = await webClient.channels.list({});
  } catch (err) {
    console.error('err in getting data from slack');
    throw new Error(err);
  }

  /**
   * filtered slack channel
   * @type {object[]}
   */
  const targetSlackChannels = slackChannelsList.channels.filter((channel) => {
    return chValidation(channel.is_archived, channel.is_private, includeArchived, includePrivate);
  });

  const usersList = await webClient.users.list();

  /**
   * 2d array for writing sheets of channels list
   * @type {[[string]]}
   */
  const arrOf2dForChannelsList = targetSlackChannels.map((channel) => {
    const creatorInfo = usersList.members.filter((member) => {
      return (member.id === channel.creator);
    });

    return [
      channel.name,
      channel.id,
      channel.num_members,
      channel.creator,
      creatorInfo[0].name,
      channel.is_archived ? '◯' : '×',
      channel.is_private ? '◯' : '×',
      `https://app.slack.com/client/${slackTeamInfo.team.id}/${channel.id}`,
      replaceMemberIdToMemberIdWithName(channel.topic.value, usersList),
      replaceMemberIdToMemberIdWithName(channel.purpose.value, usersList),
      moment.unix(channel.created).format()
    ];
  });

  // set channel list sheet's title
  arrOf2dForChannelsList.unshift([
    'channel name',
    'channel id',
    'members',
    'creator id',
    'creator name',
    'is_archived',
    'is_private',
    'channel url',
    'channel topic',
    'channel purpose',
    'channel created'
  ]);

  arrToSheetClient(
    arrToSheetServerEndPoint,
    arrToSheetServerToken,
    docKey,
    sheetName,
    arrOf2dForChannelsList,
    {
      margin: 2,
      minRow: 10,
      minCol: 10,
      resize: true,
      clear: true
    },
    (err) => {
      if (err) {
        console.error('err in arr-to-sheet-client');
        throw new Error(err);
      }

      console.log('add successful');
    }
  );
};
