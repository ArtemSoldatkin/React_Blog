import React, {memo} from 'react'
import { ApolloError } from 'apollo-client';
import Info from '../info'

interface CmpProps {
    error: ApolloError | undefined
    data: any
    name: string
}

export default memo(({error, data, name}: CmpProps) => {
    if(error) return <Info type="error" /> 
    if(!data) return <></> 
    if(!data[name]) return <></>
    if(!data[name].message && data[name].status === null) return <Info type="error" /> 
    if(!data[name].status) return <Info type="error" message={data[name].message}/>
    return <Info type="success" message={data[name].message}/>
}) 
