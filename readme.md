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

