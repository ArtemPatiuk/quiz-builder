interface Question {
	id: string;
	text: string;
	type: "BOOLEAN" | "INPUT" | "CHECKBOX";
	options?: string | null; // для checkbox зберігається JSON
}

interface QuizDetailCardProps {
	title: string;
	questions: Question[];
}

export default function QuizDetailCard({ title, questions }: QuizDetailCardProps) {
	return (
		<div className="bg-white p-6 rounded-xl shadow-lg space-y-6">
			<h1 className="text-3xl font-bold text-gray-900">{title}</h1>
			<div className="space-y-4">
				{questions.map((item, index) => (
					<div key={item.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
						<p className="font-semibold text-gray-800 mb-2">
							{index + 1}. {item.text}
						</p>
						{item.type === "BOOLEAN" && (
							<div className="flex gap-4">
								<span className="bg-gray-200 px-3 py-1 rounded-full text-gray-700">True</span>
								<span className="bg-gray-200 px-3 py-1 rounded-full text-gray-700">False</span>
							</div>
						)}
						{item.type === "INPUT" && (
							<input
								type="text"
								disabled
								placeholder="Short answer"
								className="w-full mt-2 p-2 border border-gray-300 rounded-lg bg-gray-100"
							/>
						)}
						{item.type === "CHECKBOX" && item.options && (
							<div className="flex flex-col gap-2 mt-2">
								{JSON.parse(item.options).map((option: string, id: number) => (
									<label key={id} className="flex items-center gap-2 bg-gray-200 px-3 py-1 rounded-lg">
										<input type="checkbox" disabled />
										{option}
									</label>
								))}
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}