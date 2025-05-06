import SwiftUI

struct Album: Decodable, Identifiable {
    let collectionId: Int
    let collectionName: String
    let artworkUrl60: String
    var id: Int { collectionId }
}

struct AlbumResponse: Decodable {
    let results: [Album]
}

struct ContentView: View {
    @State private var albums: [Album] = []
    @State private var searchTerm: String = "Rolling Stones"

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
            .searchable(text: $searchTerm, prompt: "Search artist")
            .onSubmit(of: .search) {
                fetchAlbums(for: searchTerm)
            }
        }
        .onAppear {
            fetchAlbums(for: searchTerm)
        }
    }

    func fetchAlbums(for term: String) {
        guard let encoded = term.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed),
              let url = URL(string: "https://itunes.apple.com/search?term=\(encoded)&entity=album") else {
            print("Invalid search term or URL")
            return
        }

        let task = URLSession.shared.dataTask(with: url) { data, response, error in
            if let data = data {
                if let decoded = try? JSONDecoder().decode(AlbumResponse.self, from: data) {
                    DispatchQueue.main.async {
                        self.albums = decoded.results
                    }
                } else {
                    print("Decoding error")
                }
            } else if let error = error {
                print("Network error: \(error.localizedDescription)")
            }
        }
        task.resume()
    }
}
