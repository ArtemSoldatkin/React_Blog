import React, { memo } from 'react';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { EDIT_REVIEW, EditReview } from '../../../queries/review';
import { EDIT_ARTICLE, EditArticle } from '../../../queries/article';
import { DocType, InputData, inputDataEq } from '../../../types';
import ButtonWithConfirm from '../../../components/button-with-confirm';

interface CmpProps {
    id: string;
    type: DocType;
    inputData: InputData;
    complete: () => void;
}

const areEq = (pp: CmpProps, np: CmpProps) => {
    if (pp.id !== np.id) return false;
    if (pp.type !== np.type) return false;
    if (!inputDataEq(pp.inputData, np.inputData)) return false;
    if (pp.complete !== np.complete) return false;
    return true;
};

export default memo(({ id, type, inputData, complete }: CmpProps) => {
    if (type === 'Review')
        return (
            <EditReview mutation={EDIT_REVIEW}>
                {mtn => {
                    const save = () => {
                        const { body } = inputData;
                        mtn({ variables: { id, body } });
                    };
                    return <ButtonWithConfirm icon={faSave} text="Сохранить" fnc={save} />;
                }}
            </EditReview>
        );
    return (
        <EditArticle mutation={EDIT_ARTICLE} onCompleted={() => complete()}>
            {mtn => {
                const save = () => {
                    const { title, description, body } = inputData;
                    console.log('asd');
                    if (!title && !description) return;
                    console.log('asd 2');
                    mtn({ variables: { id, title, description, body } });
                };
                return <ButtonWithConfirm icon={faSave} text="Сохранить" fnc={save} />;
            }}
        </EditArticle>
    );
}, areEq);
