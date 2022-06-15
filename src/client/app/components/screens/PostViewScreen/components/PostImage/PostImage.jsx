import React from 'react';
import PropTypes from 'prop-types';

import styles from './PostImage.module.scss';

const PostImage = ({ post }) => (
  <figure className={styles['post-image']}>
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
        media="(min-width: 601px) and (max-width: 800px)"
      />
      <source
        srcSet={`https://cdn-images-1.medium.com/max/1600/${post.img_descriptor} 1x, https://cdn-images-1.medium.com/max/3200/${post.img_descriptor} 2x`}
        media="(min-width: 801px)"
      />
      <img src={`https://cdn-images-1.medium.com/max/1600/${post.img_descriptor}`} />
    </picture>
  </figure>
);

PostImage.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostImage;
