Tracker.autorun(function () {
    if (Session.get('fromDate') && Session.get('toDate')) {
        let fromDate = Session.get('fromDate');
        let toDate = Session.get('toDate');
        // let typeOfJournal = Session.get('typeOfJournal');
        fromDate = moment(fromDate).toDate();
        toDate = moment(toDate).toDate();
        let selector = {
            date: {
                $gte: fromDate,
                $lte: toDate
            },
            // typeOfJournal: 'typeOfJournal'
        };
        Meteor.subscribe("journalEntry", selector);
    }
});
Template.journalEntryReport.rendered = function () {
    try {
        this.autorun(() => {
            if (!this.subscription.ready()) {
                IonLoading.show();
            } else {
                IonLoading.hide();
            }
        })
    } catch (e) {
        console.log(e);
    }
};

Template.journalEntryReport.helpers({
    subTotalIsNotZero(total){
        return total!=0 && total!=null;
    },
    journalEntryByExpense(){
        let journalEntryByExpense = Session.get('journalEntryByExpense');
        if (journalEntryByExpense) {
            return journalEntryByExpense;
        }
    },
    journalEntryByIncome(){
        let journalEntryByIncome = Session.get('journalEntryByIncome');
        if (journalEntryByIncome) {
            return journalEntryByIncome;
        }
    },
    journalEntryIncomeFromOrder(){
        let journalEntryIncomeFromOrder = Session.get('journalEntryIncomeFromOrder');
        if (journalEntryIncomeFromOrder) {
            return journalEntryIncomeFromOrder;
        }
    }
});



Template.journalEntryReport.events({
    'click .js-expense'(e){
        if ($(e.currentTarget).prop('checked')) {
            $('.js-income').prop('checked', false);
        }
    },
    'click .js-income'(e){
        if ($(e.currentTarget).prop('checked')) {
            $('.js-expense').prop('checked', false);
        }
    },
    'click .js-journalEntry-report'(e, instance){
        let fromDate = instance.$('.js-from-date').val();
        let toDate = instance.$('.js-to-date').val();

        if ($('.js-expense').is(':checked')) {
            let typeOfJournal = 'expense';
            Meteor.call('journalEntryByJournalType', fromDate, toDate, typeOfJournal, (error, result)=> {
                if (error) {
                    sAlert.error(error.message)
                } else {
                    Session.set('journalEntryIncomeFromOrder', undefined);
                    Session.set('journalEntryByIncome', undefined);
                    Session.set('journalEntryByExpense', result);

                }
            });

        } else if ($('.js-income').is(':checked')) {
            
            //journalEntryIncomeFromOrder
            Meteor.call('journalEntryIncomeFromOrder', fromDate, toDate, (error, result)=> {
                if (error) {
                    sAlert.error(error.message)
                } else {
                    Session.set('journalEntryByExpense', undefined);
                    Session.set('journalEntryIncomeFromOrder', result);

                }
            });
            
            //journalEntryByIncome
            let typeOfJournal = 'income';
            Meteor.call('journalEntryByJournalType', fromDate, toDate, typeOfJournal, (error, result)=> {
                if (error) {
                    sAlert.error(error.message)
                } else {
                    Session.set('journalEntryIncomeReport', undefined);
                    Session.set('journalEntryByIncome', result);
            
                }
            });
        } else {
            Session.set('journalEntryByExpense', undefined);
            Session.set('journalEntryByIncome', undefined);
            Session.set('journalEntryIncomeFromOrder', undefined);
        }
    }
});
Template.journalEntryReport.onDestroyed(function () {
    Session.set('journalEntryByExpense', undefined);
    Session.set('journalEntryByIncome', undefined);
    Session.set('journalEntryIncomeFromOrder', undefined);
});