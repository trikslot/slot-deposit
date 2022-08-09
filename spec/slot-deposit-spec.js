'use babel';

import SlotDeposit from '../lib/slot-deposit';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('SlotDeposit', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('slot-deposit');
  });

  describe('when the slot-deposit:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.slot-deposit')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'slot-deposit:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.slot-deposit')).toExist();

        let slotDepositElement = workspaceElement.querySelector('.slot-deposit');
        expect(slotDepositElement).toExist();

        let slotDepositPanel = atom.workspace.panelForItem(slotDepositElement);
        expect(slotDepositPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'slot-deposit:toggle');
        expect(slotDepositPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.slot-deposit')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'slot-deposit:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let slotDepositElement = workspaceElement.querySelector('.slot-deposit');
        expect(slotDepositElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'slot-deposit:toggle');
        expect(slotDepositElement).not.toBeVisible();
      });
    });
  });
});
