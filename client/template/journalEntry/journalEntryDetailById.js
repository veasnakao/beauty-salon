Template.journalEntryDetailById.created = function () {
    let params = Router.current().params;
    let id = params._id;
    this.autorun(function () {
        let journalEntryId = Router.current().params._id;
        this.subscription = Meteor.subscribe('journalEntry', id);
    }.bind(this));
    Meteor.call('journalEntryDetailById', id, (error, result)=> {
        if (error) {
            swal({
                title: "Error",
                text: error,
                type: "error",
                timer: 3000,
                showConfirmButton: false
            })
        } else {
            Session.set('journalEntryDetailById', result);
        }
    });
};

//helper
Template.journalEntryDetailById.helpers({
    checkDate(){
        // let params = Router.current().params;
        // let id = params._id;
        // let journalEntry = Collection.JournalEntry.findOne(id);
        // if (journalEntry) {
        //     let journalDate = journalEntry.date;
        //     let today = new Date();
        //     let tomorrow = today.setDate(today.getDate() + 1);
        //     if (journalDate < tomorrow) {
        //         return false;
        //     } else {
        //         return true;
        //     }
        // }
    },
    subTotalIsNotZero(subTotal){
        return subTotal != 0 && subTotal != null;
    },
    journalEntryDetailById(){
        if (Session.get('journalEntryDetailById')) {
            return Session.get('journalEntryDetailById');
        }
    }
});

Template.journalEntryDetailById.events({
    'click .js-delete-journal'(){
        let params = Router.current().params;
        let journalEntryId = params._id;
        let journalEntry = Collection.JournalEntry.findOne({_id: journalEntryId});
        if (journalEntry) {
            swal({
                title: "Are you sure?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#5591DF",
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel plx!",
                closeOnConfirm: false, closeOnCancel: false
            }, function (isConfirm) {
                if (isConfirm) {
                    Meteor.call('removeJournalEntry', journalEntry._id, (error, result) => {
                        if (error) {
                            swal({
                                title: "Error",
                                text: error,
                                type: "error"
                            });
                        } else {
                            swal({
                                title: "Success",
                                text: "Deleted success",
                                type: "success",
                                timer: 1000,
                                showConfirmButton: false
                            });
                            Session.set('journalEntryDetailById', undefined);
                            Router.go(`/showJournalEntry`);
                        }
                    });
                } else {
                    swal({
                        title: "Cancelled",
                        type: "error"
                    });
                }
            });
        }
    }
});