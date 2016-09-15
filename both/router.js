Router.configure({
    layoutTemplate: 'layout'
});

Router.map(function () {
    // this.route('index', {path: '/'});

    this.route('index', {
        path: '/'
    });

    //staff
    this.route('showStaff');
    this.route('staffInfo', {
        path: '/staffInfo/:_id',
    });

    //item
    this.route('showItem');
    this.route('itemInfo', {
        path: '/itemInfo/:_id'
    });

    //customer
    this.route('showCustomer');
    this.route('customerInfo', {
        path: '/customerInfo/:_id'
    });

    //expenseItem
    this.route('showJournalItem');
    this.route('journalItemInfo', {
        path: '/journalItemInfo/:_id'
    });

    //journalEntry
    this.route('showJournalEntry');
    this.route('journalEntryDetail', {
        path: '/journalEntryDetail/date/:date/journalType/:journalType'
    });
    this.route('journalEntryDetailById', {
        path: '/journalEntryDetailById/:_id'
    });
    this.route('editJournalEntry', {
        path: '/editJournalEntry/:_id'
    });
    this.route('addJournalEntry');

    //order
    this.route('showOrder');
    this.route('orderDetail', {
        path: '/orderDetail/:_id'
    });

    //itemOrder
    this.route('itemOrder', {
        path: '/itemOrder/orderId/:orderId'
    });

    //payment
    this.route('payment', {
        // path: '/itemOrder/orderId/:orderId/payment'
        path: '/itemOrder/orderId/:orderId/staffId/:staffId/customerId/:customerId/payment'
    });

    //printOrder
    this.route('printOrder', {
        path: '/itemOrder/orderId/:orderId/print'
    });

    this.route('setting');
    this.route('setRole');
    this.route('login');
    this.route('signup');


    //report
    this.route('reports');
    this.route('serviceItemReport');
    this.route('journalItemReport');
    this.route('staffReport');
    this.route('staffSalaryReport');
    this.route('orderReport');
    this.route('orderDetailReport');
    this.route('journalEntryReport');
    this.route('profitAndLossReport');
});