import React, { memo } from 'react';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { IS_LOGGED_IN, IsLoggedIn } from '../../../queries/user';
import { DocType, InputData, inputDataEq } from '../../../types';
import ActionPopover from './popover';
import './style.scss';

interface CmpProps {
    id: string;
    type: DocType;
    userID: string;
    isEditing: boolean;
    inputData: InputData;
    setIsEditing: (isEditing: boolean) => void;
    articleID?: string;
}

const areEq = (pp: CmpProps, np: CmpProps) => {
    if (pp.id !== np.id) return false;
    if (pp.type !== np.type) return false;
    if (pp.userID !== np.userID) return false;
    if (pp.isEditing !== np.isEditing) return false;
    if (!inputDataEq(pp.inputData, np.inputData)) return false;
    if (pp.setIsEditing !== np.setIsEditing) return false;
    if (pp.articleID !== np.articleID) return false;
    return true;
};

export default memo(
    (props: CmpProps) => (
        <IsLoggedIn query={IS_LOGGED_IN}>
            {({ data }) => {
                if (data && data.user && data.user.id === props.userID) {
                    return (
                        <div className="acts">
                            <OverlayTrigger
                                trigger="click"
                                placement="left-start"
                                overlay={
                                    <Popover
                                        id={`${props.type}__${props.id}`}
                                        className="acts_pop"
                                        placement="left-start">
                                        <ActionPopover
                                            type={props.type}
                                            id={props.id}
                                            isEditing={props.isEditing}
                                            setIsEditing={props.setIsEditing}
                                            inputData={props.inputData}
                                            articleID={props.articleID}
                                        />
                                    </Popover>
                                }>
                                <span className="acts__btn">
                                    <FontAwesomeIcon icon={faEllipsisV} className="acts__icon" />
                                </span>
                            </OverlayTrigger>
                        </div>
                    );
                }
                return <></>;
            }}
        </IsLoggedIn>
    ),
    areEq
);
