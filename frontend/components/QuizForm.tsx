import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import QuestionInput from "./QuestionInput";
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';
import { useState } from "react";
import { api } from "../services/api";

interface QuizFormValues {
	title: string;
	questions: {
		text: string;
		type: "INPUT" | "BOOLEAN" | "CHECKBOX";
		correctAnswer?: string;
		options?: { text: string; isCorrect: boolean }[];
	}[];
}

const QuizForm = () => {
	const [loading, setLoading] = useState(false);

	const { register, control, handleSubmit, watch, reset } = useForm<QuizFormValues>({
		defaultValues: {
			title: "",
			questions: [{ text: "", type: "INPUT" }]
		}
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: "questions"
	});

	const onSubmit: SubmitHandler<QuizFormValues> = async (data) => {
		setLoading(true);
		try {
			const formattedData = {
				title: data.title,
				questions: data.questions.map(q => ({
					...q,
					options: q.type === "CHECKBOX" ? q.options : undefined,
				}))
			};

			const response = await api.post("/quizzes", formattedData);

			console.log("Server Response:", response.data);
			reset();
		} catch (error: any) {
			console.error("Submission error:", error.response?.data || error.message);
			alert("Failed to save quiz. Check console for details.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl">
			<h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Create New Quiz</h1>

			<div className="mb-8">
				<label className="block text-sm font-medium text-gray-700 mb-1">Quiz Title</label>
				<input
					{...register("title", { required: "Title is required" })}
					className="w-full text-xl font-semibold border-b-2 border-gray-300 focus:border-blue-500 outline-none pb-1"
					placeholder="E.g. React Fundamentals"
				/>
			</div>

			<div className="space-y-4">
				{fields.map((field, index) => (
					<QuestionInput
						key={field.id}
						index={index}
						register={register}
						watch={watch}
						control={control}
						removeQuestion={() => remove(index)}
					/>
				))}
			</div>

			<div className="flex flex-col gap-4 mt-8">
				<button
					type="button"
					onClick={() => append({ text: "", type: "INPUT" })}
					className="w-full py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition font-medium"
				>
					+ Add New Question
				</button>

				<button
					type="submit"
					disabled={loading} 
					className={`w-full py-3 text-white rounded-md font-bold shadow-md transition flex items-center justify-center ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
						}`}
				>
					{loading ? (
						<div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
					) : (
						<CloudArrowUpIcon className="h-5 w-5 inline mr-2" />
					)}
					{loading ? "Publishing..." : "Save and Publish Quiz"}
				</button>
			</div>
		</form>
	);
};

export default QuizForm;