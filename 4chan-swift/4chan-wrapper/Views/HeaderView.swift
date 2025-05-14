import SwiftUICore
import SwiftUI

struct HeaderView: View {
    @EnvironmentObject var themeManager: ThemeManager

    var body: some View {
        HStack {
            Spacer()
            Text("4chan Boards")
                .font(.title2)
                .fontWeight(.bold)
                .foregroundColor(themeManager.currentTheme.headerText)
            Spacer()
            Button(action: {
                // Example toggle between themes
                withAnimation {
                    themeManager.currentTheme = (themeManager.currentTheme == .light) ? .dark : .light
                }
            }) {
                Image(systemName: "gearshape")
                    .resizable()
                    .frame(width: 24, height: 24)
                    .foregroundColor(themeManager.currentTheme.text)
            }
        }
        .padding()
        .background(themeManager.currentTheme.cardBackground)
        .shadow(color: themeManager.currentTheme.border.opacity(0.2), radius: 4, x: 0, y: 2)
    }
}
