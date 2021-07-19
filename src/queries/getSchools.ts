import {gql} from "@apollo/client";

export const getSchools = gql`
    query Schools($search:String!) 
    { schools(search: $search) {
        schools {
            id
            name
        }
    }
    }
`
