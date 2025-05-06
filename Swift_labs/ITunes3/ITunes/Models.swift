
struct Album: Decodable, Identifiable {
    let collectionId: Int
    let collectionName: String
    let artworkUrl60: String
    var id: Int { collectionId }
}

struct AlbumResponse: Decodable {
    let results: [Album]
}

struct AlbumDetailResponse: Decodable {
    let results: [AlbumItem]
    
    var albumInfo: AlbumItem? {
        results.first(where: { $0.wrapperType == "collection" })
    }
    
    var songs: [AlbumItem] {
        results.filter { $0.wrapperType == "track" }
    }
}

struct AlbumItem: Decodable, Identifiable {
    let wrapperType: String // "collection" or "track"
    
    let collectionId: Int?
    let trackId: Int?
    let trackName: String?
    let trackTimeMillis: Int?
    let trackNumber: Int?
    let releaseDate: String?

    var id: Int {
        trackId ?? collectionId ?? Int.random(in: 1..<100000)
    }

    var formattedDuration: String {
        guard let millis = trackTimeMillis else { return "-" }
        let totalSeconds = millis / 1000
        let minutes = totalSeconds / 60
        let seconds = totalSeconds % 60
        return String(format: "%d:%02d", minutes, seconds)
    }
}
