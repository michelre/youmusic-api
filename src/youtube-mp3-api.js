import q from 'q';
import R from 'ramda';
import jsdom from 'jsdom';

const baseEndpoint = 'https://www.youtubeinmp3.com';

const endpointYoutubeMP3 =
  (id) => `${baseEndpoint}/download/?video=https://www.youtube.com/watch?v=${id}&autostart=0`

export const idToDownloadLink = (id) =>
  q.nfcall(jsdom.env, endpointYoutubeMP3(id), ['http://code.jquery.com/jquery.js'])
    .then(({ $ }) => `${baseEndpoint}${$('#download').attr('href')}`)
