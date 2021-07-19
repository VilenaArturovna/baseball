import {gql} from "@apollo/client";

export const getFacilities = gql`
    query Facilities($search:String!)
    { facilities(search: $search) {
        facilities {
            id
            email
            u_name
        }
    }
    }
`
