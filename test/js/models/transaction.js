;(function() {
    var expect = chai.expect,
        trx;

    beforeEach(function() {
        trx = new expensus.Models.Transaction();
    });

    describe('Transaction', function() {
        describe('attributes', function() {
            it('has an amount', function() {
                expect(trx.attributes['amount']).to.not.be.an('undefined');
            });
            it('has a transactionDate', function() {
                expect(trx.attributes['transactionDate']).to.not.be.an('undefined');
            });
            it('has a transactionType', function() {
                expect(trx.attributes['transactionType']).to.not.be.an('undefined');
            });
            it('has a category', function() {
                expect(trx.attributes['category']).to.not.be.an('undefined');
            });
            it('has a description', function() {
                expect(trx.attributes['description']).to.not.be.an('undefined');
            });
            it('ensures that the transaction date is always current by default', function () {
                expect(trx.attributes['transactionDate']).to.not.equal('');
                expect(trx.attributes['transactionDate']).to.be.at.most(Date.now());
            });
            it('ensures that the transaction type defaults to debit', function () {
                expect(trx.attributes['transactionType']).to.equal('debit');
            });
            it('ensures that the category defaults to miscellaneous', function () {
                expect(trx.attributes['category']).to.equal('miscellaneous');
            });
            describe('validation', function () {
                it('validates the transaction type against the known types', function () {
                    // pass
                    trx.set({transactionType: 'credit'}, {validate: true});
                    expect(trx.validationError).to.equal(null);
                    // fail
                    trx.set({transactionType: 'fake'}, {validate: true});
                    expect(trx.validationError).to.not.equal(null);
                });
                it('validates the transaction category against the known categories', function () {
                    // pass
                    trx.set({category: 'rent'}, {validate: true});
                    expect(trx.validationError).to.equal(null);
                    // fail
                    trx.set({category: 'fake'}, {validate: true});
                    expect(trx.validationError).to.not.equal(null);
                });
                it('validates the transaction date is a positive integer', function () {
                    // pass
                    trx.set({transactionDate: Date.now()}, {validate: true});
                    expect(trx.validationError).to.equal(null);
                    //fail
                    trx.set({transactionDate: 'fake'}, {validate: true});
                    expect(trx.validationError).to.not.equal(null);
                });
                it('validates the transaction amount is a positive value', function () {
                    // pass
                    trx.set({amount: 1}, {validate: true});
                    expect(trx.validationError).to.equal(null);
                    // fail
                    trx.set({amount: -1}, {validate: true});
                    expect(trx.validationError).to.not.equal(null);
                });
            });
        });

    });
}());
