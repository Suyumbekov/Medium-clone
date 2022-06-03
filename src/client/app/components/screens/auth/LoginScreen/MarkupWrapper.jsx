import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import urlHelper from '../../../../utils/urlHelper';
import styles from '../shared/AuthScreen.module.scss';

const MarkupWrapper = ({ children }) => {
  const encodedRedirectUrl = urlHelper.computeEncodedRedirectUrl();

  return (
    <main>
      <div className={styles.container}>
        <div className={styles['outer-box']}>
          <div className={styles['inner-box']}>
            <h1>Кош келдиңиз</h1>
            <h2>Кирип, артыкчылыктарга ээ болуңуз</h2>

            {children}

            <div className={styles.account}>
              Аккаунт жокпу?
              {' '}
              <Link to={`/register?redirectUrl=${encodedRedirectUrl}`}>Катталуу</Link>.
            </div>
            <div className={styles.terms}>
              To make original Medium work, they(Medium team) log user data and share it with service providers. Click "Sign in" above to accept Medium’s
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
  );
};

MarkupWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MarkupWrapper;

/* eslint max-len: off */
/* eslint react/no-unescaped-entities: off */
