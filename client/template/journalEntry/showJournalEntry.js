//oncreated
Template.showJournalEntry.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('journalEntrys');
        this.subscription = Meteor.subscribe('journalItems');
    }.bind(this));
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

    subTotalIsNotZero(subTotal){
        return subTotal != 0 && subTotal != null;
    },
    journalEntry(){
        // return ReactiveMethod.call("allJournalEntry");
        Meteor.call('allJournalEntry', (error, result)=> {
            if (error) {
                sAlert.error(error.message);
            } else {
                Session.set('allJournalEntry', result);
            }
        });
        let allJournalEntry = Session.get('allJournalEntry');
        if (allJournalEntry) {
            return allJournalEntry;
        }
    }
    // journalEntryIncomeFromOrder: ()=> {
    //     Meteor.call('journalEntryIncomeFromOrder', (error, result)=> {
    //         if (error) {
    //             sAlert.error(error.message)
    //         } else {
    //             Session.set('journalEntryIncomeFromOrder', result);
    //         }
    //     });
    //
    //     let journalEntryIncomeReport = Session.get('journalEntryIncomeFromOrder');
    //     if (journalEntryIncomeReport) {
    //         console.log(journalEntryIncomeReport);
    //         return journalEntryIncomeReport;
    //     }
    // },

});

Template.showJournalEntry.events({
    'click .add-journalEntry'(){
        Router.go('addJournalEntry');
    },
    'click .edit-journalEntry'(){
        console.log(this);
    }
});

