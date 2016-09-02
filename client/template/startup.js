Meteor.startup(function () {
    Meteor.typeahead.inject();
    AutoForm.setDefaultTemplate('ionic');
    sAlert.config({
        effect: 'jelly',
        position: 'bottom-right',
        timeout: 5000,
        html: false,
        onRouteClose: true,
        stack: true,
        offset: 0, // in px - will be added to first alert (bottom or top - depends of the position in config)
        beep: false,
        onClose: _.noop //
    });
});
