//
//  _chan_wrapperApp.swift
//  4chan-wrapper
//
//  Created by Lokaladmin on 09.05.2025.
//

import SwiftUI

@main
struct _chan_wrapperApp: App {
    var body: some Scene {
        WindowGroup {
            BoardScreen()
                .environmentObject(ThemeManager())
        }
    }
}
