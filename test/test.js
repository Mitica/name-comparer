'use strict';

const compare = require('../lib').compare;
const assert = require('assert');

describe('compare', function () {
    it('`Name 1` == `name 1`', function () {
        assert.equal(true, compare('Name 1', 'name 1'));
    });
    it('`Name 1` != `Name 2`', function () {
        assert.equal(false, compare('Name 1', 'Name 2'));
    });
    it('`B. Obama` == `B Obama`', function () {
        assert.equal(true, compare('B. Obama', 'B Obama'));
    });
    it('`B. Obama` == `Barack Obama`', function () {
        assert.equal(true, compare('B. Obama', 'Barack Obama', { transforms: ['ABBR'] }));
    });
    it('`B. Obama` != `Aaron Obama`', function () {
        assert.equal(false, compare('B. Obama', 'Aaron Obama', { transforms: ['ABBR'] }));
    });
    it('`Stefan Name` == `Ștefan name`', function () {
        assert.equal(true, compare('Stefan Name', 'Ștefan name', { transforms: ['INS_ATONIC'] }));
    });

    it('`U.S.` == `United States`', function () {
        assert.equal(true, compare('U.S.', 'United States', { transforms: ['ABBR'] }));
    });

    it('`UE` == `Uniunea Europeana`', function () {
        assert.equal(true, compare('UE', 'Uniunea Europeana', { transforms: ['ABBR'] }));
    });

    it('`US` != `Uniunea Europeana`', function () {
        assert.equal(false, compare('US', 'Uniunea Europeana', { transforms: ['ABBR'] }));
    });
});
