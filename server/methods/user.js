Meteor.methods({
    approvedUser(userId, approved){
        return Meteor.users.update({_id: userId}, {$set: {'profile.approved': !approved}})
    },
    updateUserRole(userId, roles){
        Meteor.users.update(userId, {$set: {roles: roles}});
    }
});
