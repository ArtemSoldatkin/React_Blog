import React , {PureComponent} from 'react'
import { Query } from 'react-apollo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import {User} from '../../../../types'
import UserAvatar from '../../../../components/user-avatar'
import {IS_LOGGED_IN} from '../../../../queries/user'
import {maxFileSize} from '../../../../constants'

interface CmpProps {
   loading?: boolean
   onChange?: (image: string) => void
}
interface CmpStates {
    avatar: string | undefined
    errors: string  | undefined
}

export default class AvatarLoader extends PureComponent<CmpProps, CmpStates> {
    constructor(props: CmpProps){
        super(props)
        this.state = {avatar: undefined, errors: undefined}
    }
    private readFileAsync = (file: File): Promise<any> => {
        return new Promise((resolve, reject) => {
          let reader = new FileReader();      
          reader.onload = () => resolve(reader.result) 
          reader.onerror = reject;      
          reader.readAsDataURL(file);
        })
      } 
      private handleChangeFile = async(e: React.ChangeEvent<HTMLInputElement>) => {
        try {
          const file = e.target && e.target.files && e.target.files[0]
          if(!file) return this.setState({errors: 'Файл не выбран!'})
          if(file.size > maxFileSize) return this.setState({errors:'Файл слишком большой!'})      
          let newImage = await this.readFileAsync(file);
          if(!newImage) return this.setState({errors:'Ошибка, попробуйте снова!'}) 
          this.setState({errors: undefined, avatar: newImage})         
          this.props.onChange && this.props.onChange(newImage)  
        } catch(err) {
            return this.setState({errors:'Ошибка, попробуйте снова!'})
        }      
      }
    render () {
        const {avatar, errors} = this.state
        const {loading} = this.props
        return (
            <Query query={IS_LOGGED_IN}>
                {({ data }) => {           
                  let user:User = data && data.user  ?  JSON.parse(data.user)  : undefined     
                  if(avatar)user.avatar = avatar           
                  return (
                    <div className="avatar_loader">     
                        <p className="title">Аватар</p> 
                        <div className={`upload ${errors && 'upload-error'}`}>                        
                            <UserAvatar user={user} /> 
                            <div className="actions">
                                <p className="icon">
                                    <FontAwesomeIcon icon={faPlus} />
                                </p>
                            </div> 
                            <input className="input" type="file" accept=".png, .jpg, .jpeg" 
                            draggable onChange={this.handleChangeFile} disabled={loading}/>                        
                        </div>
                        <p className="warning">Максимальный размер: {Math.trunc(maxFileSize / 1024)} KB</p>  
                        {errors && <p className="errors">{errors}</p>}
                    </div>
                  )
                }}
            </Query> 
        )
    }
}
