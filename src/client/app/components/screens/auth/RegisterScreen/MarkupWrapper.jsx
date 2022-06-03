import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import urlHelper from '../../../../utils/urlHelper';
import styles from '../shared/AuthScreen.module.scss';

const MarkupWrapper = ({ children }) => {
  const encodedRedirectUrl = urlHelper.computeEncodedRedirectUrl();

  return (
    (
      <main>
        <div className={`${styles.container} ${styles['container--screen_registration']}`}>
          <div className={styles['outer-box']}>
            <div className={styles['inner-box']}>
              <h1>Fedium'га кошул</h1>
              <h2>Кирип, артыкчылыктарга ээ болуңуз</h2>

              {children}

              <div className={styles.account}>
              Аккаунтуңуз барбы?
                {' '}
                <Link to={`/login?redirectUrl=${encodedRedirectUrl}`}>Кирүү</Link>.
              </div>
              <div className={styles.terms}>
                
                {' '}
                <a href="https://medium.com/policy/medium-terms-of-service-9db0094a1e0f" target="_blank" rel="noopener noreferrer">
                  Terms of Service
                </a>
                {' & '}
                <a href="https://medium.com/policy/medium-privacy-policy-f03bf92035c9" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </a>.
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  );
};

MarkupWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MarkupWrapper;

/* eslint max-len: off */
/* eslint react/no-unescaped-entities: off */
