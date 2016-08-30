Meteor.methods({
    updateUserRole(userId, roles){
        Meteor.users.update(userId, {$set: {roles: roles}});
    }
});
