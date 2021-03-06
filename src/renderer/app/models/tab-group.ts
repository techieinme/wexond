import { observable, computed } from 'mobx';

import store from '~/renderer/app/store';
import { colors } from '~/renderer/constants';

let id = 0;

export class TabGroup {
  @observable
  public id: number = id++;

  @observable
  public name: string = 'New group';

  @observable
  public selectedTabId: number;

  @observable
  public color: string = colors.lightBlue['500'];

  @observable
  public editMode = false;

  constructor() {
    const { palette } = store.tabGroupsStore;
    this.color = palette[Math.floor(Math.random() * palette.length)];
  }

  public nextPosition = 0;

  @computed
  public get isSelected() {
    return store.tabGroupsStore.currentGroupId === this.id;
  }

  public get tabs() {
    return store.tabsStore.tabs.filter(x => x.tabGroupId === this.id);
  }

  public select() {
    store.tabGroupsStore.currentGroupId = this.id;

    setTimeout(() => {
      store.tabsStore.updateTabsBounds(false);
    }, 1);
  }
}
