// src/components/Header.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import logoDark from '../assets/logo.jpg';

/**
 * Maps route paths to label and icon pairs
 */
const navItems = [
  { path: '/dashboard', label: 'Dashboard',   icon: ['bi-house',           'bi-house-fill'] },
  { path: '/log',       label: 'Log Catch',   icon: ['bi-plus-square',     'bi-plus-square-fill'] },
  { path: '/history',   label: 'History',     icon: ['bi-journal-text',    'bi-journal-text'] },  // same icon
  { path: '/profile',   label: 'Profile',     icon: ['bi-person',          'bi-person-fill'] },
  { path: '/logout',    label: 'Logout',      icon: ['bi-box-arrow-right', 'bi-box-arrow-right'], isLogout: true }
];

export default function Header({ onLogout }) {
  return (
    <>
      {/* Fixed sidebar */}
      <aside className="sidebar d-flex flex-column align-items-start p-3 shadow-sm position-fixed vh-100 bg-white" style={{ width: '220px', zIndex: 1000 }}>
        {/* Logo */}
        <a href="/" className="mb-4">
          <img src={logoDark} alt="Aqua Ledger" style={{ height: 36 }} />
        </a>

        {/* Nav items */}
        <nav className="nav flex-column w-100">
          {navItems.map(({ path, label, icon, isLogout }) =>
            isLogout ? (
              <button
                key="logout"
                onClick={onLogout}
                className="nav-link text-start bg-transparent border-0 w-100 px-2 py-2 text-danger"
                style={{ cursor: 'pointer' }}
              >
                <i className={`bi ${icon[0]}`} />
                <span className="ms-2">{label}</span>
              </button>
            ) : (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) => `nav-link px-2 py-2 ${isActive ? 'active fw-bold text-primary' : 'text-dark'}`}
              >
                {({ isActive }) => (
                  <>
                    <i className={`bi ${isActive ? icon[1] : icon[0]}`} />
                    <span className="ms-2">{label}</span>
                  </>
                )}
              </NavLink>
            )
          )}
        </nav>
      </aside>

      {/* Offset for main content */}
      <div style={{ marginLeft: '220px' }} />
    </>
  );
}
