import SwiftUICore
import SwiftUI
struct AlbumDetailView: View {
    let album: Album
    @State private var tracks: [AlbumItem] = []
    @State private var releaseYear: String = ""

    var body: some View {
        ScrollView {
            VStack(spacing: 16) {
                AsyncImage(url: URL(string: album.artworkUrl60.replacing("60x60bb", with: "600x600bb"))) { image in
                    image.resizable()
                } placeholder: {
                    ProgressView()
                }
                .frame(width: 300, height: 300)
                .clipShape(RoundedRectangle(cornerRadius: 12))

                Text(album.collectionName)
                    .font(.title)
                    .bold()
                    .multilineTextAlignment(.center)

                Text(releaseYear)
                    .foregroundColor(.secondary)
                    .font(.subheadline)

                ForEach(tracks.indices, id: \.self) { i in
                    let track = tracks[i]
                    HStack {
                        Text("\(i + 1). \(track.trackName ?? "Unknown")")
                            .frame(maxWidth: .infinity, alignment: .leading)
                        Text(track.formattedDuration)
                            .monospacedDigit()
                    }
                    .padding(.horizontal)
                }
            }
            .padding()
        }
        .navigationTitle("Music Search")
        .navigationBarTitleDisplayMode(.inline)
        .onAppear {
            fetchAlbumDetails()
        }
    }

    func fetchAlbumDetails() {
        print("fetching detail")
        guard let url = URL(string: "https://itunes.apple.com/lookup?id=\(album.collectionId)&entity=song") else { return }

        URLSession.shared.dataTask(with: url) { data, _, error in
            if let data = data {
                if let decoded = try? JSONDecoder().decode(AlbumDetailResponse.self, from: data) {
                    DispatchQueue.main.async {
                        self.tracks = decoded.songs
                        if let releaseDate = decoded.albumInfo?.releaseDate {
                            self.releaseYear = String(releaseDate.prefix(4))
                        }
                    }
                }
            }
        }.resume()
    }
}
