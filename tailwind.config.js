export default {
    darkMode: "class",
    content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // LIGHT THEME PALETTE
                "background": "#F8F9FA",
                "on-background": "#1A1C19",
                "surface": "#F8F9FA",
                "on-surface": "#1A1C19",
                "surface-variant": "#E7E0D6",
                "on-surface-variant": "#4A473F",
                "surface-card": "#FFFFFF",
                "surface-container": "#F3F4F6",
                "surface-container-high": "#E5E7EB",
                "surface-container-highest": "#D1D5DB",
                "surface-container-low": "#F9FAFB",
                "surface-container-lowest": "#FFFFFF",
                "surface-dim": "#D1D5DB",
                "surface-bright": "#FFFFFF",
                "outline": "#7A7768",
                "outline-variant": "#CCC6B7",
                
                // BRAND GOLD (from Master Rizal)
                "primary": "#F5B800",
                "on-primary": "#000000",
                "primary-container": "#FFDF9E", // Light Gold container
                "on-primary-container": "#4A3600",
                
                // Keep the button primary yellow as it was
                "primary-container": "#FFC107", 
                "text-on-primary": "#000000",
                
                "secondary": "#6C757D",
                "on-secondary": "#FFFFFF",
                "secondary-container": "#E9ECEF",
                "on-secondary-container": "#1E232A",
                
                "tertiary": "#4B5563",
                "on-tertiary": "#FFFFFF",
                "tertiary-container": "#E5E7EB",
                "on-tertiary-container": "#1F2937",
                
                "error": "#BA1A1A",
                "on-error": "#FFFFFF",
                "error-container": "#FFDAD6",
                "on-error-container": "#410002",
                
                "text-muted": "#6B7280",
                "inverse-surface": "#313033",
                "inverse-on-surface": "#F4F0EF",
                "inverse-primary": "#F5B800",
            },
            borderRadius: {
                "DEFAULT": "0.25rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "full": "9999px"
            },
            spacing: {
                "stack-md": "1rem",
                "section-padding": "2rem",
                "stack-sm": "0.5rem",
                "card-gap": "1.25rem",
                "container-margin": "1rem"
            },
            fontFamily: {
                sans: ['"Plus Jakarta Sans"', "sans-serif"],
                "title-sm": ["Plus Jakarta Sans", "sans-serif"],
                "headline-md": ["Plus Jakarta Sans", "sans-serif"],
                "display-lg-mobile": ["Plus Jakarta Sans", "sans-serif"],
                "label-caps": ["Plus Jakarta Sans", "sans-serif"],
                "body-md": ["Plus Jakarta Sans", "sans-serif"],
                "display-lg": ["Plus Jakarta Sans", "sans-serif"]
            },
            fontSize: {
                "title-sm": ["16px", { lineHeight: "24px", fontWeight: "600" }],
                "headline-md": ["20px", { lineHeight: "28px", fontWeight: "700" }],
                "display-lg-mobile": ["26px", { lineHeight: "32px", letterSpacing: "-0.01em", fontWeight: "800" }],
                "label-caps": ["12px", { lineHeight: "16px", letterSpacing: "0.05em", fontWeight: "700" }],
                "body-md": ["14px", { lineHeight: "20px", fontWeight: "400" }],
                "display-lg": ["32px", { lineHeight: "40px", letterSpacing: "-0.02em", fontWeight: "800" }]
            }
        }
    },
    plugins: [],
}
