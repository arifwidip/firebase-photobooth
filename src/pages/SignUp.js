import { useHistory } from 'react-router-dom'
import useInput from "../hooks/useInput"
import { useAuth } from '../contexts/auth'
import { useEffect } from 'react'

export default function SignUp() {
  const email = useInput('')
  const password = useInput('')
  const history = useHistory()
  const { signup, isAuthenticated } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (email && password) {
      signup(email.value, password.value)
        .catch(e => {
          console.log(e)
        }) 
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/')
    }
  }, [isAuthenticated, history])

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="email" name="email" {...email} />
        </div>
        <div>
          <input type="password" name="password" {...password} />
        </div>
        <button type="submit">
          Sign Up
        </button>
      </form>
    </div>
  )
}