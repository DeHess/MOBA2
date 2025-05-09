// MARK: - Board Detail View Placeholder

import SwiftUICore
struct BoardDetailView: View {
    let boardID: String

    var body: some View {
        Text("Board: /\(boardID)/")
            .font(.largeTitle)
            .navigationTitle("Board Detail")
    }
}
