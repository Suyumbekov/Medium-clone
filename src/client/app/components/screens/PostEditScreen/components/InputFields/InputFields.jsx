import React from 'react';
import PropTypes from 'prop-types';

import styles from './InputFields.module.scss';

const InputFields = ({ inputData, onInputChange, onCheckboxChange }) => {
  const { title, subtitle, img_descriptor, is_large_preview } = inputData;

  return (
    <div className={styles['input-fields']}>
      <div>
        <input type="text" className={styles['img-url']} name="img_descriptor" placeholder="Image descriptor for url" value={img_descriptor} onChange={onInputChange} />
      </div>
      <div className={styles['is-large-preview']}>
        <label>
          <input type="checkbox" checked={is_large_preview} onChange={onCheckboxChange} />
          Enable large preview
        </label>
      </div>
      <div>
        <input type="text" className={styles.title} name="title" placeholder="Title" value={title} onChange={onInputChange} />
      </div>
      <div>
        <input type="text" className={styles.subtitle} name="subtitle" placeholder="subtitle" value={subtitle} onChange={onInputChange} />
      </div>
    </div>
  );
};

InputFields.propTypes = {
  inputData: PropTypes.object.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
};

export default InputFields;

/* eslint object-curly-newline: off */
/* eslint jsx-a11y/label-has-for: off */
