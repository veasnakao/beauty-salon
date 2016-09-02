Template.chooseJournalType.events({
    "change [name='chooseJournal']"(){
        let journalType = $('input[name=tcol1]:checked').val();
        console.log(journalType);
    }
});