//oncreated
Template.showItem.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('items');
    }.bind(this));
};

//onrender
Template.showItem.rendered = function () {
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
Template.showItem.helpers({
    showItem: ()=> {
        return Collection.Item.find({}, {sort: {_id: 1}});
    }
});