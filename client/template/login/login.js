Template.login.events({
    'click .js-username': function () {
        // $('#signup-username').addClass("form-border-bottom");

        // $('.label-border-username').css({
        //     'border-bottom': '1px solid green'
        // });

        // $('.label-border-username').mousedown(function () {
        //     $('.label-border-username').css("border-bottom", "3px solid #f37736").animate({
        //         'borderWidth': '4px',
        //         'borderColor': '#f37736'
        //     },100);
        // });
    },
    'click .js-password':function(){

    },
    'click .js-login': function (event, template) {
        event.preventDefault();
        Meteor.loginWithPassword(
            template.find(".js-username").value,
            template.find(".js-password").value,
            function (error) {
                if (error) {
                    swal({
                        title: "Login",
                        imageUrl: "/sad_face.png",
                        text:error,
                        timer: 3000,
                        showConfirmButton: true
                    });
                    // sAlert.error(error.message);
                } else {
                    if(!Meteor.user().profile.approved){
                        swal({
                            title: "Please ask permission from Admin!",
                            imageUrl: "/sad_face.png",
                            timer: 10000,
                            showConfirmButton: true
                        });
                    }else{
                        Router.go(`/`);
                    }
                }
            }
        );
    }
});