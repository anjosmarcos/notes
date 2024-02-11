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
  const [search, setSearch] = useState('') // Estado para armazenar o valor do input de busca
  const [notes, setNotes] = useState<Note[]>(() => {

      const notesOnLocalStorage = localStorage.getItem('notes') // Busca as notas no localStorage

      if(notesOnLocalStorage) // Se existirem notas no localStorage
        return JSON.parse(notesOnLocalStorage) // Retorna as notas convertidas para objeto
      else
        return [];
  }); 
  
  // função para lidar com a criação de uma nova nota
  function onNoteCreated(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content
    }
  
    const notesArray = [newNote, ...notes] // Cria um novo array com a nova nota no início

    setNotes(notesArray) // Adiciona a nova nota no início do array

    localStorage.setItem('notes', JSON.stringify(notesArray)) // Salva o array no localStorage

  }

  // função para lidar com a busca de notas
  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const qyery = event.target.value // Pega o valor do input de busca

    setSearch(qyery) // Atualiza o estado de busca
  }

  // Filtra as notas com base na busca
  const filteredNotes = search !== '' 
    ? notes.filter(note => note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase())) 
    : notes

  return (
    <div className='max-w-6xl mx-auto my-12 space-y-6'>
      <img src={logo} alt="Logo NLW" />
      <form className='w-full'>
        <input 
          type="text" 
          placeholder='Busque em suas notas...' 
          className='w-full bg-transparent text-3xl font-semibold tracking-tighter outline-none placeholder:text-slate-500 '
          onChange={handleSearch}
        />
      </form>

      <div className='h-px bg-slate-700'/>

      <div className='grid grid-cols-3 gap-6 auto-rows-[250px]'>
        <NewNoteCard onNoteCreated={onNoteCreated} />
        
        {filteredNotes.map(note => {
          return (
            <NoteCard note={note} key={note.id}  />
          )
        })}
      
      </div>

    </div>
  )
}


