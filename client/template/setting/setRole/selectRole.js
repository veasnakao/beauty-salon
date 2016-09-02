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
                console.log(error)
            }
            if (result) {
                sAlert.success('update success');
            }
        });
    }
});

AutoForm.hooks({
    selectRole: {
        onSubmit(doc) {
            Meteor.call('updateUserRole', doc._id, doc.roles, (err, result) => {
                if (err) {
                    sAlert.error(err.message);
                } else {
                    sAlert.success('Role update success');
                }
            });
            return false;
        }
    }
});
