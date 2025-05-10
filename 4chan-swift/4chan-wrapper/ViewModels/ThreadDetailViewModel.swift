import Foundation
class ThreadDetailViewModel: ObservableObject {
    @Published var posts: [Post] = []
    @Published var isLoading = true

    func fetchThread(threadID: Int, boardID: String) {
        guard let url = URL(string: "https://a.4cdn.org/\(boardID)/thread/\(threadID).json") else { return }
        URLSession.shared.dataTask(with: url) { data, _, error in
            DispatchQueue.main.async {
                self.isLoading = false
                if let data = data {
                    do {
                        let response = try JSONDecoder().decode(ThreadResponse.self, from: data)
                        self.posts = response.posts
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
