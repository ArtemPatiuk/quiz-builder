
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-5">
      <h1 className="text-5xl font-bold text-gray-700 mb-6 text-center">
        Welcome to Quiz Builder
      </h1>
      <p className="text-lg text-gray-700 mb-12 text-center">
        Create quizzes, view all quizzes, or see quiz details.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <Link
          href="/create"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-6 px-8 rounded-lg text-center shadow-md transition"
        >
          Create Quiz
        </Link>

        <Link
          href="/quizzes"
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-6 px-8 rounded-lg text-center shadow-md transition"
        >
          View All Quizzes
        </Link>
      </div>
    </div>
  );
}
