export const contactInfo = {
  email: "dev.moyenislam@gmail.com",
  phone: "+880 1308 989743",
  phoneHref: "tel:+8801308989743",
  location: "Dhaka, Bangladesh",
} as const

export const socialLinks: { href: string; label: string }[] = [
  { href: "https://github.com/moyen90", label: "GitHub" },
  { href: "https://www.linkedin.com/in/moyenul-islam-675204211/", label: "LinkedIn" },
  { href: "https://x.com/moyen900", label: "X" },
]

export function buildContactMailto(name: string, email: string, subject: string, message: string) {
  return `mailto:${contactInfo.email}?subject=${encodeURIComponent(`Portfolio Contact: ${subject}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`
}
