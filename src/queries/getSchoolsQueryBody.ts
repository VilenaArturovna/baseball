export const getSchoolsQueryBody = `
    query Schools($search:String!) 
    { schools(search: $search) {
        schools {
            id
            name
        }
    }
    }
`
