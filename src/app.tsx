import logo from './assets/Logo.svg'

export function App() {
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
        <div className='rounded-md bg-slate-700 p-5 space-y-3'>
          <span className='text-sm font-medium text-slate-200'>
            Adicionar nota
          </span>
          <p className='text-sm leading-6 text-slate-400'>
            Grave uma nota em áudio que será convertida para texto automaticamente.
          </p>
        </div>

        <div className='rounded-md bg-slate-800 p-5 space-y-3'>
          <span className='text-sm font-medium text-slate-300'>
            há 2 dias
          </span>
          <p className='text-sm leading-6 text-slate-400'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora deserunt temporibus a soluta voluptatum, saepe culpa nam est cumque dolore! Sapiente culpa asperiores autem ipsum consequatur sed inventore voluptates assumenda?
          </p>
        </div>

        <div className='rounded-md bg-slate-800 p-5 space-y-3'>
          <span className='text-sm font-medium text-slate-300'>
            há 3 dias
          </span>
          <p className='text-sm leading-6 text-slate-400'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde voluptatum alias, ex saepe nemo perferendis culpa incidunt porro qui assumenda veritatis quae eveniet, fuga illum impedit praesentium soluta sunt optio?
          </p>
        </div>

        <div className='rounded-md bg-slate-800 p-5 space-y-3'>
          <span className='text-sm font-medium text-slate-300'>
            há 10 dias
          </span>
          <p className='text-sm leading-6 text-slate-400'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed exercitationem similique cupiditate corrupti, iure accusamus nam. Voluptate fugit suscipit odit unde quaerat, neque et sapiente nesciunt, perspiciatis placeat quae illo!
          </p>
        </div>
        
      </div>

   
      
  


    </div>
  )
}


