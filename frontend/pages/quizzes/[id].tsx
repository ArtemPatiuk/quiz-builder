"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import QuizDetailCard from "../../components/QuizDetailCard";

interface Question {
	id: string;
	text: string;
	type: "BOOLEAN" | "INPUT" | "CHECKBOX";
	options?: string | null;
}

interface Quiz {
	id: string;
	title: string;
	questions: Question[];
}

export default function QuizPage() {
	const router = useRouter();
	const { id } = router.query;

	const [quiz, setQuiz] = useState<Quiz | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		if (!id) return;

		const fetchQuiz = async () => {
			try {
				const res = await api.get(`/quizzes/${id}`);
				setQuiz(res.data);
			} catch (err) {
				console.error(err);
				setError("Failed to fetch quiz");
			} finally {
				setLoading(false);
			}
		};

		fetchQuiz();
	}, [id]);

	if (loading) return <p className="text-center mt-8">Loading quiz...</p>;
	if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;
	if (!quiz) return <p className="text-center mt-8">Quiz not found</p>;

	return (
		<div className="max-w-3xl mx-auto p-6">
			<QuizDetailCard title={quiz.title} questions={quiz.questions} />
		</div>
	);
}
