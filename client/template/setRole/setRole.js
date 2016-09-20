//oncreated
Template.setRole.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('allUser');
    }.bind(this));
};

//onrender
Template.setRole.rendered = function () {
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
Template.setRole.helpers({
    showUser: ()=> {
        return Meteor.users.find();
    },
    checkUsername(username){
        if (username == "super") {
            return true;
        }
    }
});

Template.setRole.events({
    'click .delete-user'(){
        let userId = this._id;
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
                Meteor.call('removeUser', userId, (error, result)=> {
                    if (error) {
                        swal({
                            title: "Error",
                            text: error,
                            type: "error"
                        });
                    } else {
                        swal("Deleted!", "Your user has been deleted.", "success");
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