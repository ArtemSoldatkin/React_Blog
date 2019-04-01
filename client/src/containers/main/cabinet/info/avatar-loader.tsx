import React, {memo, useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import {IS_LOGGED_IN, IsLoggedIn} from '../../../../queries/user'
import {maxFileSize} from '../../../../constants'
import UserAvatar from '../../../../components/user-avatar'

interface CmpProps {
  loading?: boolean
  onChange?: (image: string) => void
}

export default memo((props: CmpProps) => {
  const [avatar, setAvatar] = useState<string | undefined>(undefined)
  const [err, setErr] = useState<string | undefined>(undefined)
  useEffect(() => {
    if(props.onChange && avatar)props.onChange(avatar)
  }, [avatar])
  const readFileAsync = (file: File): Promise<any> => new Promise((resolve, reject) => {
      const reader = new FileReader();      
      reader.onload = () => resolve(reader.result) 
      reader.onerror = reject;      
      reader.readAsDataURL(file);
  })

  const handleChangeFile = async(e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target && e.target.files && e.target.files[0]
      if(!file) return setErr('Файл не выбран!')
      if(file.size > maxFileSize) return setErr('Файл слишком большой!')      
      let newImage = await readFileAsync(file);
      if(!newImage) return setErr('Ошибка, попробуйте снова!') 
      setErr(undefined)
      setAvatar(newImage)     
    } catch(err) {
        return setErr('Ошибка, попробуйте снова!')
    }      
  }
  return (
    <IsLoggedIn query = {IS_LOGGED_IN}>
      {({ data }) => {      
        let user = data && data.user ? data.user : undefined   
        if(!user) return <></>             
        return (
                    <div className="avatar_loader">     
                        <p className="avatar_loader__t">Аватар</p> 
                        <div className={`avatar_loader__upload ${err && 'avatar_loader-err'}`}>                        
                            <UserAvatar user={{id: user.id, login: user.login, avatar: avatar ? avatar : user.avatar}} /> 
                            <div className="avatar_loader__act">
                                <p className="avatar_loader__icon">
                                    <FontAwesomeIcon icon={faPlus} />
                                </p>
                            </div> 
                            <input className="avatar_loader__file" type="file" accept=".png, .jpg, .jpeg" 
                            draggable onChange={handleChangeFile} disabled={props.loading}/>                        
                        </div>
                        <p className="avatar_loader__warn">Максимальный размер: {Math.trunc(maxFileSize / 1024)} KB</p>  
                        {err && <p className="avatar_loader__err">{err}</p>}
                    </div>
          )
        }}
    </IsLoggedIn> 
  )
})
