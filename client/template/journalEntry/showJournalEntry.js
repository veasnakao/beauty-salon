//oncreated
Template.showJournalEntry.created = function () {
    Meteor.call('showJournalEntry', (error, result)=> {
        if (error) {
            swal({
                title: "Error",
                text:error,
                type:"error",
                timer: 3000,
                showConfirmButton: true
            })
        } else {
            Session.set('showJournalEntry', result);
        }
    });
};

//helper
Template.showJournalEntry.helpers({
    subTotalIsNotZero(subTotal){
        return subTotal != 0 && subTotal != null;
    },
    showJournalEntry(){
        if (Session.get('showJournalEntry')) {
            return Session.get('showJournalEntry');
        }
    }
});

Template.showJournalEntry.events({
    'click .journalEntryById'(){
        let id = this.journalEntryId;
        // Router.go(`/journalEntryDetail/orderId/${orderId}?staffId=${order.staffId}&customerId=${order.customerId}`);
        Router.go(`/journalEntryDetailById/${id}`);

    },
    'click .add-journalEntry'(){
        Router.go('addJournalEntry');
    }
});

Template.showJournalEntry.onDestroyed(function () {

});
