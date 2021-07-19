import {gql} from "@apollo/client";

export const getTeams = gql`
    query Teams($search:String!)
    { teams(search: $search) {
        teams {
            id
            name
        }
    }
    }
`
