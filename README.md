# mean-app
Original Tutorial is from Brad Travery's [MeanAuthApp](https://github.com/bradtraversy/meanauthapp)

I have updated the project to use more modern syntax.

The original project uses passport.js but I am not a big fan of using a monolithic module for something rather simple.
Instead I used [Permit.js](https://github.com/ianstormtaylor/permit) for this project. 

Front-end has been updated to use Angular 10+ and some of the original code used for this project has changed since Angular 5+.
Original tutorial only had 1 guard for before login but didn't have any for after login. 