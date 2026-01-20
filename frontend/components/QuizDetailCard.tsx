interface Question {
	id: string;
	text: string;
	type: "BOOLEAN" | "INPUT" | "CHECKBOX";
	options?: any;
	correctAnswer?: string; 
}

interface QuizDetailCardProps {
	title: string;
	questions: Question[];
}

export default function QuizDetailCard({ title, questions }: QuizDetailCardProps) {
	return (
		<div className="bg-white p-6 rounded-xl shadow-lg space-y-6">
			<h1 className="text-3xl font-bold text-gray-900">{title}</h1>

			<div className="space-y-6">
				{questions.map((item, index) => {
					let parsedOptions: { text: string; isCorrect: boolean }[] = [];
					if (item.type === "CHECKBOX" && item.options) {
						try {
							parsedOptions = typeof item.options === 'string'
								? JSON.parse(item.options)
								: item.options;
						} catch (e) {
							console.error("Error parsing options", e);
						}
					}

					return (
						<div key={item.id || index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
							<p className="font-semibold text-gray-800 mb-2">
								{index + 1}. {item.text}
							</p>

							{item.type === "BOOLEAN" && (
								<div className="flex gap-4">
									<span className={`px-3 py-1 rounded-full border ${item.correctAnswer === "true" ? "bg-green-100 border-green-500 text-green-700 font-bold" : "bg-white border-gray-300 text-gray-500 opacity-60"}`}>
										True {item.correctAnswer === "true" && "✓"}
									</span>
									<span className={`px-3 py-1 rounded-full border ${item.correctAnswer === "false" ? "bg-green-100 border-green-500 text-green-700 font-bold" : "bg-white border-gray-300 text-gray-500 opacity-60"}`}>
										False {item.correctAnswer === "false" && "✓"}
									</span>
								</div>
							)}
							{item.type === "INPUT" && (
								<div className="mt-2">
									<p className="text-xs text-gray-500 mb-1">Correct answer:</p>
									<div className="p-2 border border-green-500 bg-green-50 text-green-700 rounded-lg font-medium">
										{item.correctAnswer || "No answer provided"}
									</div>
								</div>
							)}
							{item.type === "CHECKBOX" && parsedOptions.length > 0 && (
								<div className="flex flex-col gap-2 mt-2">
									{parsedOptions.map((option, optIndex) => (
										<div
											key={optIndex}
											className={`flex items-center gap-2 border px-3 py-2 rounded-lg ${option.isCorrect
													? "bg-green-50 border-green-500 ring-1 ring-green-500"
													: "bg-white border-gray-200 opacity-70"
												}`}
										>
											<input
												type="checkbox"
												checked={option.isCorrect}
												disabled
												className="w-4 h-4 accent-green-600"
											/>
											<span className={`text-sm ${option.isCorrect ? "text-green-800 font-bold" : "text-gray-600"}`}>
												{option.text}
											</span>
											{option.isCorrect && <span className="ml-auto text-green-600 text-xs font-bold">CORRECT</span>}
										</div>
									))}
								</div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}