export const getTeamsQueryBody = `
    query Teams($search:String!)
    { teams(search: $search) {
        teams {
            id
            name
        }
    }
    }
`
