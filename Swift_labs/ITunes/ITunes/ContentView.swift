import SwiftUI

struct Album: Decodable, Identifiable {
    let collectionName: String
    let artworkUrl60: String
    var id: String { collectionName }
}
struct AlbumResponse: Decodable {
    let results: [Album]
}


struct ContentView: View {
    @State private var albums: [Album] = []

    var body: some View {
        NavigationView {
            List(albums) { album in
                HStack {
                    AsyncImage(url: URL(string: album.artworkUrl60)) { image in
                        image.resizable()
                    } placeholder: {
                        ProgressView()
                    }
                    .frame(width: 60, height: 60)
                    .clipShape(RoundedRectangle(cornerRadius: 8))

                    Text(album.collectionName)
                        .font(.body)
                        .foregroundColor(.primary)
                }
                .padding(.vertical, 4)
            }
            .navigationTitle("iTunes Albums")
        }
        .onAppear(perform: loadAlbums)
    }

    func loadAlbums() {
        if let url = Bundle.main.url(forResource: "stones", withExtension: "json") {
            do {
                let data = try Data(contentsOf: url)
                let decoded = try JSONDecoder().decode(AlbumResponse.self, from: data)
                albums = decoded.results
            } catch {
                print("JSON load error:", error)
            }
        } else {
            print("stones.json not found in bundle.")
        }
    }


}
