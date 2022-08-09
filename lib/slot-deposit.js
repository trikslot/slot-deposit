'use babel';

import SlotDepositView from './slot-deposit-view';
import { CompositeDisposable } from 'atom';

export default {

  slotDepositView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.slotDepositView = new SlotDepositView(state.slotDepositViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.slotDepositView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'slot-deposit:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.slotDepositView.destroy();
  },

  serialize() {
    return {
      slotDepositViewState: this.slotDepositView.serialize()
    };
  },

  toggle() {
    console.log('SlotDeposit was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
