import React, { memo } from 'react';
import { ApolloError } from 'apollo-client';
import Info from '../info';

interface CmpProps {
    error: ApolloError | undefined;
    data?: any;
}

const areEq = (pp: CmpProps, np: CmpProps) => {
    if (pp.error === undefined && np.error !== undefined) return false;
    if (pp.error !== undefined && np.error === undefined) return false;
    if (pp.data === undefined && np.data !== undefined) return false;
    if (pp.data !== undefined && np.data === undefined) return false;
    if (pp.error && np.error) {
        if (pp.error.graphQLErrors.length > 0 && np.error.graphQLErrors.length > 0) {
            if (pp.error.graphQLErrors[0].message !== np.error.graphQLErrors[0].message)
                return false;
        }
        if (pp.error.graphQLErrors.length > 0 && np.error.graphQLErrors.length === 0) return false;
        if (pp.error.graphQLErrors.length === 0 && np.error.graphQLErrors.length > 0) return false;
    }
    if (pp.data && np.data && pp.data.success !== np.data.success) return false;
    return true;
};

export default memo(({ error, data }: CmpProps) => {
    if (error) {
        const { graphQLErrors } = error;
        if (graphQLErrors.length > 0)
            return <Info type="error" message={graphQLErrors[0].message} />;
        return <Info type="error" message="Проблемы с сервером, попробуйте позже!" />;
    }
    if (data && data.success) return <Info type="success" message="Успешно!" />;
    return <></>;
}, areEq);
