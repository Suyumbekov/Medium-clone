import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './PostPreview.module.scss';

const PostPreview = ({ post, author }) => (
  <article className={post.is_large_preview ? `${styles.post} ${styles['post--full-width']}` : styles.post}>
    <Link className={styles.image} to={`/blogs/${post.blog_id}/posts/${post.id}`}>
      <div className={styles['overlay-border']} />
      <picture>
        <source
          srcSet={`https://cdn-images-1.medium.com/max/400/${post.img_descriptor} 1x, https://cdn-images-1.medium.com/max/800/${post.img_descriptor} 2x`}
          media="(max-width: 400px)"
        />
        <source
          srcSet={`https://cdn-images-1.medium.com/max/600/${post.img_descriptor} 1x, https://cdn-images-1.medium.com/max/1200/${post.img_descriptor} 2x`}
          media="(min-width: 401px) and (max-width: 600px)"
        />
        <source
          srcSet={`https://cdn-images-1.medium.com/max/800/${post.img_descriptor} 1x, https://cdn-images-1.medium.com/max/1600/${post.img_descriptor} 2x`}
          media="(min-width: 601px)"
        />
        <img src={`https://cdn-images-1.medium.com/max/800/${post.img_descriptor}`} />
      </picture>
    </Link>
    <div className={styles.text}>
      <Link className={styles['text-link']} to={`/blogs/${post.blog_id}/posts/${post.id}`}>
        <h3>{post.title}</h3>
        <p>{post.subtitle}</p>
      </Link>
      <div className={styles.meta}>
        <a className="avatar avatar--small avatar--circled" href="https://blog.kentcdodds.com/@kentcdodds" target="_blank" rel="noopener noreferrer">
          <img src={author.avatar_url} />
        </a>
        <div className={styles['sub-meta']}>
          <a className={styles.author} href="https://blog.kentcdodds.com/@kentcdodds" target="_blank" rel="noopener noreferrer">
            {author.username}
          </a>
          <span className={styles.date}>{post.date}</span>
        </div>
      </div>
    </div>
  </article>
);

PostPreview.propTypes = {
  post: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
};

export default PostPreview;
