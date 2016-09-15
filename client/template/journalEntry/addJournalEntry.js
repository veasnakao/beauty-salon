//oncreated
Template.addJournalEntry.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('journalEntrys');
        this.subscription = Meteor.subscribe('journalItems');
    }.bind(this));
};

//onrender
Template.addJournalEntry.rendered = function () {
    try {
        this.autorun(() => {
            if (!this.subscription.ready()) {
                IonLoading.show();
            } else {
                IonLoading.hide();
            }
        });
    } catch (e) {
        console.log(e);
    }
};

AutoForm.hooks({
    addJournalEntry: {
        before: {
            insert: function (doc) {
                let date = doc.date;
                date = moment(date).format('YYYYMMDD');
                let prefix = date + '-';
                doc._id = idGenerator.genWithPrefix(Collection.JournalEntry, prefix, 4);
                return doc;
            }
        },
        onSuccess(formType, id){
            swal({
                title: "Success",
                text: "Journal entry add success",
                type: "success",
                timer: 1000,
                confirmButtonColor: "#45B1FC",
                showConfirmButton: true
            })
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

Template.addJournalEntry.events({
    'click .js-back'(){
        Router.go('showJournalEntry');
    }
});
