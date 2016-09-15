//oncreate
Template.journalItemInfo.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('journalItem', Router.current().params._id);
    }.bind(this));
};

//onrender
Template.journalItemInfo.rendered = function () {
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
Template.journalItemInfo.helpers({
    journalItemInfo: function () {
        let journalItemInfo = Collection.JournalItem.findOne({_id: Router.current().params._id});
        if (journalItemInfo) {
            return journalItemInfo;
        }
    }
});

Template.journalItemInfo.events({
    'click .delete-journalItem'(){
        let params = Router.current().params;
        let itemId = params._id;
        let item = Collection.JournalItem.findOne({_id: itemId});
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
                Meteor.call('removeJournalItem', item._id, (error, result) => {
                    if (error) {
                        swal({
                            title: "Error",
                            text: error,
                            type: "error"
                        });
                    } else {
                        Router.go('/showJournalItem');
                        swal("Deleted!", "Your journal item has been deleted.", "success");
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
});