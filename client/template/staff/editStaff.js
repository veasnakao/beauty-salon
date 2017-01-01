//oncreate
Template.editStaff.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('staff', Router.current().params._id);
    }.bind(this));
};

//onrender
Template.editStaff.rendered = function() {
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

Template.editStaff.helpers({
    staffInfo() {
        var template = Template.instance();
        return Collection.Staff.findOne({
            _id: template.data.id
        });
    }
});

Template.editStaff.events({
    'click .js-editStaff': ()=> {
        if ($(".js-fee").val().length == 0) {
            $('.js-fee').val(0);
        }
        if ($(".js-baseSalary").val().length == 0) {
            $('.js-baseSalary').val(0);
        }
    }
});
AutoForm.hooks({
    editStaff: {
        // before: {
        //     insert: function (doc) {
        //         doc._id = idGenerator.gen(Collection.Staff, 4);
        //         return doc;
        //     }
        // },
        onSuccess(formType, id){
            // debugger;
            swal({
                title: "Success",
                text: "Staff update success",
                type: "success",
                timer: 1000
            });
        },
        onError(formType, error){
            swal({
                title: "Error",
                text:error,
                type:"error",
                timer: 2000
            })
        }
    }
});