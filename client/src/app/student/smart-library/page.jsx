
//goooooooooooodddddd
'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, Loader, UploadCloud, BarChart2, Lightbulb, FolderOpen } from 'lucide-react'
import MaterialCard from '@/components/library/MaterialCard'
import BookCard from '@/components/library/BookCard'
import LibraryAssistant from '@/components/library/LibraryAssistant'
import SummarizeModal from '@/components/library/SummarizeModal'
import QuizModal from '@/components/library/QuizModal'

const INITIAL_MATERIALS = [
  { id: 1, title: 'Advanced JavaScript Concepts', type: 'PDF', size: '2.4 MB', uploaded: 'Jan 10', author: 'Prof. Smith' },
  { id: 2, title: 'Web Development Roadmap 2025', type: 'Document', size: '1.2 MB', uploaded: 'Jan 8', author: 'Sarah L.' },
  { id: 3, title: 'CSS Grid Mastery', type: 'Video', size: '145 MB', uploaded: 'Jan 5', author: 'Code Academy' },
  { id: 4, title: 'React Hooks Deep Dive', type: 'PDF', size: '3.1 MB', uploaded: 'Jan 3', author: 'Dan Abramov' },
  { id: 5, title: 'TypeScript Complete Guide', type: 'Document', size: '2.8 MB', uploaded: 'Dec 30', author: 'Basarat Ali' },
]

const INITIAL_BOOKS = [
  { id: 1, title: 'Eloquent JavaScript', author: 'Marijn Haverbeke', rating: 4.8, cover: '📕' },
  { id: 2, title: "You Don't Know JS", author: 'Kyle Simpson', rating: 4.9, cover: '📗' },
  { id: 3, title: 'Clean Code', author: 'Robert Martin', rating: 4.7, cover: '📙' },
  { id: 4, title: 'Design Patterns', author: 'Gang of Four', rating: 4.6, cover: '📔' },
  { id: 5, title: 'Refactoring', author: 'Martin Fowler', rating: 4.8, cover: '📕' },
  { id: 6, title: 'The Pragmatic Programmer', author: 'Hunt & Thomas', rating: 4.7, cover: '📗' },
]

