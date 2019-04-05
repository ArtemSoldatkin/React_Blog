import React, { memo } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { GetArticles, GET_ARTICLES } from '../../../queries/article';
import { User, userEq } from '../../../types';
import Loading from '../../../components/loading';
import ErrorHandler from '../../../components/error-handler';
import Article from './article';
import './style.scss';

interface PathParamsType {
    id: string;
}
interface CmpProps extends RouteComponentProps<PathParamsType> {
    user?: User;
}

const areEq = (pp: CmpProps, np: CmpProps) => {
    if (pp.user !== undefined && np.user === undefined) return false;
    if (pp.user === undefined && np.user !== undefined) return false;
    if (pp.user && np.user && !userEq(pp.user, np.user)) return false;
    if (pp.match.params.id !== np.match.params.id) return false;
    return true;
};

export default withRouter(
    memo(
        (props: CmpProps) => (
            <div className="articles">
                <GetArticles
                    query={GET_ARTICLES}
                    variables={{
                        user: props.user && props.user.id ? props.user.id : props.match.params.id,
                    }}
                    fetchPolicy="cache-and-network">
                    {({ data, loading, error }) => {
                        if (loading) return <Loading loading={true} />;
                        if (data && data.getArticles && data.getArticles.articles) {
                            const { articles } = data.getArticles;
                            return (
                                <>
                                    {articles.map((article, index) => (
                                        <Article
                                            key={`${Date.now()}/${article.id}/${index}`}
                                            article={article}
                                        />
                                    ))}
                                </>
                            );
                        }
                        return <ErrorHandler error={error} />;
                    }}
                </GetArticles>
            </div>
        ),
        areEq
    )
);
