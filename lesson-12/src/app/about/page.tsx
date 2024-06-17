import Image from "next/image";
import Link from "next/link";

export default function About() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-r from-purple-500 to-blue-500">
            <h1 className="text-4xl font-bold mb-8">About Page</h1>
            <p className="text-lg mb-8">Go to <Link href="/" className="text-blue-600 hover:underline">Main</Link></p>
            <div className="mt-10">
                <Image
                    src="/next.svg"
                    alt="Next.js Logo"
                    width={180}
                    height={37}
                    priority
                />
            </div>
        </main>
    );
}
