import React, {memo} from 'react'
import { ApolloError } from 'apollo-client';
import Info from '../info'

interface CmpProps {
    error: ApolloError | undefined
    data?: any
    name?: string
}

export default memo(({error, data, name}: CmpProps) => {    
    if(error){
        const { graphQLErrors } = error
        if(graphQLErrors.length > 0) return <Info type="error" message={graphQLErrors[0].message} /> 
        return <Info type="error" message="Проблемы с сервером, попробуйте позже!"/>
    }
    if(data && name && data[name]) return <Info type="success" message="Успешно!"/>
    return <></>
}) 
