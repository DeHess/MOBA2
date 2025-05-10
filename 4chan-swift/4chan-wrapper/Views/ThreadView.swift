import SwiftUICore

struct ThreadDetailView: View {
    let threadID: Int
    let boardID: String

    var body: some View {
        Text("Thread \(threadID) on /\(boardID)/")
            .navigationTitle("Thread Detail")
    }
}
