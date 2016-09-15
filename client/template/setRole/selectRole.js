Template._selectRole.helpers({
    roles() {
        let userId = Template.instance().data.id;
        let user = Meteor.users.findOne(`${userId}`);
        return user;
    }
});

Template.setRole.events({
    'click .approved-toggle'(){
        Meteor.call('approvedUser', this._id, this.profile.approved, (error, result) => {
            if (error) {
                swal({
                    title: "Error",
                    text:error,
                    type:"error",
                    timer: 3000,
                    showConfirmButton: true
                })
            }
            if (result) {
                swal({
                    title: "Success",
                    text: "Update success",
                    type: "success",
                    timer: 1000,
                    confirmButtonColor: "#45B1FC",
                    showConfirmButton: true
                })
            }
        });
    }
});

AutoForm.hooks({
    selectRole: {
        onSubmit(doc) {
            Meteor.call('updateUserRole', doc._id, doc.roles, (err, result) => {
                if (err) {
                    swal({
                        title: "Error",
                        text:error,
                        type:"error",
                        timer: 3000,
                        showConfirmButton: true
                    })
                } else {
                    swal({
                        title: "Success",
                        text: "Role update success",
                        type: "success",
                        timer: 1000,
                        confirmButtonColor: "#45B1FC",
                        showConfirmButton: true
                    })
                }
            });
            return false;
        }
    }
});
