import Foundation

class BoardViewModel: ObservableObject {
    @Published var boards: [Board] = []
    @Published var isLoading = true

    func fetchBoards() {
        guard let url = URL(string: "https://a.4cdn.org/boards.json") else { return }
        URLSession.shared.dataTask(with: url) { data, _, error in
            DispatchQueue.main.async {
                self.isLoading = false
                if let data = data {
                    do {
                        let response = try JSONDecoder().decode(BoardsResponse.self, from: data)
                        self.boards = response.boards
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
