import SwiftUICore
import SwiftUI

struct BoardScreen: View {
    @StateObject private var viewModel = BoardViewModel()
    @EnvironmentObject var themeManager: ThemeManager

    var body: some View {
        NavigationStack {
            ZStack {
                themeManager.currentTheme.background
                    .ignoresSafeArea()

                VStack {
                    HeaderView()
                        .environmentObject(themeManager)

                    if viewModel.isLoading {
                        Text("Loading...")
                            .foregroundColor(themeManager.currentTheme.text)
                            .padding(.top, 20)
                    } else {
                        ScrollView {
                            LazyVStack(spacing: 10) {
                                ForEach(viewModel.boards) { board in
                                    NavigationLink(destination: BoardDetailView(boardID: board.board)) {
                                        Text(board.title)
                                            .font(.headline)
                                            .foregroundColor(themeManager.currentTheme.text)
                                            .padding()
                                            .frame(maxWidth: .infinity)
                                            .background(themeManager.currentTheme.cardBackground)
                                            .cornerRadius(8)
                                            .shadow(color: themeManager.currentTheme.border.opacity(0.2), radius: 2, x: 0, y: 2)
                                    }
                                }
                            }
                            .padding()
                        }
                    }
                }
            }
            .onAppear {
                viewModel.fetchBoards()
            }
        }
    }
}
