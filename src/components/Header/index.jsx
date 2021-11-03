import '../../utils/Style/main.css'
import Logo from '../../assets/Images/argentBankLogo.png'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useStore} from 'react-redux'
import { selectUser } from '../../utils/selectors'
import { getOrModifyUser } from '../../utils/callMethod/User'
import { userReset } from '../../features/user'

export default function Header() {
  const store = useStore()

  const email = localStorage.getItem('localEmail')
  const password = localStorage.getItem('localPassword')

  useEffect(() => {
    const method = 'post'
    const path = '/login'
    const body = {
      email: email,
      password: password,
    }
    const token = ''
    getOrModifyUser(store, method, path, body, token)
  }, [store, email, password])

  const userInfos = useSelector(selectUser)

  const firstName = userInfos.data?.firstName
  const token = userInfos.auth?.token
  
  useEffect(() => {
    const method = 'post'
    const path = '/profile'
    const body = {}
    getOrModifyUser(store, method, path, body, token)
  }, [store, token])  
  
  const status = userInfos.status
  console.log(localStorage.getItem('localEmail'), localStorage.getItem('localPassword'))

  const signout = (() => {
    localStorage.removeItem('localEmail')
    localStorage.removeItem('localPassword')
    store.dispatch(userReset())
  })
      return (
        <nav className="main-nav">
          <Link className="main-nav-logo" to="/">
            <img
              className="main-nav-logo-image"
              src={Logo}
              alt="Argent Bank Logo"
            />
            <h1 className="sr-only">Argent Bank</h1>
          </Link>
          {(status==='resolved') ? (
            <div>
            <Link className="main-nav-item" to="/profile">
              <i className="fa fa-user-circle"></i>
              {firstName}
            </Link>
            <Link className="main-nav-item"  to="/" onClick={signout}>
              <i className="fa fa-sign-out"></i>
              Sign Out
            </Link>
          </div>
          ) : (
          <div>
            <Link className="main-nav-item" to="/login">
                <i className="fa fa-user-circle"></i>
                Sign In
            </Link>
          </div>
          )}
        </nav>
      )
}