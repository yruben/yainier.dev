export const siteConfig = {
    name: "Yainier Martínez Ruben",
    domain: "yainier.com",
    twitterHandle: "@yainiermr",
    socials: [
        { name: "GitHub", url: "https://github.com/yruben" },
        { name: "LinkedIn", url: "https://www.linkedin.com/in/yainiermr" },
        { name: "YouTube", url: "https://youtube.com/@IngenieroDeExito" },
        { name: "Twitter", url: "https://twitter.com/yainiermr" },
    ],
} as const;

export type SocialName = typeof siteConfig.socials[number]['name'];
