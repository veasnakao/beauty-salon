Template.journalEntryDetailById.created = function () {
    let params = Router.current().params;
    let id = params._id;
    this.autorun(function () {
        let journalEntryId = Router.current().params._id;
        this.subscription = Meteor.subscribe('journalEntry', id);
        // this.subscription = Meteor.subscribe('journalItems');
    }.bind(this));
    Meteor.call('journalEntryDetailById', id, (error, result)=> {
        if (error) {
            sAlert.error(error.message);
        } else {
            Session.set('journalEntryDetailById', result);
        }
    });
};

//helper
Template.journalEntryDetailById.helpers({
    subTotalIsNotZero(subTotal){
        return subTotal != 0 && subTotal != null;
    },
    journalEntryDetailById(){
        if (Session.get('journalEntryDetailById')) {
            console.log(Session.get('journalEntryDetailById'));
            return Session.get('journalEntryDetailById');
        }
    }
});

Template.journalEntryDetailById.events({
    'click .js-delete-journal'(){
        let params = Router.current().params;
        let journalEntryId = params._id;
        console.log(journalEntryId);
        let journalEntry = Collection.JournalEntry.findOne({_id: journalEntryId});
        if (journalEntry) {
            IonPopup.confirm({
                title: 'Are you sure to delete?',
                template: `Journal : ${journalEntry._id}?`,
                onOk: () => {
                    Meteor.call('removeJournalEntry', journalEntry._id, (err, result) => {
                        if (err) {
                            sAlert.error(`Cancel ${journalEntry.name}`);
                        } else {
                            overhang.notify({
                                type : "success",
                                message: "Delete success"
                            });
                            Router.go(`/showJournalEntry`);
                            sAlert.success(`Journal delete success ${journalEntry._id}`);
                        }
                    });
                },
                onCancel: function () {
                }
            });
        }
    },
    'click .js-update-journal'(){
        let params = Router.current().params;
        let journalEntryId = params._id;
        Router.go(`/editJournalEntry/${journalEntryId}`);
    }
});