import * as React from 'react';
import { observer } from 'mobx-react';

import store from '../../store';
import { HistoryItem } from '../../models';
import { formatTime } from '../../utils';
import { Favicon, Item, Remove, Title, Time, Site } from './style';

const onClick = (item: HistoryItem) => (e: React.MouseEvent) => {
  if (e.ctrlKey) {
    item.selected = !item.selected;
  }
};

const onTitleClick = (url: string) => (e: React.MouseEvent) => {
  if (!e.ctrlKey) {
    store.tabsStore.addTab({ url, active: true });
    store.overlayStore.visible = false;
  }
};

const onRemoveClick = (item: HistoryItem) => () => {
  store.historyStore.removeItem(item._id);
};

export default observer(({ data }: { data: HistoryItem }) => {
  return (
    <Item key={data._id} onClick={onClick(data)} selected={data.selected}>
      <Favicon
        style={{
          backgroundImage: `url(${store.faviconsStore.favicons[data.favicon]})`,
        }}
      />
      <Title onClick={onTitleClick(data.url)}>{data.title}</Title>
      <Site>{data.url.split('/')[2]}</Site>
      <Time>{formatTime(new Date(data.date))}</Time>
      <Remove onClick={onRemoveClick(data)} />
    </Item>
  );
});
