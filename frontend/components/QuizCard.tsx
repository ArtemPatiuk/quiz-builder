import Link from "next/link";
import { TrashIcon } from "@heroicons/react/24/solid";
interface QuizCardProps {
	id?: string;
	title: string;
	questionCount: number;
	onDelete?: () => void;
}

export default function QuizCard({ id, title, questionCount, onDelete }: QuizCardProps) {
	if (!id) return null;
	return (
		<Link href={`/quizzes/${id}`} className="block">
			<div className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between hover:scale-105 hover:shadow-2xl transition-transform duration-200 relative">
				<div>
					<h2 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h2>
					<p className="text-gray-600">{questionCount} questions</p>
				</div>

				{onDelete && (
					<button
						onClick={(e) => {
							e.preventDefault();
							onDelete();
						}}
						className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg font-medium transition"
					>
						<TrashIcon className='h-5 w-5' />
					</button>
				)}
			</div>
		</Link>
	);
}
