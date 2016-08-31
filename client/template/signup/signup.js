
//event
Template.signup.events({
    "click .js-signup": function (event, template) {
        event.preventDefault();
        let username = $('.js-username').val();
        let password = $('.js-password').val();
        let confirmPassword = $('.js-confirm-password').val();
        if (confirmPassword == password) {
            let userObj={};
            if(username=="super"){
                let approved = true;
                userObj = {
                    username: username,
                    password: password,
                    profile: {
                        username: username,
                        approved: approved
                    }
                };
            }else{
                let approved = false;
                userObj = {
                    username: username,
                    password: password,
                    profile: {
                        username: username,
                        approved: approved
                    }
                };
            }
            let createUser = Accounts.createUser(userObj,function (error) {
                if(error){
                    sAlert.error(error.message);
                }else{
                    Router.go(`/login`);
                }
            });
        } else {
            sAlert.error(`Password mismatch`);
            $('.js-username').val(null);
            $('.js-password').val(null);
            $('.js-confirm-password').val(null);
            return false;
        }
    }
});

