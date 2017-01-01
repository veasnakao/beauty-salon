// //oncreate
Template.editJournalEntry.created = function () {
    this.autorun(function () {
        let journalEntryId = Router.current().params._id;
        this.subscription = Meteor.subscribe('journalEntry', journalEntryId);
        this.subscription = Meteor.subscribe('journalItems');
    }.bind(this));
};

//onrender
Template.editJournalEntry.rendered = function () {
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
Template.editJournalEntry.helpers({
    journalEntryDetail() {
        let journalEntryId = Router.current().params._id;
        let journalEntry = Collection.JournalEntry.findOne({
            _id: journalEntryId
        });
        if (journalEntry) {
            console.log(journalEntry);
            return journalEntry;
        }
    }
});

//autoform hook
AutoForm.hooks({
    editJournalEntry: {
        onSuccess(formType, id){
            let params = Router.current().params;
            let journalEntryId = params._id;
            swal({
                title: "Success",
                text: "Journal entry update success",
                type: "success",
                timer: 1000,
                confirmButtonColor: "#45B1FC",
                showConfirmButton: false
            });
            Meteor.call('journalEntryDetailById', journalEntryId, (error, result)=> {
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
            $("[name='close']").trigger("click");
        },
        onError(formType, error){
            swal({
                title: "Error",
                text: error,
                type: "error",
                timer: 3000,
                showConfirmButton: true
            })
        }
    }
});