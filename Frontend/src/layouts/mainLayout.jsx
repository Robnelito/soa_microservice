import {Outlet, useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {jwtDecode} from "jwt-decode"

function MainLayout() {
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState({})
  const [dropdown, setDropdown] = useState(false)

  useEffect(() => {
    let token = localStorage.getItem('token')
    if (!token) {
      navigate('/')
    } else {
      setUserInfo(jwtDecode(token))
      console.log(userInfo)
    }
  }, []);

  const popupRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setDropdown(false);
      }
    }

    // Ajouter un écouteur d'événements au chargement du composant
    document.addEventListener('mousedown', handleClickOutside);

    // Nettoyage de l'écouteur d'événements lorsque le composant est démonté
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const deconnexion = () => {
    localStorage.clear()
    navigate('/')
  }

  return (
    <>
      <div
        className={'text-sm h-16 w-full fixed top-0 left-0 flex place-items-center justify-between px-4 border-b'}>
        <div className={'font-black text-xl'}>APP</div>
        <div
          onClick={() => setDropdown(!dropdown)}
          className={'relative transition-all duration-500 space-x-1 py-2 px-4 rounded-md cursor-pointer hover:bg-gray-100'}>
          <span>
          {userInfo.user_firstname}
          </span>
          <span>
          {userInfo.user_lastname}
          </span>
        </div>
      </div>
      <div className={'pt-16'}>
        <div className={'relative p-4'}>
          {dropdown &&
            <div ref={popupRef} className={'text-sm absolute top-2 right-4'}>
              <div className={'border rounded-md p-2 bg-white hover:bg-gray-100'}>
                <div onClick={deconnexion} className={'px-4 py-2 rounded-sm cursor-pointer'}>
                  Déconnexion
                </div>
              </div>
            </div>
          }
          <Outlet/>
        </div>
      </div>
    </>
  )
}

export default MainLayout