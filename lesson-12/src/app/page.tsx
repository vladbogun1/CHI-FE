import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-r from-blue-500 to-purple-500">
            <h1 className="text-4xl font-bold text-white mb-8">Main Page</h1>
            <p className="text-lg text-white mb-8">Go to <Link href="/about" className="text-blue-200 hover:underline">About</Link></p>
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
