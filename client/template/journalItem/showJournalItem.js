//oncreated
Template.showJournalItem.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('journalItems');
    }.bind(this));
};

//onrender
Template.showJournalItem.rendered = function () {
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
Template.showJournalItem.helpers({
    showJournalItem: ()=> {
        let journalItem = Collection.JournalItem.find({}, {sort: {_id: 1}});
        if (journalItem) {
            return journalItem;
        }
    }
});