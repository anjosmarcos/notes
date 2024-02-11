import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react'
import { useState } from 'react';
import { toast } from 'sonner'

// interface para tipar as propriedades do componente
interface NewNoteCardProps {
    onNoteCreated: (content: string) => void // função que recebe uma string e não retorna nada
}

let speechRecognition: SpeechRecognition | null = null

export function NewNoteCard({ onNoteCreated }: NewNoteCardProps) {
    const [shouldShowOnBorad, setShouldShowOnBoard] = useState(true)
    const [content, setContent] = useState('')
    const [isRecording, setIsRecording] = useState(false)

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

        if(content === '') {
            return toast.error('O conteúdo da nota não pode ser vazio')
        }

        console.log(content)
        onNoteCreated(content) // chama a função passada por propriedade com o conteúdo da nota
        setContent('') // limpa o conteúdo
        setShouldShowOnBoard(true) // volta para o modo de gravação
        toast.success('Nota salva com sucesso')
    }

    function handleStartRecording() {
        const isSpeechRecognitionAPIAvailable = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window

        if (!isSpeechRecognitionAPIAvailable) {
            return toast.error('Seu navegador não suporta a API de reconhecimento de voz')
        }

        setIsRecording(true) // muda para o modo de gravação
        setShouldShowOnBoard(false) // muda para o modo de edição

        const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition

        speechRecognition = new SpeechRecognitionAPI()

        speechRecognition.lang = 'pt-BR'
        speechRecognition.continuous = true
        speechRecognition.maxAlternatives = 1
        speechRecognition.interimResults = true


        speechRecognition.onresult = (event) => {
            const transcript = Array.from(event.results).reduce((text, result) => {
                return text.concat(result[0].transcript)
            },'')

            setContent(transcript)
        }

        speechRecognition.onerror = (event) => {
            console.log(event.error)
        }

        speechRecognition.start()
    }

    function handleStopRecording() {
        setIsRecording(false) // muda para o modo de gravação

        if (speechRecognition) {
            speechRecognition.stop()
            speechRecognition = null
        }
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

                    <form className='flex-1 flex flex-col'>
                        <div className='flex flex-1 flex-col gap-3 p-5 '>
                            <span className='text-sm font-medium text-slate-300'>
                                Adicionar nota
                            </span>
                            {shouldShowOnBorad ? (
                                <p className='text-sm leading-6 text-slate-400'>
                                    Comece <button type='button' onClick={handleStartRecording} className='font-medium text-lime-400 hover:underline'>gravando uma nota</button> em áudio ou se preferir, <button type='button' className='font-medium text-lime-400 hover:underline' onClick={handleStartEditor}>digite o conteúdo</button> da nota.
                                </p>
                            ) : (
                                <textarea
                                    autoFocus
                                    className='text-sm leading-6 bg-transparent resize-none flex-1 outline-none text-slate-400'
                                    onChange={handleContentChage}
                                    value={content}
                                />
                            )}
                        </div>

                        {isRecording ? (
                            <button
                                type='button'
                                onClick={handleStopRecording}
                                className='w-full py-4 flex items-center justify-center gap-2 bg-slate-900 text-center text-slate-300 outline-none  font-medium hover:text-slate-100'
                            >
                                <div className='size-3 rounded-full bg-red-500 animate-pulse' />
                                Gravando (clique para parar)
                            </button>
                        ) : (
                            <button
                                type='submit'
                                onClick={handleSaveNote}
                                className='w-full py-4 bg-lime-400 text-center text-lime-950 outline-none  font-medium hover:bg-lime-500'
                            >
                                Salvar nota
                            </button>
                        )}


                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>

    )
}