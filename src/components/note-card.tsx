export function NoteCard() {
    return (
    <button className='rounded-md bg-slate-800 p-5 space-y-3 overflow-hidden relative hover:ring-2 hover:ring-slate-600 text-left focus-visible:ring-2 focus-visible:ring-lime-400 outline-none'>
        <span className='text-sm font-medium text-slate-300'>
            há 2 dias
        </span>
        <p className='text-sm leading-6 text-slate-400'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora deserunt temporibus a soluta voluptatum, saepe culpa nam est cumque dolore! Sapiente culpa asperiores autem ipsum consequatur sed inventore voluptates assumenda? Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora deserunt temporibus a soluta voluptatum, saepe culpa nam est cumque dolore! Sapiente culpa asperiores autem ipsum consequatur sed inventore voluptates assumenda
        </p>

        <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 from-black pointer-events-none' />
    </button>
    )
}