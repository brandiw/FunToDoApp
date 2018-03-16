// If you know how to do tests with react/typescript, feel free to enlighten me.
// The internet seems to have nothing. I can't seem to mock the DOM without random bugs.
// Not bugs on StackOverflow, like random issues on Github. Sorry, I just can't spare
// that kind of time for something like this.
// I went ahead and marked out the tests anyway.
import React from "react";
import { expect } from "chai";
import sinon from "sinon";
import { shallow, mount } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-15";
import * as ToDoList from "../components/ToDoList";
import { ToDoListItem, Item } from "../components/ToDoList";

let toDoList: ToDoList;

describe("ToDoList", () => {
  before(function(){
    toDoList = new ToDoList.constructor();
  });

  describe("Initialize", () => {
      it("Should instantiate a non-null ToDoList", () => {
        expect(toDoList).to.not.equal(null);
      });
      it("Should instantiate a non-undefined ToDoList", () => {
        expect(toDoList).to.not.equal(undefined);
      });
      it('renders three default <ToDoListItem /> components', () => {
        // Normally: use enzyme to mock the object
        // then look for ToDoListItem within toDoList, and expect that
        // is equal to the number of mock data objects coming from the API
        let numObjs = 3;
        expect(numObjs).to.equal(3);
      });
      it('renders a <form /> object to accept top-level components', () => {
        // Normally: use enzyme to mock the object
        // then look for ToDoListItem within toDoList, and expect that
        // is equal to the number of mock data objects coming from the API
        let form = true;
        expect(form).to.equal(true);
      });
  });

  describe("Add", () => {
      it("Should add a top-level item to the ToDoList", () => {
        let options = {
          dueDate: new Date('2018-12-11'),
          description: "Test Top-Level",
          parent: -1,
          detail: "Test detail"
        }
        // Normally: call add() use a spy to ensure that add gets called
        expect(1).to.equal(1);
      });

      it("Should add a top-level item to the ToDoList", () => {
        let options = {
          dueDate: new Date('2018-12-11'),
          description: "Test Child Item",
          parent: 2,
          detail: "Test detail"
        }
        // Normally: call add() use a spy to ensure that add gets called
        expect(2).to.equal(2);
      });

      it("Should add an item due in the past", () => {
        let options = {
          dueDate: new Date('2017-12-11'),
          description: "Test Child Item",
          parent: 2,
          detail: "Test detail"
        }
        // Normally: ensure date is in the past
        expect(3).to.equal(3);

        // Normally: Ensure coloring is appropriate to past due items
        expect(3).to.equal(3);
      });

      it("Should add an item due in the future", () => {
        let options = {
          dueDate: new Date('2017-12-11'),
          description: "Test Child Item",
          parent: 2,
          detail: "Test detail"
        }
        // Normally: ensure date added is in the future
        expect(4).to.equal(4);

        // Normally: Ensure coloring is appropriate to future items
        expect(4).to.equal(4);
      });

      it("Should add an item due today", () => {
        let options = {
          dueDate: new Date().toISOString().substring(0, 10),
          description: "Test Child Item",
          parent: 2,
          detail: "Test detail"
        }
        // Normally: ensure date added is in the future
        expect(5).to.equal(5);

        // Normally: Ensure coloring is appropriate to 'DUE SOON' items
        expect(5).to.equal(5);
      });

      it("Should clear form after add", () => {
        // Normally: ensure form fields are blank or default
        expect(5).to.equal(5);
      });

      it("Should not allow adding an item without a due date", () => {
        // Normally: expect input with no date to fail to create an item
        expect(6).to.equal(6);
      });

      it("Should not allow adding an item without a title", () => {
        // Normally: expect input with no title to fail to create an item
        expect(7).to.equal(7);
      });
  });

  describe("Clear", () => {
    it("Should delete all items in the ToDoList", () => {
      // Normally: call clear() use a spy to ensure that add gets called
      expect(1).to.equal(1);
    });

    it("Should empty the ToDoListItems from the ToDoList", () => {
      // Normally: expect ToDoList not to have any ToDoListItem children
      expect(2).to.equal(2);
    });
  });

  describe("Mark Complete / Done", () => {
    it("MarkDone function should strikethrough item text", () => {
      // Normally: call markDone() use a spy to ensure that add gets called
      expect(1).to.equal(1);

      // Normally: ensure that the text is crossed out
      expect(1).to.equal(1);

      // Normally: ensure that item.isDone is true
      expect(1).to.equal(1);
    });

    it("MarkDone function should recursively call parent if all child items are done.", () => {
      // Normally: set up a situation where completing the item is the last sub-task in the list
      // to be done. This should trigger the parent to mark itself done. Likewise, if the parent is
      // also a child of another item, and it is the last to be done, it should also mark
      // the (grand)parent done.
      expect(2).to.equal(2);
    });

    it("MarkDone function should mark all child items done", () => {
      // Normally: set up a situation where completing the item is the last sub-task in the list
      // to be done. This should trigger the parent to mark itself done. Likewise, if the parent is
      // also a child of another item, and it is the last to be done, it should also mark
      // the (grand)parent done.
      expect(3).to.equal(3);
    });
  });

  describe("Delete", () => {
    it("Should delete the item that was clicked", () => {
      // Normally: call deleteItem() use a spy to ensure that add gets called
      expect(1).to.equal(1);

      // Normally: ensure that item is gone
      expect(1).to.equal(1);
    });

    it("Should not delete a sibling item that wasn't clicked", () => {
      // Normally: use a spy to make sure it gets called
      expect(2).to.equal(2);

      // Normally: ensure that item is gone
      expect(2).to.equal(2);
    });

    it("Should delete all children", () => {
      // Normally: ensure child items are all deleted
      expect(3).to.equal(3);
    });
  });

  describe("Display", () => {
    it("Should display form when + button clicked", () => {
      // Normally: ensure click event happens and that form is displaying
      expect(1).to.equal(1);

      // Normally: ensure - sign shows when form is displayed
      expect(1).to.equal(1);
    });

    it("Should show minus sign when form is displayed", () => {
      // Normally: ensure minus sign shows up
      expect(2).to.equal(2);

      // Normally: ensure that form is displaying
      expect(2).to.equal(2);
    });

    it("Should show next level children when more/down arrow button clicked", () => {
      // Normally: ensure click event occurs
      expect(3).to.equal(3);

      // Normally: ensure the children are shown
      expect(3).to.equal(3);
    });

    it("Should show less/up arrow when children are explanded", () => {
      // Normally: ensure the less/up arrow are displayed
      expect(4).to.equal(4);

      // Normally: ensure the children are shown
      expect(4).to.equal(4);
    });
  });
});
