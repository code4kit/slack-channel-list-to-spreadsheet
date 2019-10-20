'use strict';

/**
 * @fileOverview ch-validation.js (test)
 *
 * @author waricoma
 * @version 1.0.0
 */

const assert = require('assert');
const chValidation = require('../src/lib/ch-validation');

describe('chValidation', () => {
  describe('includeArchived is true, includePrivate is true ( Include archived ch and private ch. )', () => {
    const includeArchived = true;
    const includePrivate = true;

    it('isArchived is true, isPrivate is true', () => {
      const isArchived = true;
      const isPrivate = true;
      assert.strictEqual(true, chValidation(isArchived, isPrivate, includeArchived, includePrivate));
    });

    it('isArchived is true, isPrivate is false', () => {
      const isArchived = true;
      const isPrivate = false;
      assert.strictEqual(true, chValidation(isArchived, isPrivate, includeArchived, includePrivate));
    });

    it('isArchived is false, isPrivate is true', () => {
      const isArchived = false;
      const isPrivate = true;
      assert.strictEqual(true, chValidation(isArchived, isPrivate, includeArchived, includePrivate));
    });

    it('isArchived is false, isPrivate is false', () => {
      const isArchived = false;
      const isPrivate = false;
      assert.strictEqual(true, chValidation(isArchived, isPrivate, includeArchived, includePrivate));
    });
  });

  describe('includeArchived is true, includePrivate is false ( Include archived ch. But don\'t include it if this ch is private. )', () => {
    const includeArchived = true;
    const includePrivate = false;

    it('isArchived is true, isPrivate is true', () => {
      const isArchived = true;
      const isPrivate = true;
      assert.strictEqual(false, chValidation(isArchived, isPrivate, includeArchived, includePrivate));
    });

    it('isArchived is true, isPrivate is false', () => {
      const isArchived = true;
      const isPrivate = false;
      assert.strictEqual(true, chValidation(isArchived, isPrivate, includeArchived, includePrivate));
    });

    it('isArchived is false, isPrivate is true', () => {
      const isArchived = false;
      const isPrivate = true;
      assert.strictEqual(false, chValidation(isArchived, isPrivate, includeArchived, includePrivate));
    });

    it('isArchived is false, isPrivate is false', () => {
      const isArchived = false;
      const isPrivate = false;
      assert.strictEqual(true, chValidation(isArchived, isPrivate, includeArchived, includePrivate));
    });
  });

  describe('includeArchived is false, includePrivate is true ( Include private ch. But don\'t include it if this ch is archived. )', () => {
    const includeArchived = false;
    const includePrivate = true;

    it('isArchived is true, isPrivate is true', () => {
      const isArchived = true;
      const isPrivate = true;
      assert.strictEqual(false, chValidation(isArchived, isPrivate, includeArchived, includePrivate));
    });

    it('isArchived is true, isPrivate is false', () => {
      const isArchived = true;
      const isPrivate = false;
      assert.strictEqual(false, chValidation(isArchived, isPrivate, includeArchived, includePrivate));
    });

    it('isArchived is false, isPrivate is true', () => {
      const isArchived = false;
      const isPrivate = true;
      assert.strictEqual(true, chValidation(isArchived, isPrivate, includeArchived, includePrivate));
    });

    it('isArchived is false, isPrivate is false', () => {
      const isArchived = false;
      const isPrivate = false;
      assert.strictEqual(true, chValidation(isArchived, isPrivate, includeArchived, includePrivate));
    });
  });

  describe('includeArchived is false, includePrivate is false ( Don\'t include archived ch and private ch. )', () => {
    const includeArchived = false;
    const includePrivate = false;

    it('isArchived is true, isPrivate is true', () => {
      const isArchived = true;
      const isPrivate = true;
      assert.strictEqual(false, chValidation(isArchived, isPrivate, includeArchived, includePrivate));
    });

    it('isArchived is true, isPrivate is false', () => {
      const isArchived = true;
      const isPrivate = false;
      assert.strictEqual(false, chValidation(isArchived, isPrivate, includeArchived, includePrivate));
    });

    it('isArchived is false, isPrivate is true', () => {
      const isArchived = false;
      const isPrivate = true;
      assert.strictEqual(false, chValidation(isArchived, isPrivate, includeArchived, includePrivate));
    });

    it('isArchived is false, isPrivate is false', () => {
      const isArchived = false;
      const isPrivate = false;
      assert.strictEqual(true, chValidation(isArchived, isPrivate, includeArchived, includePrivate));
    });
  });
});
