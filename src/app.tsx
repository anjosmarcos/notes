import logo from './assets/Logo.svg'
import { NewNoteCard } from './components/new-note-card'
import { NoteCard } from './components/note-card'
import { useState } from 'react';

// interface para tipar as propriedades do componente
interface Note {
  id: string
  date: Date
  content: string
}

export function App() {

  const [notes, setNotes] = useState<Note[]>([]); // Inicializa o estado com um array vazio
  
  // função para lidar com a criação de uma nova nota
  function onNoteCreated(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content
    }

    setNotes([newNote, ...notes]) // Adiciona a nova nota no início do array
  }

  return (
    <div className='max-w-6xl mx-auto my-12 space-y-6'>
      <img src={logo} alt="Logo NLW" />
      <form className='w-full'>
        <input 
          type="text" 
          placeholder='Busque em suas notas...' 
          className='w-full bg-transparent text-3xl font-semibold tracking-tighter outline-none placeholder:text-slate-500 '
        />
      </form>

      <div className='h-px bg-slate-700'/>

      <div className='grid grid-cols-3 gap-6 auto-rows-[250px]'>
        <NewNoteCard onNoteCreated={onNoteCreated} />
        
        {notes.map(note => {
          return (
            <NoteCard note={note} key={note.id}  />
          )
        })}
      
      </div>

    </div>
  )
}


