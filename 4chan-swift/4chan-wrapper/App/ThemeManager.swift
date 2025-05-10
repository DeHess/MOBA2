import Foundation
import SwiftUICore

class Theme: ObservableObject, Equatable {
    let background: Color
    let cardBackground: Color
    let text: Color
    let headerText: Color
    let border: Color

    init(background: Color, cardBackground: Color, text: Color, headerText: Color, border: Color) {
        self.background = background
        self.cardBackground = cardBackground
        self.text = text
        self.headerText = headerText
        self.border = border
    }

    static let light = Theme(
        background: Color.white,
        cardBackground: Color(.systemGray6),
        text: Color.black,
        headerText: Color.black,
        border: Color.gray
    )

    static let dark = Theme(
        background: Color.black,
        cardBackground: Color(.systemGray5),
        text: Color.black,
        headerText: Color.white,
        border: Color.gray
    )

    // Equatable Conformance
    static func == (lhs: Theme, rhs: Theme) -> Bool {
        lhs === rhs // Compare by reference
    }
}


class ThemeManager: ObservableObject {
    @Published var currentTheme: Theme = .light
}
