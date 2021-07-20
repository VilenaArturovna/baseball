export const getFacilitiesQueryBody = `
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
