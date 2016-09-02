Template.chooseJournalType.events({
    'change .chooseJournal'(){
        let journalType = $('input[name=chooseJournal]:checked').val();
        Session.set('journalType', journalType);
        Router.go('/addJournalEntry');
    }
});