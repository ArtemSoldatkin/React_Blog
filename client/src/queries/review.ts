import gql from 'graphql-tag';

export const ADD_REVIEW = gql`
    mutation AddReview($review: String!) {
        addReview(review: $review) {
            status
            message
            reviews
        }
    }
`
