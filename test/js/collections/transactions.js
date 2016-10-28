;(function() {
    var expect = chai.expect,
        data = [
            {transactionDate: 1, amount: 2},
            {transactionDate: 3, amount: 4},
            {transactionDate: 5, amount: 6},
            {transactionDate: 2, amount: 1},
            {transactionDate: 4, amount: 3},
            {transactionDate: 6, amount: 5}
        ],
        trxs;

    beforeEach(function() {
        trxs = new expensus.Collections.Transactions(data);
    });

    describe('TransactionsCollection', function() {
        describe('#latestFive', function() {
            it('Should return the latest five transactions', function() {
                expect(trxs.latestFive().length).to.equal(5);
                expect(trxs.latestFive()[0].get("transactionDate")).to.equal(6);
                expect(trxs.latestFive()[4].get("transactionDate")).to.equal(2);
            });    
        });
        describe("#sortByDate", function() {
            it("should sort in ascending order", function() {
                trxs.sortByDate(+1);
                expect(trxs.models[0].get("transactionDate")).to.equal(1);
            });
            it("should sort in descending order", function() {
                trxs.sortByDate(-1);
                expect(trxs.models[0].get("transactionDate")).to.equal(6);
            });
        });
    });
}());
