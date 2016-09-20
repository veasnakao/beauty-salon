//event
Template.signup.events({
    "click .js-signup": function (event, template) {
        event.preventDefault();
        let username = $('.js-username').val();
        let password = $('.js-password').val();
        let confirmPassword = $('.js-confirm-password').val();
        if (confirmPassword == password) {
            let userObj = {};
            if (username == "super") {
                let approved = true;
                userObj = {
                    username: username,
                    password: password,
                    profile: {
                        username: username,
                        approved: approved
                    },
                    role: []
                };
            } else {
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
            let createUser = Accounts.createUser(userObj, function (error) {
                if (error) {
                    swal({
                        title: "Error",
                        text: error,
                        type: "error",
                        timer: 3000,
                        showConfirmButton: true
                    })
                } else {
                    swal({
                        title: "Success",
                        text: "Register success",
                        type: "success",
                        timer: 1000,
                        confirmButtonColor: "#45B1FC",
                        showConfirmButton: true
                    });
                    Router.go(`/login`);
                }
            });
        } else {
            swal({
                title: "Error",
                text: "Password mismatch",
                type: "error",
                timer: 3000,
                showConfirmButton: true
            })
            $('.js-username').val(null);
            $('.js-password').val(null);
            $('.js-confirm-password').val(null);
            return false;
        }
    }
});

