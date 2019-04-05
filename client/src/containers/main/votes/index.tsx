import React, { memo } from 'react';
import { createID, VotesFR_A, VotesFR_R, SetVote, T_SetVote } from '../../../queries';
import { SET_VOTE_ARTICLE } from '../../../queries/article';
import { SET_VOTE_REVIEW } from '../../../queries/review';
import { DocType, Votes, votesEq } from '../../../types';
import VoteCard from './card';
import './style.scss';

interface CmpProps {
    id: string;
    type: DocType;
    votes: Votes;
}

const areEq = (pp: CmpProps, np: CmpProps) => {
    if (pp.id !== np.id || pp.type !== np.type || !votesEq(pp.votes, np.votes)) return false;
    return true;
};

export default memo(({ id: _id, type, votes }: CmpProps) => {
    const getVotes = (data: T_SetVote | undefined) => {
        if (!data) return null;
        const _t = `setVote${type}`;
        if (_t === 'setVoteReview' || _t === 'setVoteArticle') {
            const _v = data && data[_t];
            if (_v && _v.votes) return _v.votes;
        }
        return null;
    };
    return (
        <SetVote
            mutation={type === 'Article' ? SET_VOTE_ARTICLE : SET_VOTE_REVIEW}
            update={(cache, { data }) => {
                const _votes = getVotes(data);
                if (_votes) {
                    const id = createID(_id, type);
                    const fragment = type === 'Article' ? VotesFR_A : VotesFR_R;
                    const _f = cache.readFragment({ id, fragment });
                    cache.writeFragment({
                        id,
                        fragment,
                        data: { _f, votes: _votes, __typename: type },
                    });
                }
            }}>
            {fnc => <VoteCard votes={votes} mtn={fnc} id={_id} />}
        </SetVote>
    );
}, areEq);
