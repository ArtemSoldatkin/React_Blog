import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Votes } from '../types';

export const createID = (id: string, type: string) => `${type}:${id}`;

export const VotesFR_A = gql`
    fragment VOTE_A on Article {
        votes {
            userID
            value
        }
    }
`;
export const VotesFR_R = gql`
    fragment VOTE_R on Review {
        votes {
            userID
            value
        }
    }
`;
interface ServerResponse {
    message: string;
    success: boolean;
    votes: Votes;
}
export interface T_SetVote {
    setVoteReview?: ServerResponse;
    setVoteArticle?: ServerResponse;
}
export class SetVote extends Mutation<T_SetVote> {}