export default function SmartLibrary() {
  const fileInputRef = useRef(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('materials')
  const [materials, setMaterials] = useState(INITIAL_MATERIALS)
  const [books, setBooks] = useState(INITIAL_BOOKS)
  const [filteredMaterials, setFilteredMaterials] = useState(INITIAL_MATERIALS)
  const [filteredBooks, setFilteredBooks] = useState(INITIAL_BOOKS)
  const [isSearching, setIsSearching] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  
  const [summarizeModal, setSummarizeModal] = useState({ isOpen: false, material: null })
  const [quizModal, setQuizModal] = useState({ isOpen: false, material: null })

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredMaterials(materials)
      setFilteredBooks(books)
      return
    }

    setIsSearching(true)
    const timer = setTimeout(() => {
      const query = searchQuery.toLowerCase()
      
      const matchedMaterials = materials.filter(m =>
        m.title.toLowerCase().includes(query) ||
        m.author.toLowerCase().includes(query) ||
        m.type.toLowerCase().includes(query)
      )
      
      const matchedBooks = books.filter(b =>
        b.title.toLowerCase().includes(query) ||
        b.author.toLowerCase().includes(query)
      )

      setFilteredMaterials(matchedMaterials)
      setFilteredBooks(matchedBooks)
      setIsSearching(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery, materials, books])

  const handleSummarize = (material) => setSummarizeModal({ isOpen: true, material })
  const handleQuiz = (material) => setQuizModal({ isOpen: true, material })

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setSearchQuery('')
  }

  const processUploadedFiles = (files) => {
    if (!files || files.length === 0) return
    const currentDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    const generatedUploads = Array.from(files).map((file, idx) => {
      const extension = file.name.split('.').pop()?.toUpperCase() || 'PDF'
      return {
        id: Date.now() + idx,
        title: file.name.substring(0, file.name.lastIndexOf('.')) || file.name,
        type: extension === 'JSX' || extension === 'JS' || extension === 'TS' ? 'Code' : extension,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        uploaded: currentDate,
        author: 'Student (Local)'
      }
    })
    setMaterials(prev => [...generatedUploads, ...prev])
    setActiveTab('materials')
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(e.type === "dragenter" || e.type === "dragover")
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processUploadedFiles(e.dataTransfer.files)
    }
  }

  const computedStorageUsed = (materials.reduce((acc, m) => {
    const numericSize = parseFloat(m.size)
    return acc + (isNaN(numericSize) ? 0 : numericSize)
  }, 0)).toFixed(1)

  return (
    // <div className="bg-[#07070a] text-white min-h-[calc(100vh-56px)] p-6 pb-12 grid grid-cols-[1fr_310px] gap-7 box-border">
       <div className="flex h-screen w-full bg-black text-white">
      {/* Main Content Workspace Pane */}
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="font-serif text-3xl font-normal tracking-wide text-white mb-1">
            Smart Library Hub
          </h1>
          <p className="text-white/40 text-xs mb-4">
            Academic Document Workspace & Contextual Learning Repository
          </p>
          
          {/* Dynamic Search Context */}
          <div className="relative max-w-lg">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search workspaces, documents, course tracks..."
              className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg py-2 pl-10 pr-10 text-xs text-white placeholder-white/25 outline-none focus:border-white/15 transition-all"
            />
            {isSearching && (
              <Loader size={12} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 animate-spin" />
            )}
          </div>
        </div>

        {/* Tab Selector Segment */}
        <div className="flex gap-5 border-b border-white/[0.03] pb-2 my-1 w-[600px]">
          {[
            ['materials', '📄 Materials'], 
            ['books', '📚 Textbooks'], 
            ['recommended', '⭐ Recommended']
          ].map(([tab, label]) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`bg-transparent border-0 text-xs pb-2 cursor-pointer transition-all border-b-2 ${
                activeTab === tab 
                  ? 'text-white border-white font-medium' 
                  : 'text-white/45 border-transparent hover:text-white/70'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Render Views Container */}
        <div className="flex-1">
          {activeTab === 'materials' && (
            <div className="flex flex-col gap-2 max-w-xl">
              {filteredMaterials.length > 0 ? (
                filteredMaterials.map(material => (
                  <MaterialCard 
                    key={material.id} 
                    material={material}
                    onSummarize={handleSummarize}
                    onQuiz={handleQuiz}
                  />
                ))
              ) : (
                <div className="p-8 text-center bg-[#111] rounded-xl border border-white/[0.06]">
                  <p className="text-white/40 text-xs m-0">No matching workspace assets recorded</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'books' && (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-3">
              {filteredBooks.length > 0 ? (
                filteredBooks.map(book => (
                  <BookCard 
                    key={book.id} 
                    book={book}
                    onSelect={() => handleSummarize({ id: book.id, title: book.title, type: 'Book', author: book.author, size: 'Core Asset' })}
                    onQuiz={() => handleQuiz({ id: book.id, title: book.title, type: 'Book Quiz', author: book.author })}
                  />
                ))
              ) : (
                <div className="col-span-full p-8 text-center bg-[#111] rounded-xl border border-white/[0.06]">
                  <p className="text-white/40 text-xs m-0">No primary text assets matching index standard</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'recommended' && (
            <div className="flex flex-col gap-2 max-w-xl">
              <div className="px-3 py-2 bg-indigo-500/[0.02] rounded-lg border border-indigo-500/10 mb-1">
                <p className="m-0 text-[11px] text-indigo-400/80 flex items-center gap-2">
                  <span>✨</span> Core pipeline recommendations synced automatically with your active course objectives.
                </p>
              </div>
              {materials.slice(0, 2).map(material => (
                <MaterialCard 
                  key={`rec-${material.id}`} 
                  material={{ ...material, title: `💡 Suggested: ${material.title}` }}
                  onSummarize={handleSummarize}
                  onQuiz={handleQuiz}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar Control Column — Fixed to eliminate empty screen voids */}
      <div className="flex flex-col gap-4 h-full min-h-0">
        
        {/* Document Ingestion Module */}
        <div className="bg-[#111] border border-white/[0.06] rounded-xl p-3.5 shrink-0">
          <div className="flex items-center gap-2 mb-2.5">
            <FolderOpen size={13} className="text-white/50" />
            <h3 className="m-0 text-[11px] font-semibold tracking-wider text-white/70 uppercase">Upload Material</h3>
          </div>
          
          <input 
            type="file"
            ref={fileInputRef}
            className="hidden"
            multiple
            onChange={(e) => processUploadedFiles(e.target.files)}
          />

          <div 
            onClick={() => fileInputRef.current?.click()}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-5 text-center cursor-pointer transition-all ${
              dragActive 
                ? 'border-white/30 bg-white/[0.05]' 
                : 'border-white/[0.06] bg-white/[0.01] hover:border-white/15 hover:bg-white/[0.03]'
            }`}
          >
            <UploadCloud size={24} className="text-white/30 mx-auto mb-2" />
            <p className="m-0 text-xs font-medium text-white mb-0.5">Drag & drop files here</p>
            <p className="m-0 text-[10px] text-white/35">or click to browse local directories</p>
          </div>
        </div>

        {/* AI Assistant Node — Takes up remaining viewport heights cleanly */}
        <LibraryAssistant />

        {/* Real-time Infrastructure Telemetry */}
        <div className="bg-[#111] border border-white/[0.06] rounded-xl p-3.5 shrink-0">
          <div className="flex items-center gap-2 mb-3">
            <BarChart2 size={13} className="text-white/50" />
            <h3 className="m-0 text-[11px] font-semibold tracking-wider text-white/70 uppercase">Library Telemetry</h3>
          </div>
          <div className="flex flex-col gap-2">
            {[
              { label: 'Materials Indexed', value: materials.length.toString() },
              { label: 'Core Textbooks', value: books.length.toString() },
              { label: 'Sandbox Volume', value: `${computedStorageUsed} MB` },
            ].map((stat, i) => (
              <div key={i} className="flex justify-between items-center px-2.5 py-2 bg-white/[0.03] border border-white/[0.02] rounded-lg">
                <span className="text-[11px] text-white/45">{stat.label}</span>
                <span className="text-xs font-mono font-medium text-white">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tactical Learning Tips Card */}
        <div className="bg-amber-400/[0.02] border border-amber-400/10 rounded-xl p-3.5 shrink-0">
          <div className="flex items-center gap-1.5 mb-2">
            <Lightbulb size={13} className="text-amber-400/80" />
            <h3 className="m-0 text-[11px] font-semibold tracking-wider text-amber-400/80 uppercase">System Insights</h3>
          </div>
          <ul className="m-0 pl-4 text-[11px] text-white/50 space-y-1.5 leading-normal">
            <li>Trigger AI Page Explainer card configurations to run localized token inferences.</li>
            <li>Run deep vector quiz generations across contextual text frames on matching nodes.</li>
          </ul>
        </div>
      </div>

      {/* Global Context Core Modals */}
      <SummarizeModal 
        isOpen={summarizeModal.isOpen}
        onClose={() => setSummarizeModal({ isOpen: false, material: null })}
        material={summarizeModal.material}
      />

      <QuizModal 
        isOpen={quizModal.isOpen}
        onClose={() => setQuizModal({ isOpen: false, material: null })}
        material={quizModal.material}
      />
    </div>
  )
}