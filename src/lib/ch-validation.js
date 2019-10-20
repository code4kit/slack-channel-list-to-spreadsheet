'use strict';

/**
 * @fileOverview ch-validation.js
 *
 * @author waricoma
 * @version 1.0.0
 */

/**
 * main
 * @param {boolean} isArchived
 * @param {boolean} isPrivate
 * @param {boolean} includeArchived
 * @param {boolean} includePrivate
 * @returns {boolean}
 */
const main = (isArchived, isPrivate, includeArchived, includePrivate) => {
  if (includeArchived && includePrivate) { // Include archived ch and private ch.
    return true;
  } else if (includeArchived && !includePrivate) { // Include archived ch. But don't include it if this ch is private.
    return !isPrivate;
  } else if (!includeArchived && includePrivate) { // Include private ch. But don't include it if this ch is archived.
    return !isArchived;
  } else if (!includeArchived && !includePrivate) { // Don't include archived ch and private ch.
    return !(isArchived || isPrivate);
  }

  return true;
};

module.exports = main;
