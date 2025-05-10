import SwiftUICore
import SwiftUI

struct PostCardView: View {
    let post: Post
    let boardID: String
    @EnvironmentObject var themeManager: ThemeManager

    var imageUrl: String? {
        guard let tim = post.tim, let ext = post.ext else { return nil }
        return "https://i.4cdn.org/\(boardID)/\(tim)\(ext)"
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            if let comment = post.com {
                if let decodedComment = String(htmlEncodedString: comment) {
                    Text(decodedComment)
                        .foregroundColor(themeManager.currentTheme.text)
                        .font(.body)
                }
            }

            if let imageUrl = imageUrl, let url = URL(string: imageUrl) {
                AsyncImage(url: url) { image in
                    image
                        .resizable()
                        .aspectRatio(contentMode: .fit)
                        .frame(maxWidth: .infinity)
                        .cornerRadius(8)
                        .padding(.top, 8)
                } placeholder: {
                    Color.gray.opacity(0.3)
                        .frame(height: 250)
                        .cornerRadius(8)
                        .padding(.top, 8)
                }
            }
        }
        .padding()
        .background(themeManager.currentTheme.cardBackground)
        .cornerRadius(8)
        .overlay(
            RoundedRectangle(cornerRadius: 8)
                .stroke(themeManager.currentTheme.border, lineWidth: 1)
        )
    }
}
