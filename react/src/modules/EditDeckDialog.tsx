import { FC } from "react"
import { EditDeckDTO } from "../classes/Deck"
import { SubmitHandler, useForm } from "react-hook-form"
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import DialogButtonsComponent from "../components/DialogButtonsComponent"

type EditDeckDialogProps = {
    open: boolean,
    prevData: EditDeckDTO,
    onSubmit: (data: EditDeckDTO) => void,
    onCancel: () => void
}

export const EditDeckDialog: FC<EditDeckDialogProps> = ({ open, prevData, onSubmit, onCancel }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<EditDeckDTO>()

    const onSubmitHandler: SubmitHandler<EditDeckDTO> = (data: EditDeckDTO) => {
        onSubmit(data)
        reset()
    }

    return (
        <Dialog open={open}>
            <DialogTitle>Edytuj talię</DialogTitle>
            <DialogContent>
                <form id="edit-deck-form" onSubmit={handleSubmit(onSubmitHandler)}>
                    <label>
                        Nazwa:
                        <input {...register('name', { required: true })} defaultValue={prevData.name} />
                        {errors.name && <span>Wymagane pole</span>}
                    </label>
                </form>
            </DialogContent>
            <DialogActions>
                <DialogButtonsComponent formId="edit-deck-form" onCancelClick={onCancel} />
            </DialogActions>
        </Dialog>
    )
}