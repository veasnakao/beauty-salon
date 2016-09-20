Meteor.startup(function () {
    // if (Meteor.users.find().count() <= 0) {
    //     let superId = Accounts.createUser({
    //         username: 'super',
    //         email: 'super@rabbit.com',
    //         password: 'super123',
    //         approved: true
    //     });
    //     Roles.addUsersToRoles(superId, ['cashier', 'setting', 'seller', 'super'])
    // }
    if (Meteor.users.find().count() <= 0) {
        let userObj = {};
        let roles = ['setting'];
        userObj = {
            username: 'super',
            password: 'super123',
            profile: {
                username: 'super',
                approved: 'true'
            }
        };
        let superId = Accounts.createUser(userObj);
        console.log(superId);
        Roles.addUsersToRoles(superId, ['cashier', 'setting'])
    }
    if (Collection.Company.find().count() == 0) {
        let company = {
            companyName: "Rabbit TC",
            address: "Battambang",
            tel: "053 50 66 777"
        };
        Collection.Company.insert(company);
    }
});

