import YouTube from 'youtube-node';
import q from 'q';
import R from 'ramda';

import { idToDownloadLink } from './youtube-mp3-api';

const youTube = new YouTube();

youTube.setKey('AIzaSyCJqUuLhLArssxS8M36LQkMIMcIxZ2mzIE');

const endpointYoutubeMP3 =
  (id) => `https://www.youtubeinmp3.com/fetch/?format=json&video=https://www.youtube.com/watch?v=${id}`

export const search = (query) => {
  return q.nfcall(youTube.search, query, 10)
    .then(({ items }) => {
      const itemsWithId = R.filter(({ id }) => id.videoId, items);
      const finalData = R.map(({ id, snippet }) =>
      ({ id: id.videoId, title: snippet.title, thumbnails: snippet.thumbnails }), itemsWithId);
      return finalData;
    });
}

export const download = (id) => {
  return idToDownloadLink(id);
}
