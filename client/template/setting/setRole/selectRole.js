Template._selectRole.helpers({
    roles() {
        let userId = Template.instance().data.id;
        let user = Meteor.users.findOne(`${userId}`);
        return user;
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
})