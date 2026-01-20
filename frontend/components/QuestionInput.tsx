import { FC } from "react";
import { UseFormRegister, UseFormWatch, useFieldArray, Control } from "react-hook-form";
import { TrashIcon } from '@heroicons/react/24/outline';

interface QuestionInputProps {
	index: number;
	register: UseFormRegister<any>;
	watch: UseFormWatch<any>;
	control: Control<any>;
	removeQuestion: () => void;
}

const QuestionInput: FC<QuestionInputProps> = ({ index, register, watch, control, removeQuestion }) => {
	const type = watch(`questions.${index}.type`);

	const { fields, append, remove } = useFieldArray({
		control,
		name: `questions.${index}.options`
	});

	return (
		<div className="border p-4 rounded-md mb-4 bg-white shadow-sm border-l-4 border-l-blue-500">
			<div className="flex justify-between items-center mb-4">
				<h3 className="font-bold text-gray-700">Question #{index + 1}</h3>
				<button type="button" className="text-red-500 hover:text-red-700 text-sm" onClick={removeQuestion}>
					<TrashIcon className="h-5 w-5" />
				</button>
			</div>

			<div className="space-y-3">
				<input
					{...register(`questions.${index}.text`, { required: "Question text is required" })}
					placeholder="Enter your question"
					className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
				/>

				<select {...register(`questions.${index}.type`)} className="w-full border rounded-md p-2">
					<option value="INPUT">Short Answer (Input)</option>
					<option value="BOOLEAN">True / False</option>
					<option value="CHECKBOX">Multiple Choice (Checkbox)</option>
				</select>
			</div>

			<div className="mt-4 p-3 bg-gray-50 rounded">
				{type === "INPUT" && (
					<input
						{...register(`questions.${index}.correctAnswer`, { required: true })}
						placeholder="Type the correct answer here..."
						className="w-full border rounded-md p-2"
					/>
				)}
				{type === "BOOLEAN" && (
					<div className="flex gap-6">
						<label className="flex items-center gap-2 cursor-pointer">
							<input type="radio" value="true" {...register(`questions.${index}.correctAnswer`)} />
							True
						</label>
						<label className="flex items-center gap-2 cursor-pointer">
							<input type="radio" value="false" {...register(`questions.${index}.correctAnswer`)} />
							False
						</label>
					</div>
				)}
				{type === "CHECKBOX" && (
					<div className="space-y-2">
						{fields.map((field, optIndex) => (
							<div key={field.id} className="flex items-center gap-2">
								<input
									type="checkbox"
									{...register(`questions.${index}.options.${optIndex}.isCorrect`)}
									className="w-4 h-4"
								/>
								<input
									{...register(`questions.${index}.options.${optIndex}.text`, { required: true })}
									placeholder={`Option ${optIndex + 1}`}
									className="border rounded-md p-1 flex-1 text-sm"
								/>
								<button
									type="button"
									onClick={() => remove(optIndex)}
									className="text-gray-400 hover:text-red-500"
								>
									&times;
								</button>
							</div>
						))}
						<button
							type="button"
							className="text-blue-500 text-sm font-medium mt-2"
							onClick={() => append({ text: "", isCorrect: false })}
						>
							+ Add Option
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default QuestionInput;