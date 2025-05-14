struct Post: Identifiable, Decodable {
    var id: Int { no }
    let no: Int
    let com: String?
    let filename: String?
    let ext: String?
    let tim: UInt64?
}
