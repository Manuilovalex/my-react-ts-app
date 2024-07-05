import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { LinkInterface, NAVBAR_LINKS } from '../data/mockData.ts'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store.ts'
import { logout } from '../redux/slices/authSlice.ts'
import Modal from '../modal/Modal'
import RegistrationForm from './form/RegistrationForm.tsx'

const Navbar = () => {
  const dispatch = useDispatch()
  const { isLogin } = useSelector((state: RootState) => state.auth)
  const [modalOpen, setModalOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogin = () => {
    setModalOpen(true)
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <nav className="navbar">
      <div>
        <p className="logo">Logo</p>
      </div>
      <div className="menu-toggle" onClick={toggleMenu}>
        &#9776;
      </div>
      <ul className={`navbar__list ${menuOpen ? 'open' : ''}`}>
        {NAVBAR_LINKS.map((link: LinkInterface, index: number) => (
          <li className="navbar__item" key={index}>
            {isLogin ? (
              <NavLink className="navbar__link" to={link.path} onClick={toggleMenu}>
                {link.name}
              </NavLink>
            ) : (
              <span className="navbar__link disabled">{link.name}</span>
            )}
          </li>
        ))}
        {!isLogin ? (
          <li className="navbar__item">
            <button className="navbar__link" onClick={handleLogin}>
              Login
            </button>
          </li>
        ) : (
          <li className="navbar__item">
            <button className="navbar__link" onClick={handleLogout}>
              Logout
            </button>
          </li>
        )}
      </ul>

      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <RegistrationForm onClose={() => setModalOpen(false)} />
        </Modal>
      )}
    </nav>
  )
}

export default Navbar
