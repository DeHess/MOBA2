struct Thread: Identifiable, Decodable {
    var id: Int { no }
    let no: Int
    let sub: String?
    let filename: String?
    let ext: String?
    let tim: UInt64?
}
struct ThreadResponse: Decodable {
    let posts: [Post]
}
