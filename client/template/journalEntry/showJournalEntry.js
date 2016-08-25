//oncreated
Template.showJournalEntry.created = function () {
    // this.autorun(function () {
    //     let limit = 2;
    //     this.subscription = Meteor.subscribe('journalEntry', 2);
    // }.bind(this));
};

//onrender
Template.showJournalEntry.rendered = function () {
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

//helper
Template.showJournalEntry.helpers({
    journalEntryIncome: ()=> {
        Meteor.call('journalEntryIncomeReport', (error, result)=> {
            if (error) {
                sAlert.error(error.message)
            } else {
                Session.set('journalEntryIncomeReport', result);
            }
        });

        let journalEntryIncomeReport = Session.get('journalEntryIncomeReport');
        if (journalEntryIncomeReport) {
            console.log(journalEntryIncomeReport);
            return journalEntryIncomeReport;
        }
    },
    journalEntryExpense: ()=> {
        Meteor.call('journalEntryExpenseReport', (error, result)=> {
            if (error) {
                sAlert.error(error.message)
            } else {
                Session.set('journalEntryExpenseReport', result);
            }
        });

        let journalEntryExpenseReport = Session.get('journalEntryExpenseReport');
        if (journalEntryExpenseReport) {
            return journalEntryExpenseReport;
        }
    }
});

