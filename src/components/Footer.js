import React from 'react';

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer className="footer page__element">
        <p className="footer__copyright">&copy; {new Date().getFullYear()} Mesto Russia</p>
      </footer>
    );
  }
}

export default Footer;
