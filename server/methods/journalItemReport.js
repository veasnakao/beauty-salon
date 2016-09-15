Meteor.methods({
    journalItemReport(){
        let journalItem = Collection.JournalItem.find().fetch();
        if(journalItem) {
            return journalItem;
        }
    }
})