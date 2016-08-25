AutoForm.hooks({
    addJournalEntry: {//id autoform
        before: {
            insert: function (doc) {
                var todayDate = moment().format('YYYYMMDD');
                var prefix = todayDate + '-';
                doc._id = idGenerator.genWithPrefix(Collection.JournalEntry, prefix, 4);
                return doc;
            }
        },
        onSuccess(formType, id){
            sAlert.success('Add Journal Entry Success');
        },
        onError(formType, error){
            sAlert.error(error.message);
        }
    }
});
Template.addJournalEntry.events({
    'click .js-search-journalItem': ()=> {
        let itemName = $('.js-search-journalItem').val();
        console.log(itemName);
    }
});
