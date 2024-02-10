import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react'
import { useState } from 'react';
import { toast } from 'sonner'

export function NewNoteCard() {
    const [shouldShowOnBorad, setShouldShowOnBoard] = useState(true)
    const [content, setContent] = useState('')

    function handleStartEditor() {
        setShouldShowOnBoard(false) // muda para o modo de edição
    }

    // função para lidar com a mudança de conteúdo do textarea
    function handleContentChage(event: ChangeEvent<HTMLTextAreaElement>) {
        setContent(event.target.value)  
        // console.log(event.target.value)
        if (event.target.value === '') setShouldShowOnBoard(true) // se o conteúdo for vazio, volta para o modo de gravação
    }

    function handleSaveNote(event: FormEvent) {
        event.preventDefault()
        console.log(content)
        toast.success('Nota salva com sucesso')
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger className='rounded-md flex flex-col bg-slate-700 p-5 gap-3 text-left focus-visible:ring-2 focus-visible:ring-lime-400 hover:ring-2 hover:ring-slate-600 outline-none'>
                <span className='text-sm font-medium text-slate-200'>
                    Adicionar nota
                </span>
                <p className='text-sm leading-6 text-slate-400'>
                    Grave uma nota em áudio que será convertida para texto automaticamente.
                </p>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className='inset-0 fixed bg-black/60' />
                <Dialog.Content className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md flex flex-col outline-none'>
                    <Dialog.Close className='absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100'>
                        <X className='size-5' />
                    </Dialog.Close>

                    <form onSubmit={handleSaveNote} className='flex-1 flex flex-col'>
                        <div className='flex flex-1 flex-col gap-3 p-5 '>
                            <span className='text-sm font-medium text-slate-300'>
                                Adicionar nota
                            </span>
                            {shouldShowOnBorad ? (
                                <p className='text-sm leading-6 text-slate-400'>
                                    Comece <button className='font-medium text-lime-400 hover:underline'>gravando uma nota</button> em áudio ou se preferir, <button className='font-medium text-lime-400 hover:underline' onClick={handleStartEditor}>digite o conteúdo</button> da nota.
                                </p>
                            ) : (
                                <textarea
                                    autoFocus
                                    className='text-sm leading-6 bg-transparent resize-none flex-1 outline-none text-slate-400'
                                    onChange={handleContentChage}
                                />
                            )}
                        </div>

                        <button
                            type='submit'
                            className='w-full py-4 bg-lime-400 text-center text-lime-950 outline-none  font-medium hover:bg-lime-500'
                        >
                            Salvar nota
                        </button>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>

    )
}