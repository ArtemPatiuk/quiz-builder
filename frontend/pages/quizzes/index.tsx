"use client";

import { useEffect, useState } from "react";
import { api } from "../../services/api";
import QuizCard from "../../components/QuizCard";

interface Quiz {
	id: string;
	title: string;
	_count: {
		questions: number;
	};
}

export default function QuizzesList() {
	const [quizzes, setQuizzes] = useState<Quiz[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchQuizzes = async () => {
			try {
				const res = await api.get("/quizzes");
				setQuizzes(res.data);
			} catch (err) {
				setError("Failed to fetch quizzes");
			} finally {
				setLoading(false);
			}
		};

		fetchQuizzes();
	}, []);

	const handleDelete = async (id: string) => {
		try {
			await api.delete(`/quizzes/${id}`);
			setQuizzes(quizzes.filter((q) => q.id !== id));
		} catch (err) {
			alert("Failed to delete quiz");
		}
	};

	if (loading) return <p className="text-center mt-8">Loading quizzes...</p>;
	if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;
	if (quizzes.length === 0) return <p className="text-center mt-8">No quizzes found</p>;

	return (
		<div className="max-w-5xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
			{quizzes.map((quiz) => (
				<QuizCard
					key={quiz.id}
					id={quiz.id}
					title={quiz.title}
					questionCount={quiz._count.questions}
					onDelete={() => handleDelete(quiz.id)}
				/>
				
			))}
		</div>
	);
}
