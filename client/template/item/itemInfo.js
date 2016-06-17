//oncreate
Template.itemInfo.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('item', Router.current().params._id);
    }.bind(this));
};

//onrender
Template.itemInfo.rendered = function() {
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
Template.itemInfo.helpers({
    itemInfo: function () {
        return Collection.Item.findOne({_id: Router.current().params._id});
    }
});