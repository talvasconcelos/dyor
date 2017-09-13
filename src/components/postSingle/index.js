import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import Markdown from '../../lib/markdown';
import moment from 'moment';

import { getAllPosts, getPost } from '../../lib/api';

export const PostSingle = ({...props}) => {
  let md = getPost().then(console.log)
	return (
    <div>
      <pre>{JSON.stringify({...props}, 0, '  ')}</pre>
      <p>{md}</p>
    </div>
		//<Markdown markdown={content} {...props} />
	);
}
