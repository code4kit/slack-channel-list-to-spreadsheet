'use strict';

/**
 * @fileOverview replace-member-id-to-member-id-with-name.js (test)
 *
 * @author waricoma
 * @version 1.0.0
 */

const assert = require('assert');
const replaceMemberIdToMemberIdWithName = require('../src/lib/replace-member-id-to-member-id-with-name');

const masterUserList = {
  members: [
    {
      id: 'USER0',
      name: 'code4kit'
    },
    {
      id: 'USER1',
      name: 'waricoma'
    },
    {
      id: 'USER2',
      name: 'a2a'
    }
  ]
};

describe('replaceMemberIdToMemberIdWithName', () => {
  describe('target text is including member id', () => {
    it('target text is including one member id', () => {
      const targetText = 'this channel by <@USER0>';
      assert.strictEqual('this channel by <@USER0|code4kit>', replaceMemberIdToMemberIdWithName(targetText, masterUserList));
    });
    it('target text is including some member id', () => {
      const targetText = 'managers: <@USER0> <@USER1>';
      assert.strictEqual('managers: <@USER0|code4kit> <@USER1|waricoma>', replaceMemberIdToMemberIdWithName(targetText, masterUserList));
    });
  });

  describe('target text is including channel id', () => {
    it('target text is including one channel id', () => {
      const targetText = 'parent channel is <#CHANNEL0>';
      assert.strictEqual(targetText, replaceMemberIdToMemberIdWithName(targetText, masterUserList));
    });
    it('target text is including some channel id', () => {
      const targetText = 'child channels: <#CHANNEL1> <#CHANNEL2>';
      assert.strictEqual(targetText, replaceMemberIdToMemberIdWithName(targetText, masterUserList));
    });
  });

  describe('target text is including member id and channel id', () => {
    it('target text is including one member id and one channel id', () => {
      const targetText = 'parent channel is <#CHANNEL0> ( by <@USER0> )';
      assert.strictEqual('parent channel is <#CHANNEL0> ( by <@USER0|code4kit> )', replaceMemberIdToMemberIdWithName(targetText, masterUserList));
    });
    it('target text is including some member id and some channel id', () => {
      const targetText = 'child channels: <#CHANNEL1> ( by <@USER1> ) <#CHANNEL2> ( by <@USER2> )';
      assert.strictEqual('child channels: <#CHANNEL1> ( by <@USER1|waricoma> ) <#CHANNEL2> ( by <@USER2|a2a> )', replaceMemberIdToMemberIdWithName(targetText, masterUserList));
    });
  });

  it('target text isn\'t including member id and channel id', () => {
    const targetText = 'welcome to food club channel';
    assert.strictEqual(targetText, replaceMemberIdToMemberIdWithName(targetText, masterUserList));
  });

  it('target text is including unknown member id', () => {
    const targetText = 'this channel by <@USER3>';
    assert.strictEqual(targetText, replaceMemberIdToMemberIdWithName(targetText, masterUserList));
  });
});
