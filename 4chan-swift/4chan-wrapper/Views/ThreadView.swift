import SwiftUICore
import SwiftUI

struct ThreadDetailView: View {
    let threadID: Int
    let boardID: String
    @StateObject private var viewModel = ThreadDetailViewModel()
    @EnvironmentObject var themeManager: ThemeManager

    var body: some View {
        ScrollView {
            LazyVStack(spacing: 12) {
                if viewModel.isLoading {
                    ProgressView("Loading...")
                        .foregroundColor(themeManager.currentTheme.text)
                        .padding(.top, 20)
                } else {
                    ForEach(viewModel.posts) { post in
                        PostCardView(post: post, boardID: boardID)
                            .environmentObject(themeManager)
                    }
                }
            }
            .padding()
        }
        .navigationTitle("Thread \(threadID)")
        .background(themeManager.currentTheme.background.ignoresSafeArea())
        .onAppear {
            viewModel.fetchThread(threadID: threadID, boardID: boardID)
        }
    }
}
