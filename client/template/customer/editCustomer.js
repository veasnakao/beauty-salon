//oncreate
Template.editCustomer.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('customer', Router.current().params._id);
    }.bind(this));
};

//onrender
Template.editCustomer.rendered = function() {
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

Template.editCustomer.helpers({
    customerInfo() {
        var template = Template.instance();
        return Collection.Customer.findOne({
            _id: template.data.id
        });
    }
});

Template.editCustomer.events({
    'click .js-editCustomer': ()=> {
        if ($(".js-fee").val().length == 0) {
            $('.js-fee').val(0);
        }
        if ($(".js-baseSalary").val().length == 0) {
            $('.js-baseSalary').val(0);
        }
    }
});
AutoForm.hooks({
    editCustomer: {
        // before: {
        //     insert: function (doc) {
        //         doc._id = idGenerator.gen(Collection.Customer, 4);
        //         return doc;
        //     }
        // },
        onSuccess(formType, id){
            sAlert.success('Customer Edit Success');
        },
        onError(formType, error){
            sAlert.error(error.message);
        }
    }
});