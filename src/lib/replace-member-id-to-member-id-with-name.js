/**
 * @fileOverview replace-member-id-to-member-id-with-name.js
 *
 * @author waricoma
 * @version 1.0.0
 */

/**
 * main
 * @param {string} targetText
 * @param {object} usersList
 * @returns {string}
 */
const main = (targetText, usersList) => {
  if (targetText.indexOf('<') === -1 && targetText.indexOf('>') === -1) {
    return targetText;
  }

  const memberIds = targetText.split(/<|>/g).filter((s) => {
    return (s[0] === '@');
  });

  if (memberIds.length === 0) {
    return targetText;
  }

  for (const memberId of memberIds) {
    const targetInfo = usersList.members.filter((member) => {
      return (`@${member.id}` === memberId);
    });

    if (targetInfo.length === 0) {
      continue;
    }

    targetText = targetText.replace(memberId, `${memberId}|${targetInfo[0].name}`);
  }

  return targetText;
};

module.exports = main;
