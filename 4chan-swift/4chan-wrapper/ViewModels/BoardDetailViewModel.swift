import Foundation

class BoardDetailViewModel: ObservableObject {
    @Published var threads: [Thread] = []
    @Published var isLoading = true

    func fetchCatalogue(for boardID: String) {
        guard let url = URL(string: "https://a.4cdn.org/\(boardID)/catalog.json") else { return }
        URLSession.shared.dataTask(with: url) { data, _, error in
            DispatchQueue.main.async {
                self.isLoading = false
                if let data = data {
                    do {
                        let pages = try JSONDecoder().decode([Page].self, from: data)
                        self.threads = pages.flatMap { $0.threads }
                    } catch {
                        print("Decoding error: \(error.localizedDescription)")
                    }
                } else if let error = error {
                    print("Fetch error: \(error.localizedDescription)")
                }
            }
        }.resume()
    }
}
