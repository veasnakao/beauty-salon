//oncreate
Template.editItem.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('item', Router.current().params._id);
    }.bind(this));
};

//onrender
Template.editItem.rendered = function () {
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

//helper
Template.editItem.helpers({
    itemInfo() {
        var template = Template.instance();
        return Collection.Item.findOne({
            _id: template.data.id
        });
    }
});

//autoform hook
AutoForm.hooks({
    editItem: {
        onSuccess(formType, id){
            swal({
                title: "Success",
                text: "Service item update success",
                type: "success",
                timer: 1000,
                confirmButtonColor: "#45B1FC",
                showConfirmButton: true
            })
        },
        onError(formType, error){
            swal({
                title: "Error",
                text: error,
                type: "error",
                timer: 3000,
                showConfirmButton: true
            })
        }
    }
});