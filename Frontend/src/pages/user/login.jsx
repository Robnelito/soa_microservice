function Login() {
  return (
    <div className={'h-dvh w-dvw flex justify-center place-items-center'}>
      <div className={'p-4 border rounded-md space-y-2'}>
        <div>
          <h1 className={'font-bold text-2xl'}>Connexion</h1>
          <p className={'text-sm text-gray-600 font-thin'}>Connexion à l'application de gestion de virement
            bancaire.</p>
          <hr/>
        </div>
        <form className={' space-y-2'}>
          <div className={''}>
            <label htmlFor="identifiant">Identifiant ou email</label>
            <input type="text" id={'identifiant'} name={'identifiant'}
                   className={'block border w-full rounded-md p-2'}/>
          </div>
          <div className={''}>
            <label htmlFor="password">Mot de passe</label>
            <input type="text" id={'password'} name={'password'}
                   className={'block border w-full rounded-md p-2'}/>
          </div>
          <div className={'space-x-2'}>
            <input type="checkbox" id={'seePassword'} name={'seePassword'}/>
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