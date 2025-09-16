"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Linkedin, Mail, ChevronUp, Github } from "lucide-react"

export default function Footer() {
    const [showTop, setShowTop] = useState(false)

    useEffect(() => {
        const handleScroll = () => setShowTop(window.scrollY > 300)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const POPULAR_SUBJECTS = [
        "Science",
        "History",
        "Romance",
        "Technology",
        "Art",
        "Fiction",
        "Fantasy",
        "Biography",
        "Poetry",
        "Travel",
        "Health",
        "Business",
    ]

    return (
        <footer className="bg-background border-t border-border mt-16">
            <div className="container px-4 sm:px-6 lg:px-8 pb-3 pt-5 max-w-7xl mx-auto">
                <div className="grid grid-cols-2 items-center md:grid-cols-4 gap-8">
                    {/* Logo + وصف */}
                    <div className="md:col-span-1">
                        <Link href="/" className="flex items-center gap-3">
                            <Image src="/favicon.ico" alt="BookVerse" width={40} height={40} />
                            <span className="font-serif text-xl font-bold text-foreground">
                                BookVerse
                            </span>
                        </Link>
                        <p className="mt-4 text-sm font-medium text-muted-foreground">
                            Simplified digital library — Discover books, categories, and
                            recommendations with a fast and simple experience.
                        </p>

                        <div className="flex items-center space-x-3 mt-4">
                            <a
                                href="https://github.com/your-username"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub"
                                className="p-2 rounded-md hover:bg-gray-100"
                            >
                                <Github className="h-5 w-5" />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/your-profile"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                                className="p-2 rounded-md hover:bg-gray-100"
                            >
                                <Linkedin className="h-5 w-5" />
                            </a>
                            <a
                                href="mailto:hello@yourdomain.com"
                                aria-label="Email"
                                className="p-2 rounded-md hover:bg-gray-100"
                            >
                                <Mail className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* روابط سريعة */}
                    <div>
                        <h4 className="font-bold text-foreground mb-3 text-xl">
                            Quick links
                        </h4>
                        <ul className="space-y-2 text-sm font-medium text-muted-foreground">
                            <li>
                                <Link href="/" className="hover:text-primary">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/books" className="hover:text-primary">
                                    Books
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-primary">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-primary">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* موارد */}
                    <div>
                        <h4 className="font-bold text-foreground mb-3 text-xl">
                            Resources
                        </h4>
                        <ul className="space-y-2 text-sm font-medium text-muted-foreground">
                            <li>
                                <a href="/sitemap.xml" className="hover:text-primary">
                                    Sitemap
                                </a>
                            </li>
                            <li>
                                <Link href="/privacy" className="hover:text-primary">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-primary">
                                    Terms
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* اشترك او تواصل */}
                    <div>
                        <h4 className="font-bold text-foreground mb-3 text-xl">
                            Categories
                        </h4>
                        <ul className="flex flex-col font-medium space-y-2 text-sm text-muted-foreground">
                            {POPULAR_SUBJECTS.sort(() => 0.5 - Math.random())
                                .slice(0, 4)
                                .map((subject) => (
                                    <li key={subject}>
                                        <Link
                                            href={`/books?subject=${encodeURIComponent(subject)}`}
                                            className="transition-colors hover:text-primary py-0"
                                        >
                                            {subject}
                                        </Link>
                                    </li>

                                ))}
                        </ul>
                    </div>

                </div>

                {/* خط فاصل ونص الحقوق */}
                <div className="mt-3 border-t border-border pt-3 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm font-medium text-muted-foreground">
                        © {new Date().getFullYear()} Ahmad Adham. All rights reserved.
                    </p>

                    <div className="flex items-center font-medium gap-4 text-sm text-muted-foreground">
                        <span>Made with Ahmad Adham · Next.js</span>
                        <Link href="/contact" className="hover:text-primary">
                            Support
                        </Link>
                    </div>
                </div>
            </div>

            {/* Back to top button */}
            {showTop && (
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    aria-label="Back to top"
                    className="fixed bottom-6 right-6 z-50 rounded-full p-3 bg-background border border-foreground/60 text-foreground shadow-lg hover:scale-105 transition"
                >
                    <ChevronUp className="h-5 w-5" />
                </button>
            )}
        </footer>
    )
}
