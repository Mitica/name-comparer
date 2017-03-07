'use strict';

var compare = require('../lib').compare;
var assert = require('assert');

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
    it('`Stefan Name` == `Ștefan name`: CI_ATONIC', function () {
        assert.equal(true, compare('Stefan Name', 'Ștefan name', { transforms: ['CI_ATONIC'] }));
    });

    it('`U.S.` == `United States`: ABBR', function () {
        assert.equal(true, compare('U.S.', 'United States', { transforms: ['ABBR'] }));
    });

    it('`UE` == `Uniunea Europeana`: ABBR', function () {
        assert.equal(true, compare('UE', 'Uniunea Europeana', { transforms: ['ABBR'] }));
    });

    it('`US` != `Uniunea Europeana`: ABBR', function () {
        assert.equal(false, compare('US', 'Uniunea Europeana', { transforms: ['ABBR'] }));
    });

    it('`ministerul muncii` == `Ministerul Muncii (Romania)`: CI_START', function () {
        assert.equal(true, compare('ministerul muncii', 'Ministerul Muncii (Romania)', { transforms: ['CI_START'] }));
    });

    it('`ministerul muncii` != `Ministerul Muncii (Romania)`: START', function () {
        assert.equal(false, compare('ministerul muncii', 'Ministerul Muncii (Romania)', { transforms: ['START'] }));
    });

    it('`NeW YorK` == `New York, NY`: CI_START', function () {
        assert.equal(true, compare('NeW YorK', 'New York, NY', { transforms: ['CI_START'] }));
    });
});
