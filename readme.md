## To-Do List Development Process

### Day 1 (2 hours)

* Set up empty project and Github repo
* Familiarize with typescript
* Stub out routes / components
* Begin outline of to-do list app

### Day 2: Part 1 (3 hours)

* Set up readme
* Fleshed out some styling in to-do list
* Adding top-level (parent) items implemented
* Deleting whole list of items implemented
* Mark done functionality works
* Timezone bug solved / Dates working and comparing correctly
* Conditional displays added
    * Three states for due dates: 
        * past (blue)
        * due soon (yellow)
        * due later (green)
    * Buttons to mark done or add sub-items only appear when not done
* Added id and counter to mock a table row from a SQL database

### Day 2: Part 2 (1.5 hours)

* Ran into this annoying issue: https://github.com/OmniSharp/omnisharp-vscode/issues/1220
* Adding an API with methods:
    * GET: /api/FakeDB/Items - Gets all the items
    * POST: /api/FakeDB/Add - Adds a new item
* Added mock data to show time highlights
* Got types working between back-end and front-end
* Put default date in as today for convenience
* Add/submit function now runs when pressing enter in form

### Day 3 Part 1 (3 hours)

* Mark done functionality has been moved to API
* Date is now reset to today on submit
* Added optional details field to Item class
* Wrote sub-task form / add button
* Implemented sub-task functionality
* Implemented delete button
* Clear + Delete functionality moved to API

### Day 3 Part 2 (1 hour)

* Fixed duplicate bug
* Comment and document
* Sub-tasks now close parents if all sub-tasks done

## Finished Product

### Entry Form

![Entry form](http://res.cloudinary.com/briezh/image/upload/v1521153889/Screen_Shot_2018-03-15_at_3.27.28_PM_lsjnea.png)

### List and Sublist Displays

![Minimized List](http://res.cloudinary.com/briezh/image/upload/v1521153889/Screen_Shot_2018-03-15_at_3.31.03_PM_faqndi.png)

![Sublist](http://res.cloudinary.com/briezh/image/upload/v1521153889/Screen_Shot_2018-03-15_at_3.30.23_PM_qcuwfu.png)

## Overview

I didn't get to the part where I store the data anywhere. It'd be pretty easy to add, I just ran out of time, and the directions made that part look less important so I focused my efforts elsewhere. All other requirements seem to be met.

`NOTE`: The recruiter mentioned I should do unit tests, but the directions didn't explicitly say so. If that was supposed to have been listed on the requirements, then that is another thing I didn't have time for.

`NOTE 2`: Pseudo-tests have been added with commentary.

![Tests](http://res.cloudinary.com/briezh/image/upload/v1521178877/Screen_Shot_2018-03-15_at_10.40.49_PM_mgzlzt.png)
