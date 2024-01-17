import { FC } from "react"
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { SubmitHandler, useForm } from "react-hook-form"
import { AddDeckDTO } from "../classes/Deck"
import DialogButtonsComponent from "../components/DialogButtonsComponent"

type AddDeckDialogProps = {
    open: boolean,
    onSubmit: (data: AddDeckDTO) => void,
    onCancel: () => void
}

export const AddDeckDialog: FC<AddDeckDialogProps> = ({ open, onSubmit, onCancel }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<AddDeckDTO>()

    const onSubmitHandler: SubmitHandler<AddDeckDTO> = (data: AddDeckDTO) => {
        onSubmit(data)
        reset()
    }

    return (
        <Dialog open={open}>
            <DialogTitle>Dodaj talię</DialogTitle>
            <DialogContent>
                <form id="add-deck-form" onSubmit={handleSubmit(onSubmitHandler)}>
                    <label>
                        Nazwa:
                        <input {...register('name', { required: true, pattern: /^[A-Z].*$/ })} />
                        {errors.name && <span>Wymagane pole</span>}
                    </label>
                </form>
            </DialogContent>
            <DialogActions>
                <DialogButtonsComponent formId="add-deck-form" onCancelClick={onCancel} />
            </DialogActions>
        </Dialog>
    )
}