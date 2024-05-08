import {useState} from "react";
import axios from "axios";
import configs from "../../../config.js";
import {useNavigate} from "react-router-dom";

function Login() {
  const [seePassword, setSeePassword] = useState(false)
  const [userInfo, setUserInfo] = useState({user_email: '', user_password: ''})

  const navigate = useNavigate()

  const connect = (e) => {
    e.preventDefault()
    axios.post(`${configs.API_GATEWAY_URL}/user/login`, userInfo).then(res => {
      localStorage.setItem("token", res.data.token)
      navigate('/dashboard/client')
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <div className={'h-dvh w-dvw flex justify-center place-items-center'}>
      <div className={'p-4 border rounded-md space-y-2'}>
        <div>
          <h1 className={'font-black text-2xl'}>Connexion</h1>
          <p className={'text-sm text-gray-600 font-light'}>Connexion à l&apos;application de gestion de virement
            bancaire.</p>
          <hr/>
        </div>
        <form onSubmit={connect} className={' space-y-2'}>
          <div className={''}>
            <label htmlFor="identifiant">Identifiant ou email</label>
            <input onChange={(e) => {
              setUserInfo({...userInfo, user_email: e.target.value})
            }} type="text"
                   id={'identifiant'} name={'identifiant'}
                   className={'block border w-full rounded-md p-2'}/>
          </div>
          <div className={''}>
            <label htmlFor="password">Mot de passe</label>
            <input onChange={(e) => {
              setUserInfo({...userInfo, user_password: e.target.value})
            }} type={seePassword ? "text" : "password"} id={'password'} name={'password'}
                   className={'block border w-full rounded-md p-2'}/>
          </div>
          <div className={'space-x-2'}>
            <input onChange={(e) => {
              setSeePassword(e.target.checked)
            }} type="checkbox" id={'seePassword'} name={'seePassword'}/>
            <label htmlFor="seePassword">Mot de passe</label>
          </div>
          <div className={'flex justify-end'}>
            <button type={'submit'} className={'bg-black text-white px-4 py-1 rounded-sm'}>
              <span>
              Se connecter
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login