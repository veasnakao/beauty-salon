//oncreate
Template.staffInfo.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('staff', Router.current().params._id);
    }.bind(this));
};

//onrender
Template.staffInfo.rendered = function () {
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
Template.staffInfo.helpers({
    staffInfo: function () {
        return Collection.Staff.findOne({_id: Router.current().params._id});
    }
});

//event
Template.staffInfo.events({
    'click .delete-staff'(){
        let params = Router.current().params;
        let staffId = params._id;
        let staff = Collection.Staff.findOne({_id: staffId});
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
                Meteor.call('removeStaff', staff._id, (error, result) => {
                    if (error) {
                        swal({
                            title: "Error",
                            text: error,
                            type: "error"
                        });
                    } else {
                        Router.go('/showStaff');
                        swal("Deleted!", "Your staff has been deleted.", "success");
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
