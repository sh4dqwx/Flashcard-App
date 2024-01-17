import { FC } from "react"
import { AddFlashcardDTO } from "../classes/Flashcard"
import { SubmitHandler, useForm } from "react-hook-form"
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import DialogButtonsComponent from "../components/DialogButtonsComponent"

type AddFlashcardDialogProps = {
    open: boolean,
    onSubmit: (data: AddFlashcardDTO) => void,
    onCancel: () => void
}

export const AddFlashcardDialog: FC<AddFlashcardDialogProps> = ({ open, onSubmit, onCancel }) => {
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<AddFlashcardDTO>({
        defaultValues: {
            "type": "answer"
        }
    })

    const type = watch("type")

    const onSubmitHandler: SubmitHandler<AddFlashcardDTO> = (data: AddFlashcardDTO) => {
        onSubmit(data)
        reset()
    }

    return (
        <Dialog open={open}>
            <DialogTitle>Dodaj fiszkę</DialogTitle>
            <DialogContent>
                <form id="add-flashcard-form" onSubmit={handleSubmit(onSubmitHandler)}>
                    <label>
                        Rodzaj:
                        <select {...register("type")}>
                            <option value="answer" selected>Odpowiedź</option>
                            <option value="trueFalse">Prawda/Fałsz</option>
                        </select>
                    </label><br />
                    <label>
                        Pytanie:
                        <input {...register("question", { required: true })} />
                        {errors.question && <span>Wymagane pole</span>}
                    </label><br />
                    {type === "answer" && (
                        <label>
                            Odpowiedź:
                            <input {...register("answer", { required: type === "answer" })} />
                            {errors.question && <span>Wymagane pole</span>}
                        </label>
                    )}
                    {type === "trueFalse" && (
                        <>
                            <label>Odpowiedź:</label>
                            <label><input {...register("trueFalseAnswer")} type="radio" name="trueFalseAnswer" /> Prawda</label>
                            <label><input {...register("trueFalseAnswer")} type="radio" name="trueFalseAnswer" /> Fałsz</label>
                        </>
                    )}
                </form>
            </DialogContent>
            <DialogActions>
                <DialogButtonsComponent formId="add-flashcard-form" onCancelClick={onCancel} />
            </DialogActions>
        </Dialog>
    )
}