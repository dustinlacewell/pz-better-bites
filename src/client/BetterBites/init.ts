import * as Events from '@asledgehammer/pipewrench-events';
import { isInfected, loadEffects, loadParts, onPlayerUpdate } from './bites';
import { initializeUI } from './debug';
import { BB } from './store';
import { ISDebugMenu as _ISDebugMenu } from '@asledgehammer/pipewrench';

declare const ISDebugMenu: _ISDebugMenu;

Events.onGameStart.addListener(() => {
  BB.infected = isInfected();
  loadEffects();
  loadParts();
  const debugWindow = initializeUI();

  const originalSetupButtons = ISDebugMenu.setupButtons as () => void;

  ISDebugMenu.setupButtons = function (this: _ISDebugMenu) {
    this.addButtonInfo(
      'Better Bites',
      () => {
        debugWindow.setVisible(!debugWindow.getIsVisible());
      },
      'MAIN'
    );
    originalSetupButtons.call(this);
  };

  Events.onPlayerUpdate.addListener(onPlayerUpdate);
});
