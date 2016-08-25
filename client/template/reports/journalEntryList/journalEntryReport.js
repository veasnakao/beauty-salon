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

Template.journalEntryReport.helpers({
    journalEntryExpense(){
        let journalEntryExpenseReport = Session.get('journalEntryExpenseReport');
        if (journalEntryExpenseReport) {
            return journalEntryExpenseReport;
        }
    },
    journalEntryIncome(){
        let journalEntryIncomeReport = Session.get('journalEntryIncomeReport');
        if(journalEntryIncomeReport){
            return journalEntryIncomeReport;
        }
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
    'click .js-journalEntry-report'(){
        let fromDate = $('.js-from-date').val();
        let toDate = $('.js-to-date').val();

        if ($('.js-expense').is(':checked')) {
            let typeOfJournal = 'expense';
            Meteor.call('journalEntryExpenseReport', fromDate, toDate,typeOfJournal, (error, result)=> {
                if (error) {
                    sAlert.error(error.message)
                } else {
                    Session.set('journalEntryIncomeReport', undefined);
                    Session.set('journalEntryExpenseReport', result);

                }
            });
        }else if ($('.js-income').is(':checked')) {
            let typeOfJournal = 'income';
            Meteor.call('journalEntryIncomeReport', fromDate, toDate,typeOfJournal, (error, result)=> {
                if (error) {
                    sAlert.error(error.message)
                } else {
                    Session.set('journalEntryExpenseReport', undefined);
                    Session.set('journalEntryIncomeReport', result);

                }
            });
        }else{
            Session.set('journalEntryExpenseReport', undefined);
            Session.set('journalEntryIncomeReport', undefined);
        }
    }
});
Template.journalEntryReport.onDestroyed(function () {
    Session.set('journalEntryExpenseReport', undefined);
    Session.set('journalEntryIncomeReport', undefined);
});