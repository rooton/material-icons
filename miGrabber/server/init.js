"use strict";

import { Meteor } from 'meteor/meteor';


Meteor.startup(() => {
   
    console.log("Server Started");

    Meteor.call('parseDesignGoogle');
});
