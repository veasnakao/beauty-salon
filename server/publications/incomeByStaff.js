//publish incomeByStaff
Meteor.publish('incomeByStaff', function () {
    return Collection.IncomeByStaff.find();
});