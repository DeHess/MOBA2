import SwiftUICore
import SwiftUI
import UIKit
import Foundation

struct ThreadRowView: View {
    let thread: Thread
    let boardID: String
    let themeManager: ThemeManager
    let screenWidth: CGFloat

    var body: some View {
        NavigationLink(destination: ThreadDetailView(threadID: thread.no, boardID: boardID)) {
            VStack(alignment: .leading, spacing: 8) {
                let decodedTitle = String(htmlEncodedString: thread.sub ?? "Untitled Thread")
                Text(decodedTitle ?? "UntitledThread")
                    .font(.headline)
                    .lineLimit(1)
                    .foregroundColor(themeManager.currentTheme.text)

                if let tim = thread.tim, let _ = thread.ext {
                    let thumbUrl = "https://i.4cdn.org/\(boardID)/\(tim)s.jpg"

                    AsyncImage(url: URL(string: thumbUrl)) { image in
                        image
                            .resizable()
                            .aspectRatio(contentMode: .fill)
                            .frame(width: screenWidth - 40, height: 200)
                            .clipped()
                            .cornerRadius(12)
                    } placeholder: {
                        Color.gray.opacity(0.3)
                            .frame(width: screenWidth - 40, height: 200)
                            .cornerRadius(12)
                    }
                }
            }
            .padding()
            .background(themeManager.currentTheme.cardBackground)
            .cornerRadius(12)
            .shadow(color: themeManager.currentTheme.border.opacity(0.2), radius: 4, x: 0, y: 2)
        }
    }
}


struct BoardDetailView: View {
    let boardID: String
    @StateObject private var viewModel = BoardDetailViewModel()
    @EnvironmentObject var themeManager: ThemeManager

    private let screenWidth = UIScreen.main.bounds.width

    var body: some View {
        ScrollView {
            LazyVStack(spacing: 20) {
                if viewModel.isLoading {
                    ProgressView("Loading...")
                        .foregroundColor(themeManager.currentTheme.text)
                        .padding(.top, 20)
                } else {
                    ForEach(viewModel.threads) { thread in
                        ThreadRowView(
                            thread: thread,
                            boardID: boardID,
                            themeManager: themeManager,
                            screenWidth: screenWidth
                        )
                    }
                }
            }
            .padding()
        }
        .navigationTitle("/\(boardID)/")
        .onAppear {
            viewModel.fetchCatalogue(for: boardID)
        }
        .background(themeManager.currentTheme.background.ignoresSafeArea())
    }

}

extension String {

    init?(htmlEncodedString: String) {
        guard let data = htmlEncodedString.data(using: .utf8) else {
            return nil
        }
        let options: [NSAttributedString.DocumentReadingOptionKey: Any] = [
            .documentType: NSAttributedString.DocumentType.html,
            .characterEncoding: String.Encoding.utf8.rawValue
        ]
        guard let attributedString = try? NSAttributedString(data: data, options: options, documentAttributes: nil) else {
            return nil
        }
        self.init(attributedString.string)
    }
}

