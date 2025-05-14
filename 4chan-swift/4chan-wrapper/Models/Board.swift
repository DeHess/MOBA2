struct Board: Identifiable, Decodable {
    var id: String { board }
    let board: String
    let title: String
}

struct BoardsResponse: Decodable {
    let boards: [Board]
}
