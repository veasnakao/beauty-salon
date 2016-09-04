Tracker.autorun(function () {

});

//oncreated
Template.profitAndLossReport.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('journalEntrys');
        this.subscription = Meteor.subscribe('journalItems');
    }.bind(this));
};

Template.profitAndLossReport.helpers({
    totalIncome(incomeFromOrder, incomeFromJournal){
        let incomeOrder = incomeFromOrder.content[0].total;
        let incomeJournal = incomeFromJournal.content[0].total;
        if (incomeOrder == null || incomeOrder == "") {
            incomeOrder = 0;
        } else if (incomeJournal == null || incomeJournal == "") {
            incomeJournal = 0;
        }
        let totalIncome = incomeOrder + incomeJournal;
        return numeral(totalIncome).format('0,0.00') + ' $';
    },
    calculateProfit(incomeFromOrder, incomeFromJournal, expenseFromJournal){
        let getIncomeFromOrder = incomeFromOrder.content[0].total;
        let getIncomeFromJournal = incomeFromJournal.content[0].total;
        let getExpenseFromJournal = expenseFromJournal.content[0].total;

        let balance = (getIncomeFromOrder + getIncomeFromJournal) - getExpenseFromJournal;
        return numeral(balance).format('0,0.00') + ' $';
    },
    subTotalIsNotZero(total){
        return total != 0 && total != null;
    },
    incomeFromOrder(){
        let incomeFromOrder = Session.get('incomeFromOrder');
        if (incomeFromOrder) {
            console.log(incomeFromOrder);
            return incomeFromOrder;
        }
    },
    expenseFromJournal(){
        let expenseFromJournal = Session.get('expenseFromJournal');
        if (expenseFromJournal) {
            return expenseFromJournal;
        }
    },
    incomeFromJournal(){
        let incomeFromJournal = Session.get('incomeFromJournal');
        if (incomeFromJournal) {
            return incomeFromJournal;
        }
    }
    // dayExpenseItems() {
    //     let fromDate = Session.get('fromDate');
    //     let toDate = Session.get('toDate');
    //     if (fromDate && toDate) {
    //         var myMethods = [{name: 'expense'}, {name: 'income'}];
    //         myMethods.map(function (data) {
    //             Meteor.call(data.name, function (error, result) {
    //
    //             })
    //         });
    //         Meteor.call('expense', fromDate, toDate, function (error, result) {
    //             if (error) {
    //                 sAlert.error(error.message);
    //             } else {
    //                 Session.set('dayExpenseItemsResult', result);
    //             }
    //         });
    //         let dataDayExpenseItemsResult = Session.get('dayExpenseItemsResult');
    //         if (dataDayExpenseItemsResult.content.length > 0) {
    //             console.log(Session.get('dayExpenseItemsResult'));
    //             return dataDayExpenseItemsResult;
    //         } else {
    //             return false;
    //         }
    //     } else {
    //         return false;
    //     }
    // }
});

Template.profitAndLossReport.events({
    'click .js-submit-report'(){
        let fromDate = $('.js-from-date').val();
        let toDate = $('.js-to-date').val();
        console.log(fromDate);
        console.log(toDate);
        if (fromDate && toDate) {

            // let fromDate = Session.get('fromDate');
            // let toDate = Session.get('toDate');
            // fromDate = moment(fromDate).toDate();
            // toDate = moment(toDate).toDate();

            //meteor call journalEntryFromOrder
            Meteor.call('journalEntryIncomeFromOrder', fromDate, toDate, (error, result)=> {
                if (error) {
                    sAlert.error(error.message);
                } else {
                    Session.set('incomeFromOrder', result);
                }
            });

            let journalExpense = 'expense';
            Meteor.call('journalEntryByJournalType', fromDate, toDate, journalExpense, (error, result)=> {
                if (error) {
                    sAlert.error(error.message)
                } else {
                    Session.set('expenseFromJournal', result);

                }
            });

            let journalIncome = 'income';
            Meteor.call('journalEntryByJournalType', fromDate, toDate, journalIncome, (error, result)=> {
                if (error) {
                    sAlert.error(error.message)
                } else {
                    Session.set('incomeFromJournal', result);

                }
            });

        }
    }
});

Template.profitAndLossReport.onDestroyed(function () {
    Session.set('fromDate', undefined);
    Session.set('toDate', undefined);
    Session.set('incomeFromOrder', undefined);
    Session.set('expenseFromJournal', undefined);
    Session.set('incomeFromJournal', undefined);
});