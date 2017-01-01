//oncreated
Template.addJournalItem.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('journalItems');
    }.bind(this));
};

//onrender
Template.addJournalItem.rendered = function() {
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
AutoForm.hooks({
    addJournalItem: {//id autoform
        before: {
            insert: function (doc) {
                doc._id = idGenerator.gen(Collection.JournalItem, 5);
                return doc;
            }
        },
        onSuccess(formType, id){
            swal({
                title: "Success",
                text: "Joural item add success",
                type: "success",
                timer: 1000,
                confirmButtonColor: "#45B1FC",
                showConfirmButton: false
            })
        },
        onError(formType, error){
            swal({
                title: "Error",
                text:error,
                type:"error",
                timer: 3000,
                showConfirmButton: true
            })
        }
    }
});