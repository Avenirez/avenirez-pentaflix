"use client";

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer__top">
        <div className="footer__logo">
          Penta<span>flix</span>
        </div>
        <div className="footer__links">
          <a href="#" className="footer__link">
            About
          </a>
          <a href="#" className="footer__link">
            Privacy Policy
          </a>
          <a href="#" className="footer__link">
            Terms of Service
          </a>
          <a href="#" className="footer__link">
            Contact
          </a>
        </div>
      </div>
      <div className="footer__bottom">
        <p className="footer__copy">
          © {new Date().getFullYear()} Pentaflix. All rights reserved. Built for
          portfolio purposes. Movie data provided by TMDB.
        </p>
      </div>
    </footer>
  );
}
