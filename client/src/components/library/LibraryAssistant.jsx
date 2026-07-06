
//working version for the extensions

// 'use client'

// import { useState, useRef, useEffect } from 'react'
// import {
//   Send,
//   Bot,
//   User,
//   Loader,
//   Sparkles,
//   FolderOpen,
//   UploadCloud,
//   ChevronLeft,
//   ChevronRight,
//   X,
//   AlertCircle
// } from 'lucide-react'

// const GROQ_API_URL = process.env.NEXT_PUBLIC_GROQ_BASE_URL || 'https://api.groq.com/openai/v1'
// const CHAT_MODEL = 'meta-llama/llama-4-scout-17b-16e-instruct'

// export default function LibraryAssistant() {
//   /* ==========================================
//      STATE MANAGEMENT
//      ========================================== */
//   const [messages, setMessages] = useState([
//     {
//       id: 'init',
//       role: 'assistant',
//       content: 'Habari! I am your AI Smart Library Companion. Drag or select any document (.docx, .pdf, .txt, .json, .csv) into the academic workspace below for page-by-page simple terms translation.'
//     }
//   ])

//   const [inputValue, setInputValue] = useState('')
//   const [isChatLoading, setIsChatLoading] = useState(false)
//   const [chatSystemError, setChatSystemError] = useState(null)

//   const [uploadedFile, setUploadedFile] = useState(null)
//   const [documentPages, setDocumentPages] = useState([]) 
//   const [currentPageIndex, setCurrentPageIndex] = useState(0)
//   const [isProcessingDocument, setIsProcessingDocument] = useState(false)
//   const [processingError, setProcessingError] = useState(null)
  
//   const [cachedSummaries, setCachedSummaries] = useState({})
//   const [isPageLoading, setIsPageLoading] = useState(false)

//   const chatBottomRef = useRef(null)
//   const fileInputRef = useRef(null)

//   useEffect(() => {
//     chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' })
//   }, [messages, isChatLoading])

//   /* ==========================================
//      CHAT TUNNEL ROUTINES
//      ========================================== */
//   const transmitChatInference = async (chatHistory) => {
//     const token = typeof window !== 'undefined'
//       ? localStorage.getItem('groq_access_token') || localStorage.getItem('access_token') || process.env.NEXT_PUBLIC_GROQ_API_KEY
//       : process.env.NEXT_PUBLIC_GROQ_API_KEY

//     if (!token || token === 'undefined') {
//       return 'Missing GROQ API authorization token. Please set it in your environment or localStorage.'
//     }

//     const cleanToken = String(token).replace(/['"`;]/g, '').trim()

//     const response = await fetch(`${GROQ_API_URL}/chat/completions`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${cleanToken}`
//       },
//       body: JSON.stringify({
//         model: CHAT_MODEL,
//         temperature: 0.4,
//         max_tokens: 600,
//         messages: [
//           {
//             role: 'system',
//             content: 'You are an elite academic companion. Deliver direct, accessible, and crystal-clear breakdowns of complex educational queries.'
//           },
//           ...chatHistory.filter(m => m.id !== 'init').map(m => ({
//             role: m.role === 'user' ? 'user' : 'assistant',
//             content: m.content
//           }))
//         ]
//       })
//     })

//     if (!response.ok) throw new Error(`Chat connection failure (${response.status})`)
//     const data = await response.json()
//     return data?.choices?.[0]?.message?.content || 'No response captured.'
//   }

//   const handleSendChatMessage = async (e) => {
//     e.preventDefault()
//     if (!inputValue.trim() || isChatLoading) return

//     const userMessage = {
//       id: Date.now().toString(),
//       role: 'user',
//       content: inputValue
//     }

//     const updatedMessages = [...messages, userMessage]
//     setMessages(updatedMessages)
//     setInputValue('')
//     setIsChatLoading(true)
//     setChatSystemError(null)

//     try {
//       const aiResponse = await transmitChatInference(updatedMessages)
//       setMessages(prev => [...prev, {
//         id: (Date.now() + 1).toString(),
//         role: 'assistant',
//         content: aiResponse
//       }])
//     } catch (error) {
//       setChatSystemError(error.message)
//     } finally {
//       setIsChatLoading(false)
//     }
//   }

//   /* ==========================================
//      PAGE RECONSTRUCTION ENGINE (THE FIX)
//      ========================================== */
//   const parseDocumentToPages = (file, extension) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader()

//       // Read as ArrayBuffer to protect binary structure layout for PDFs, DOCX, and Excel
//       if (['pdf', 'docx', 'xlsx', 'xls'].includes(extension)) {
//         reader.readAsArrayBuffer(file)
//       } else {
//         reader.readAsText(file) // Plain text, JSON, or CSV fallback
//       }

//       reader.onload = async (event) => {
//         try {
//           let chunks = []
//           const buffer = event.target.result

//           // --- 1. SAFE WORD DOCUMENT EXTRACTION (.docx) ---
//           if (extension === 'docx') {
//             const dec = new TextDecoder('utf-8')
//             const textView = dec.decode(new Uint8Array(buffer))
            
//             // Extract text matching strings inside Word XML paragraph blocks
//             const matchParagraphs = textView.match(/<w:t[^>]*>(.*?)<\/w:t>/g)
            
//             if (matchParagraphs) {
//               const cleanedText = matchParagraphs
//                 .map(val => val.replace(/<[^>]+>/g, ''))
//                 .join(' ')
//                 .replace(/\s+/g, ' ')
//                 .trim()

//               // Split the text into logical pages of 1800 characters
//               const itemsPerPage = 1800
//               for (let i = 0; i < cleanedText.length; i += itemsPerPage) {
//                 chunks.push(cleanedText.substring(i, i + itemsPerPage))
//               }
//             } else {
//               // Fallback to reading character groups if layout tags are nested
//               const fallbackClean = textView.replace(/[^\x20-\x7E\s]/g, '').replace(/\s+/g, ' ').trim()
//               const itemsPerPage = 1500
//               for (let i = 0; i < fallbackClean.length; i += itemsPerPage) {
//                 chunks.push(fallbackClean.substring(i, i + itemsPerPage))
//               }
//             }
//           }
//           // --- 2. MULTI-PAGE PDF PARSER TRACK ---
//           else if (extension === 'pdf') {
//             const pdfjsLib = window['pdfjs-dist/build/pdf']
//             if (!pdfjsLib) {
//               await new Promise((res) => {
//                 const s = document.createElement('script')
//                 s.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js'
//                 s.onload = res
//                 document.head.appendChild(s)
//               })
//             }
            
//             const pdfjs = window['pdfjs-dist/build/pdf']
//             pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js'
            
//             const pdf = await pdfjs.getDocument({ data: buffer }).promise
//             for (let num = 1; num <= pdf.numPages; num++) {
//               const page = await pdf.getPage(num)
//               const contents = await page.getTextContent()
//               const aggregatedText = contents.items.map(item => item.str).join(' ')
//               if (aggregatedText.trim().length > 2) {
//                 chunks.push(aggregatedText.trim())
//               }
//             }
//           }
//           // --- 3. EXCEL / CSV LAYOUT TRACK ---
//           else if (['xlsx', 'xls', 'csv', 'json'].includes(extension)) {
//             const cleanTextString = typeof buffer === 'string' ? buffer : new TextDecoder('utf-8').decode(new Uint8Array(buffer))
//             const rawLines = cleanTextString.split('\n').filter(l => l.trim().length > 0)
            
//             const linesPerSegment = 20
//             for (let i = 0; i < rawLines.length; i += linesPerSegment) {
//               chunks.push(rawLines.slice(i, i + linesPerSegment).join('\n'))
//             }
//           }
//           // --- 4. TEXT / MARKDOWN FALLBACK ---
//           else {
//             const textualBody = String(buffer)
//             const charactersPerPage = 2000
//             for (let i = 0; i < textualBody.length; i += charactersPerPage) {
//               chunks.push(textualBody.substring(i, i + charactersPerPage))
//             }
//           }

//           resolve(chunks.filter(c => c.trim().length > 0))
//         } catch (e) {
//           reject(new Error(`Extraction pipeline failed: ${e.message}`))
//         }
//       }
//       reader.onerror = () => reject(new Error('File reader channel block error.'))
//     })
//   }

//   /* ==========================================
//      CORE WORKSPACE PIPELINE ACTIONS
//      ========================================== */
//   const processSelectedFile = async (e) => {
//     const file = e.target.files?.[0]
//     if (!file) return

//     setUploadedFile(file)
//     setIsProcessingDocument(true)
//     setProcessingError(null)
//     setDocumentPages([])
//     setCachedSummaries({})
//     setCurrentPageIndex(0)

//     const fileExtension = file.name.split('.').pop()?.toLowerCase()

//     try {
//       const extractedPagesArray = await parseDocumentToPages(file, fileExtension)
      
//       if (extractedPagesArray.length === 0) {
//         throw new Error('Unable to extract clear text layouts from this asset. Verify that the file is not empty or encrypted.')
//       }

//       setDocumentPages(extractedPagesArray)
//       // Automatically trigger Groq synthesis for Page 1
//       await fetchPageSummary(0, extractedPagesArray)
//     } catch (err) {
//       setProcessingError(err.message)
//     } finally {
//       setIsProcessingDocument(false)
//     }
//   }

//   const fetchPageSummary = async (pageIndex, pagesArray = documentPages) => {
//     if (cachedSummaries[pageIndex]) return 

//     setIsPageLoading(true)
//     setProcessingError(null)
    
//     const token = typeof window !== 'undefined'
//       ? localStorage.getItem('groq_access_token') || localStorage.getItem('access_token') || process.env.NEXT_PUBLIC_GROQ_API_KEY
//       : process.env.NEXT_PUBLIC_GROQ_API_KEY

//     if (!token) {
//       setProcessingError('Missing GROQ API authentication keys.')
//       setIsPageLoading(false)
//       return
//     }

//     const cleanToken = String(token).replace(/['"`;]/g, '').trim()
//     const textSnippet = pagesArray[pageIndex] || ''

//     try {
//       const response = await fetch(`${GROQ_API_URL}/chat/completions`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${cleanToken}`
//         },
//         body: JSON.stringify({
//           model: CHAT_MODEL,
//           temperature: 0.2,
//           max_tokens: 500,
//           messages: [
//             {
//               role: 'system',
//               content: 'You are an advanced academic companion. Re-write the provided complex study material chunk into an ultra-simple explanation paragraph. Then, map exactly 3 clear takeaways using the "•" character.'
//             },
//             {
//               role: 'user',
//               content: `Summarize this target text segment in easy terms (Segment Reference: ${pageIndex + 1}):\n\n${textSnippet}`
//             }
//           ]
//         })
//       })

//       if (!response.ok) throw new Error(`Summary route broken (${response.status})`)
      
//       const data = await response.json()
//       const aiContent = data?.choices?.[0]?.message?.content || 'Unable to render matching summaries.'
      
//       setCachedSummaries(prev => ({
//         ...prev,
//         [pageIndex]: aiContent
//       }))
//     } catch (err) {
//       setProcessingError(`Inference engine error: ${err.message}`)
//     } finally {
//       setIsPageLoading(false)
//     }
//   }

//   /* ==========================================
//      INTERACTIVE BUTTON ACTIONS
//      ========================================== */
//   const handleNextPageAction = () => {
//     const nextIndex = currentPageIndex + 1
//     if (nextIndex < documentPages.length && !isPageLoading) {
//       setCurrentPageIndex(nextIndex)
//       if (!cachedSummaries[nextIndex]) {
//         fetchPageSummary(nextIndex)
//       }
//     }
//   }

//   const handlePreviousPageAction = () => {
//     if (currentPageIndex > 0 && !isPageLoading) {
//       setCurrentPageIndex(currentPageIndex - 1)
//     }
//   }

//   const resetWorkspacePipeline = () => {
//     setUploadedFile(null)
//     setDocumentPages([])
//     setCachedSummaries({})
//     setCurrentPageIndex(0)
//     setProcessingError(null)
//     if (fileInputRef.current) fileInputRef.current.value = ''
//   }

//   return (
//     <div className="w-full bg-[#07070a] text-white p-6 grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-6 min-h-[calc(100vh-56px)] box-border">
      
//       {/* ================= CHAT COMPONENT SIDEBAR ================= */}
//       <div className="bg-[#111] border border-white/[0.06] rounded-xl flex flex-col h-[85vh] lg:h-[88vh] overflow-hidden shadow-xl">
//         <div className="px-4 py-3.5 border-b border-white/[0.06] bg-white/[0.01] flex items-center gap-2 shrink-0">
//           <Sparkles size={14} className="text-indigo-400" />
//           <h3 className="text-[11px] uppercase tracking-wider text-white/70 font-semibold m-0">
//             Tutor Consultation Terminal
//           </h3>
//         </div>

//         <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-black/[0.05]">
//           {messages.map((msg) => (
//             <div
//               key={msg.id}
//               className={`flex gap-2.5 max-w-[88%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
//             >
//               <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border mt-0.5 ${
//                 msg.role === 'user' ? 'bg-white/[0.06] border-white/10' : 'bg-indigo-500/10 border-indigo-500/20'
//               }`}>
//                 {msg.role === 'user' ? <User size={11} className="text-white/80" /> : <Bot size={11} className="text-indigo-400" />}
//               </div>

//               <div className={`p-3 rounded-xl border text-xs leading-relaxed whitespace-pre-wrap break-words ${
//                 msg.role === 'user' 
//                   ? 'bg-indigo-500/[0.05] border-indigo-500/20 text-white rounded-tr-none' 
//                   : 'bg-white/[0.02] border-white/[0.05] text-white/85 rounded-tl-none'
//               }`}>
//                 {msg.content}
//               </div>
//             </div>
//           ))}

//           {isChatLoading && (
//             <div className="text-white/40 text-xs flex items-center gap-2 pl-1 italic">
//               <Loader size={12} className="animate-spin text-indigo-400" />
//               Compiling...
//             </div>
//           )}

//           {chatSystemError && (
//             <div className="p-3 bg-red-500/[0.02] border border-red-500/15 rounded-lg text-[11px] font-mono text-red-400 break-words">
//               {chatSystemError}
//             </div>
//           )}
//           <div ref={chatBottomRef} />
//         </div>

//         <form onSubmit={handleSendChatMessage} className="p-3 border-t border-white/[0.06] bg-black/20 flex gap-2 shrink-0">
//           <input
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//             className="flex-1 bg-white/[0.03] text-white placeholder-white/25 text-xs px-3 py-2.5 rounded-lg border border-white/[0.07] outline-none"
//             placeholder="Ask your tutor assistant..."
//           />
//           <button 
//             type="submit"
//             disabled={!inputValue.trim() || isChatLoading}
//             className="w-9 h-9 bg-indigo-500 text-white rounded-lg flex items-center justify-center border-0 cursor-pointer hover:bg-indigo-600 transition-all shrink-0"
//           >
//             <Send size={13} />
//           </button>
//         </form>
//       </div>

//       {/* ================= MAIN ACADEMIC WORKSPACE HUB ================= */}
//       <div className="bg-[#0b0b11] border border-white/[0.06] rounded-xl p-5 lg:p-6 h-[85vh] lg:h-[88vh] flex flex-col shadow-xl overflow-hidden box-border">
        
//         <div className="flex items-center gap-2 pb-4 border-b border-white/[0.04] shrink-0">
//           <FolderOpen size={16} className="text-indigo-400" />
//           <h2 className="text-white text-sm font-semibold m-0">
//             Academic Document Workspace Hub
//           </h2>
//         </div>

//         {/* DRAG & DROP AREA */}
//         {!uploadedFile && !isProcessingDocument && (
//           <div className="flex-1 flex flex-col justify-center py-6">
//             <label className="flex flex-col items-center justify-center py-16 px-4 border-2 border-dashed border-white/10 hover:border-white/20 bg-white/[0.01] hover:bg-white/[0.02] rounded-xl cursor-pointer transition-all text-center max-w-xl mx-auto w-full box-border">
//               <UploadCloud size={36} className="text-white/30 mb-3" />
//               <p className="text-white/80 text-sm font-medium m-0 mb-1">Upload Study Material Asset</p>
//               <p className="text-white/35 text-[11px] max-w-xs leading-normal m-0">
//                 Supports PDF, DOCX, XLSX, TXT, JSON, and CSV for page-by-page clean summaries
//               </p>
//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 hidden
//                 accept=".txt,.md,.csv,.json,.pdf,.docx,.xlsx,.rtf"
//                 onChange={processSelectedFile}
//               />
//             </label>
//           </div>
//         )}

//         {/* EXTRACTION LOADER VIEW */}
//         {isProcessingDocument && (
//           <div className="flex flex-1 flex-col items-center justify-center text-white/50 gap-2.5">
//             <Loader size={20} className="animate-spin text-indigo-400" />
//             <span className="text-xs tracking-wide">Decompressing text wrappers and structure maps safely...</span>
//           </div>
//         )}

//         {/* FAULT VIEWPORT INTERACTIVE ALERTS */}
//         {processingError && (
//           <div className="my-4 p-4 bg-red-500/[0.02] border border-red-500/15 rounded-xl flex flex-col items-center gap-3 max-w-md mx-auto justify-center">
//             <AlertCircle size={22} className="text-red-400" />
//             <p className="text-xs font-mono text-red-300 text-center m-0 leading-relaxed break-words w-full">
//               {processingError}
//             </p>
//             <button
//               onClick={resetWorkspacePipeline}
//               className="bg-white border-0 text-black px-4 py-1.5 rounded-md text-xs font-semibold cursor-pointer hover:bg-white/90 transition-all"
//             >
//               Reset Workspace
//             </button>
//           </div>
//         )}

//         {/* THE PAGE POP SUMMARY CARD COMPONENT */}
//         {!isProcessingDocument && documentPages.length > 0 && (
//           <div className="flex-1 flex flex-col justify-between overflow-hidden mt-4 pt-2">
            
//             <div className="flex-1 overflow-y-auto pr-1">
//               <div className="w-full max-w-2xl mx-auto bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 md:p-6 box-border shadow-2xl">
                
//                 <div className="flex items-center justify-between border-b border-white/[0.05] pb-3 mb-4">
//                   <div className="min-w-0 pr-3">
//                     <span className="text-[10px] text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded font-mono font-semibold uppercase tracking-wider">
//                       Page Summary Track
//                     </span>
//                     <h4 className="text-white text-xs mt-1.5 mb-0 font-normal truncate max-w-md">
//                       File: <span className="text-white/60 font-mono text-[11px]">{uploadedFile?.name}</span>
//                     </h4>
//                   </div>
//                   <span className="text-xs font-mono font-bold bg-white/[0.05] px-2.5 py-1 rounded text-white/80 shrink-0">
//                     PAGE {currentPageIndex + 1} / {documentPages.length}
//                   </span>
//                 </div>

//                 {/* Synthesis Output Area */}
//                 <div className="text-white/90 text-xs leading-relaxed min-h-[200px]">
//                   {isPageLoading ? (
//                     <div className="flex flex-col items-center justify-center gap-2.5 h-[200px]">
//                       <Loader size={16} className="animate-spin text-indigo-400" />
//                       <span className="text-white/40 text-[11px] italic">Generating simple summaries...</span>
//                     </div>
//                   ) : (
//                     <div className="animate-in fade-in slide-in-from-bottom-1 duration-200 whitespace-pre-wrap break-words text-white/85">
//                       {cachedSummaries[currentPageIndex] || (
//                         <p className="text-white/30 italic text-center text-[11px] py-8">Inference pipeline track idle.</p>
//                       )}
//                     </div>
//                   )}
//                 </div>

//               </div>
//             </div>

//             {/* BUTTON BAR PANEL CONTROLS */}
//             <div className="flex items-center justify-between border-t border-white/[0.05] pt-4 mt-4 shrink-0 max-w-2xl w-full mx-auto">
//               <button
//                 onClick={resetWorkspacePipeline}
//                 className="px-4 py-2 rounded-lg border border-white/10 text-white/60 hover:text-white bg-transparent text-xs cursor-pointer hover:bg-white/[0.04] transition-all flex items-center justify-center gap-1"
//               >
//                 Close Panel
//               </button>

//               <div className="flex gap-2">
//                 <button
//                   onClick={handlePreviousPageAction}
//                   disabled={currentPageIndex === 0 || isPageLoading}
//                   className="px-4 py-2 rounded-lg border border-white/10 text-white bg-white/[0.01] text-xs font-medium cursor-pointer flex items-center gap-1 disabled:opacity-25 disabled:cursor-not-allowed hover:bg-white/[0.04] transition-all"
//                 >
//                   <ChevronLeft size={13} />
//                   <span>Back</span>
//                 </button>

//                 <button
//                   onClick={handleNextPageAction}
//                   disabled={currentPageIndex === documentPages.length - 1 || isPageLoading}
//                   className="px-4 py-2 rounded-lg bg-indigo-500 text-white font-semibold text-xs border-0 cursor-pointer flex items-center gap-1 disabled:opacity-25 disabled:cursor-not-allowed hover:bg-indigo-600 transition-all"
//                 >
//                   <span>Next Page</span>
//                   <ChevronRight size={13} />
//                 </button>
//               </div>
//             </div>

//           </div>
//         )}
//       </div>
//     </div>
//   )
// }













// 'use client'

// import { useState, useRef, useEffect } from 'react'
// import {
//   Send,
//   Bot,
//   User,
//   Loader,
//   Sparkles,
//   FolderOpen,
//   UploadCloud,
//   ChevronLeft,
//   ChevronRight,
//   X,
//   AlertCircle,
//   FileText
// } from 'lucide-react'

// const GROQ_API_URL = process.env.NEXT_PUBLIC_GROQ_BASE_URL || 'https://api.groq.com/openai/v1'
// const CHAT_MODEL = 'meta-llama/llama-4-scout-17b-16e-instruct'

// export default function LibraryAssistant() {
//   /* ==========================================
//      CHAT STATE MANAGEMENT
//      ========================================== */
//   const [messages, setMessages] = useState([
//     {
//       id: 'init',
//       role: 'assistant',
//       content: 'Habari! I am your AI Smart Library Companion. Upload any file (.pdf, .docx, .txt, .csv, .json) in the workspace on the right to read it page-by-page in simple terms.'
//     }
//   ])

//   const [inputValue, setInputValue] = useState('')
//   const [isChatLoading, setIsChatLoading] = useState(false)
//   const [chatSystemError, setChatSystemError] = useState(null)
//   const chatBottomRef = useRef(null)

//   /* ==========================================
//      DOCUMENT WORKSPACE STATE MANAGEMENT
//      ========================================== */
//   const [uploadedFile, setUploadedFile] = useState(null)
//   const [documentPages, setDocumentPages] = useState([]) 
//   const [currentPageIndex, setCurrentPageIndex] = useState(0)
//   const [isProcessingDocument, setIsProcessingDocument] = useState(false)
//   const [processingError, setProcessingError] = useState(null)
  
//   const [cachedSummaries, setCachedSummaries] = useState({})
//   const [isPageLoading, setIsPageLoading] = useState(false)
//   const fileInputRef = useRef(null)

//   useEffect(() => {
//     chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' })
//   }, [messages, isChatLoading])

//   /* ==========================================
//      CHAT TUNNEL ROUTINES
//      ========================================== */
//   const transmitChatInference = async (chatHistory) => {
//     const token = typeof window !== 'undefined'
//       ? localStorage.getItem('groq_access_token') || localStorage.getItem('access_token') || process.env.NEXT_PUBLIC_GROQ_API_KEY
//       : process.env.NEXT_PUBLIC_GROQ_API_KEY

//     if (!token || token === 'undefined') {
//       return 'Missing GROQ API authorization token. Please set it in your environment or localStorage.'
//     }

//     const cleanToken = String(token).replace(/['"`;]/g, '').trim()

//     const response = await fetch(`${GROQ_API_URL}/chat/completions`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${cleanToken}`
//       },
//       body: JSON.stringify({
//         model: CHAT_MODEL,
//         temperature: 0.4,
//         max_tokens: 600,
//         messages: [
//           {
//             role: 'system',
//             content: 'You are an elite academic companion. Deliver direct, accessible, and crystal-clear breakdowns of complex educational queries.'
//           },
//           ...chatHistory.filter(m => m.id !== 'init').map(m => ({
//             role: m.role === 'user' ? 'user' : 'assistant',
//             content: m.content
//           }))
//         ]
//       })
//     })

//     if (!response.ok) throw new Error(`Chat connection failure (${response.status})`)
//     const data = await response.json()
//     return data?.choices?.[0]?.message?.content || 'No response captured.'
//   }

//   const handleSendChatMessage = async (e) => {
//     e.preventDefault()
//     if (!inputValue.trim() || isChatLoading) return

//     const userMessage = {
//       id: Date.now().toString(),
//       role: 'user',
//       content: inputValue
//     }

//     const updatedMessages = [...messages, userMessage]
//     setMessages(updatedMessages)
//     setInputValue('')
//     setIsChatLoading(true)
//     setChatSystemError(null)

//     try {
//       const aiResponse = await transmitChatInference(updatedMessages)
//       setMessages(prev => [...prev, {
//         id: (Date.now() + 1).toString(),
//         role: 'assistant',
//         content: aiResponse
//       }])
//     } catch (error) {
//       setChatSystemError(error.message)
//     } finally {
//       setIsChatLoading(false)
//     }
//   }

//   /* ==========================================
//      UNIVERSAL FILE TEXT EXTRACTOR
//      ========================================== */
//   const parseDocumentToPages = (file, extension) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader()

//       if (['pdf', 'docx', 'xlsx', 'xls'].includes(extension)) {
//         reader.readAsArrayBuffer(file)
//       } else {
//         reader.readAsText(file)
//       }

//       reader.onload = async (event) => {
//         try {
//           let chunks = []
//           const buffer = event.target.result

//           if (extension === 'docx') {
//             const dec = new TextDecoder('utf-8')
//             const textString = dec.decode(new Uint8Array(buffer))
//             const matchParagraphs = textString.match(/<w:t[^>]*>(.*?)<\/w:t>/g)
            
//             let combinedText = ""
//             if (matchParagraphs) {
//               combinedText = matchParagraphs
//                 .map(val => val.replace(/<[^>]+>/g, ''))
//                 .join(' ')
//             } else {
//               combinedText = textString.replace(/[^\x20-\x7E\s]/g, '')
//             }
            
//             const cleanedText = combinedText.replace(/\s+/g, ' ').trim()
//             const itemsPerPage = 1500
//             for (let i = 0; i < cleanedText.length; i += itemsPerPage) {
//               chunks.push(cleanedText.substring(i, i + itemsPerPage))
//             }
//           }
//           else if (extension === 'pdf') {
//             const pdfjsLib = window['pdfjs-dist/build/pdf']
//             if (!pdfjsLib) {
//               await new Promise((res) => {
//                 const s = document.createElement('script')
//                 s.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js'
//                 s.onload = res
//                 document.head.appendChild(s)
//               })
//             }
//             const pdfjs = window['pdfjs-dist/build/pdf']
//             pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js'
            
//             const pdf = await pdfjs.getDocument({ data: buffer }).promise
//             for (let num = 1; num <= pdf.numPages; num++) {
//               const page = await pdf.getPage(num)
//               const contents = await page.getTextContent()
//               const aggregatedText = contents.items.map(item => item.str).join(' ')
//               chunks.push(aggregatedText.trim())
//             }
//           }
//           else {
//             const cleanTextString = typeof buffer === 'string' ? buffer : new TextDecoder('utf-8').decode(new Uint8Array(buffer))
//             const textBody = cleanTextString.trim()
            
//             const charactersPerPage = 2000
//             for (let i = 0; i < textBody.length; i += charactersPerPage) {
//               chunks.push(textBody.substring(i, i + charactersPerPage))
//             }
//           }

//           const finalChunks = chunks.map(c => c.trim()).filter(c => c.length > 0)
//           resolve(finalChunks)
//         } catch (e) {
//           reject(new Error(`Parsing track layout error: ${e.message}`))
//         }
//       }
//       reader.onerror = () => reject(new Error('Unable to capture file buffer stream.'))
//     })
//   }

//   /* ==========================================
//      CORE WORKSPACE PROCESSING INTERACTION
//      ========================================== */
//   const processSelectedFile = async (e) => {
//     const file = e.target.files?.[0]
//     if (!file) return

//     setUploadedFile(file)
//     setIsProcessingDocument(true)
//     setProcessingError(null)
//     setDocumentPages([])
//     setCachedSummaries({})
//     setCurrentPageIndex(0)

//     const fileExtension = file.name.split('.').pop()?.toLowerCase()

//     try {
//       const extractedPagesArray = await parseDocumentToPages(file, fileExtension)
      
//       if (extractedPagesArray.length === 0) {
//         extractedPagesArray.push(`[Document Summary Node Matrix]\nFile Name: ${file.name}\n\nRaw text extraction completed.`);
//       }

//       setDocumentPages(extractedPagesArray)
//       await fetchPageSummary(0, extractedPagesArray)
//     } catch (err) {
//       setDocumentPages([`Error encountered during layout mapping: ${err.message}`])
//       setProcessingError(err.message)
//     } finally {
//       setIsProcessingDocument(false)
//     }
//   }

//   const fetchPageSummary = async (pageIndex, pagesArray = documentPages) => {
//     if (cachedSummaries[pageIndex]) return 

//     setIsPageLoading(true)
    
//     const token = typeof window !== 'undefined'
//       ? localStorage.getItem('groq_access_token') || localStorage.getItem('access_token') || process.env.NEXT_PUBLIC_GROQ_API_KEY
//       : process.env.NEXT_PUBLIC_GROQ_API_KEY

//     if (!token) {
//       setCachedSummaries(prev => ({
//         ...prev,
//         [pageIndex]: "Missing GROQ API access key setup. Configure your keys inside your developer workspace localStorage to initialize summaries."
//       }))
//       setIsPageLoading(false)
//       return
//     }

//     const cleanToken = String(token).replace(/['"`;]/g, '').trim()
//     const textSnippet = pagesArray[pageIndex] || ''

//     try {
//       const response = await fetch(`${GROQ_API_URL}/chat/completions`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${cleanToken}`
//         },
//         body: JSON.stringify({
//           model: CHAT_MODEL,
//           temperature: 0.2,
//           max_tokens: 500,
//           messages: [
//             {
//               role: 'system',
//               content: 'You are an advanced academic companion. Explain the provided text in an ultra-simple, clear paragraph, then provide 3 simple takeaway points using the "•" character.'
//             },
//             {
//               role: 'user',
//               content: `Provide a simple summary for this layout data block (Page Ref: ${pageIndex + 1}):\n\n${textSnippet}`
//             }
//           ]
//         })
//       })

//       if (!response.ok) throw new Error(`Server returned error status ${response.status}`)
      
//       const data = await response.json()
//       const aiContent = data?.choices?.[0]?.message?.content || 'No summary could be compiled.'
      
//       setCachedSummaries(prev => ({ ...prev, [pageIndex]: aiContent }))
//     } catch (err) {
//       setCachedSummaries(prev => ({
//         ...prev,
//         [pageIndex]: `Inference failed: ${err.message}.`
//       }))
//     } finally {
//       setIsPageLoading(false)
//     }
//   }

//   /* ==========================================
//      CARD BUTTON LOGIC INTERACTION
//      ========================================== */
//   const handleNextPageAction = () => {
//     const nextIndex = currentPageIndex + 1
//     if (nextIndex < documentPages.length && !isPageLoading) {
//       setCurrentPageIndex(nextIndex)
//       if (!cachedSummaries[nextIndex]) {
//         fetchPageSummary(nextIndex)
//       }
//     }
//   }

//   const handlePreviousPageAction = () => {
//     if (currentPageIndex > 0 && !isPageLoading) {
//       setCurrentPageIndex(currentPageIndex - 1)
//     }
//   }

//   const resetWorkspacePipeline = () => {
//     setUploadedFile(null)
//     setDocumentPages([])
//     setCachedSummaries({})
//     setCurrentPageIndex(0)
//     setProcessingError(null)
//     if (fileInputRef.current) fileInputRef.current.value = ''
//   }

//   return (
//     <div className="w-full bg-[#07070a] text-white p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[calc(100vh-56px)] box-border">
      
//       {/* ================= CHAT COMPONENT SIDEBAR ================= */}
//       <div className="bg-[#111] border border-white/[0.06] rounded-xl flex flex-col h-[85vh] overflow-hidden shadow-xl w-full box-border">
//         <div className="px-4 py-3.5 border-b border-white/[0.06] bg-white/[0.01] flex items-center gap-2 shrink-0">
//           <Sparkles size={14} className="text-indigo-400" />
//           <h3 className="text-[11px] uppercase tracking-wider text-white/70 font-semibold m-0">
//             Tutor Consultation Terminal
//           </h3>
//         </div>

//         <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-black/[0.05]">
//           {messages.map((msg) => (
//             <div
//               key={msg.id}
//               className={`flex gap-2.5 max-w-[88%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
//             >
//               <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border mt-0.5 ${
//                 msg.role === 'user' ? 'bg-white/[0.06] border-white/10' : 'bg-indigo-500/10 border-indigo-500/20'
//               }`}>
//                 {msg.role === 'user' ? <User size={11} className="text-white/80" /> : <Bot size={11} className="text-indigo-400" />}
//               </div>

//               <div className={`p-3 rounded-xl border text-xs leading-relaxed whitespace-pre-wrap break-words ${
//                 msg.role === 'user' 
//                   ? 'bg-indigo-500/[0.05] border-indigo-500/20 text-white rounded-tr-none' 
//                   : 'bg-white/[0.02] border-white/[0.05] text-white/85 rounded-tl-none'
//               }`}>
//                 {msg.content}
//               </div>
//             </div>
//           ))}

//           {isChatLoading && (
//             <div className="text-white/40 text-xs flex items-center gap-2 pl-1 italic">
//               <Loader size={12} className="animate-spin text-indigo-400" />
//               Compiling...
//             </div>
//           )}

//           {chatSystemError && (
//             <div className="p-3 bg-red-500/[0.02] border border-red-500/15 rounded-lg text-[11px] font-mono text-red-400 break-words">
//               {chatSystemError}
//             </div>
//           )}
//           <div ref={chatBottomRef} />
//         </div>

//         <form onSubmit={handleSendChatMessage} className="p-3 border-t border-white/[0.06] bg-black/20 flex gap-2 shrink-0">
//           <input
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//             className="flex-1 bg-white/[0.03] text-white placeholder-white/25 text-xs px-3 py-2.5 rounded-lg border border-white/[0.07] outline-none"
//             placeholder="Ask your tutor assistant..."
//           />
//           <button 
//             type="submit"
//             disabled={!inputValue.trim() || isChatLoading}
//             className="w-9 h-9 bg-indigo-500 text-white rounded-lg flex items-center justify-center border-0 cursor-pointer hover:bg-indigo-600 transition-all shrink-0"
//           >
//             <Send size={13} />
//           </button>
//         </form>
//       </div>

//       {/* ================= MAIN WORKSPACE (MATCHED SIZE POP CARD VIEW) ================= */}
//       <div className="bg-[#0b0b11] border border-white/[0.06] rounded-xl p-5 lg:p-6 h-[85vh] flex flex-col shadow-xl overflow-hidden w-full box-border">
        
//         <div className="flex items-center gap-2 pb-4 border-b border-white/[0.04] shrink-0">
//           <FolderOpen size={16} className="text-indigo-400" />
//           <h2 className="text-white text-sm font-semibold m-0">
//             Academic Document Workspace Hub
//           </h2>
//         </div>

//         {/* CONDITION 1: FILE SELECTION UPLOADER (Default view) */}
//         {!uploadedFile && !isProcessingDocument && (
//           <div className="flex-1 flex flex-col justify-center py-6">
//             <label className="flex flex-col items-center justify-center py-16 px-4 border-2 border-dashed border-white/10 hover:border-white/20 bg-white/[0.01] hover:bg-white/[0.02] rounded-xl cursor-pointer transition-all text-center max-w-xl mx-auto w-full box-border">
//               <UploadCloud size={36} className="text-white/30 mb-3" />
//               <p className="text-white/80 text-sm font-medium m-0 mb-1">Upload Study Material Asset</p>
//               <p className="text-white/35 text-[11px] max-w-xs leading-normal m-0">
//                 Click to parse PDF, DOCX, XLSX, TXT, CSV, or JSON for clear page summaries
//               </p>
//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 hidden
//                 accept=".txt,.md,.csv,.json,.pdf,.docx,.xlsx,.rtf"
//                 onChange={processSelectedFile}
//               />
//             </label>
//           </div>
//         )}

//         {/* CONDITION 2: INITIAL EXTRACTION LOADER */}
//         {isProcessingDocument && (
//           <div className="flex flex-1 flex-col items-center justify-center text-white/50 gap-2.5">
//             <Loader size={20} className="animate-spin text-indigo-400" />
//             <span className="text-xs tracking-wide">Reading text layers and splitting page indexes...</span>
//           </div>
//         )}

//         {/* CONDITION 3: ASSIGNMENT COMPLETED -> SHOW CARD HUB WITH BUTTONS */}
//         {documentPages.length > 0 && (
//           <div className="flex-1 flex flex-col justify-between overflow-hidden mt-4 pt-2">
            
//             {/* Pop Card Body Wrapper */}
//             <div className="flex-1 overflow-y-auto pr-1">
//               <div className="w-full max-w-2xl mx-auto bg-white/[0.03] border border-indigo-500/20 rounded-xl p-5 md:p-6 box-border shadow-2xl relative">
                
//                 {/* Header Information Meta Data Inside the Card */}
//                 <div className="flex items-center justify-between border-b border-white/[0.05] pb-3 mb-4">
//                   <div className="min-w-0 pr-3 flex items-center gap-2">
//                     <FileText size={14} className="text-indigo-400 shrink-0" />
//                     <div className="truncate">
//                       <span className="text-[9px] font-mono text-indigo-400 font-bold uppercase tracking-widest block">Active Work Card</span>
//                       <h4 className="text-white text-xs mt-0.5 mb-0 font-medium truncate max-w-[180px] sm:max-w-md">
//                         {uploadedFile?.name || 'Processing Ingestion'}
//                       </h4>
//                     </div>
//                   </div>
//                   <span className="text-xs font-mono font-bold bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded text-indigo-400 shrink-0">
//                     PAGE {currentPageIndex + 1} / {documentPages.length}
//                   </span>
//                 </div>

//                 {/* Main AI Explanation Space */}
//                 <div className="text-white/90 text-xs leading-relaxed min-h-[180px] bg-black/20 p-4 rounded-lg border border-white/[0.03]">
//                   {isPageLoading ? (
//                     <div className="flex flex-col items-center justify-center gap-2.5 h-[180px]">
//                       <Loader size={16} className="animate-spin text-indigo-400" />
//                       <span className="text-white/40 text-[11px] italic">Translating into simple student terms...</span>
//                     </div>
//                   ) : (
//                     <div className="whitespace-pre-wrap break-words text-white/85 text-xs font-normal">
//                       {cachedSummaries[currentPageIndex] || (
//                         <p className="text-white/30 italic text-center text-[11px] py-8">Parsing complete. Synchronizing AI summary output...</p>
//                       )}
//                     </div>
//                   )}
//                 </div>

//                 {/* Localized alert if binary reading ran into system issues */}
//                 {processingError && (
//                   <div className="mt-3 p-2 bg-red-500/10 border border-red-500/20 rounded text-[10px] font-mono text-red-400 flex items-center gap-1.5">
//                     <AlertCircle size={12} />
//                     <span>Layout notice: {processingError}</span>
//                   </div>
//                 )}

//               </div>
//             </div>

//             {/* MANDATORY CONTROL ROW (Close Panel, Back, Next Page) */}
//             <div className="flex items-center justify-between border-t border-white/[0.05] pt-4 mt-4 shrink-0 max-w-2xl w-full mx-auto">
//               <button
//                 onClick={resetWorkspacePipeline}
//                 className="px-4 py-2 rounded-lg border border-red-500/20 hover:border-red-500/40 text-red-400 bg-red-500/[0.02] hover:bg-red-500/[0.05] text-xs font-medium cursor-pointer transition-all flex items-center justify-center gap-1 shadow-sm"
//               >
//                 <X size={12} />
//                 <span>Close Panel</span>
//               </button>

//               <div className="flex gap-2">
//                 <button
//                   onClick={handlePreviousPageAction}
//                   disabled={currentPageIndex === 0 || isPageLoading}
//                   className="px-4 py-2 rounded-lg border border-white/10 text-white bg-white/[0.01] text-xs font-medium cursor-pointer flex items-center gap-1 disabled:opacity-25 disabled:cursor-not-allowed hover:bg-white/[0.04] transition-all"
//                 >
//                   <ChevronLeft size={13} />
//                   <span>Back</span>
//                 </button>

//                 <button
//                   onClick={handleNextPageAction}
//                   disabled={currentPageIndex === documentPages.length - 1 || isPageLoading}
//                   className="px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-semibold text-xs border-0 cursor-pointer flex items-center gap-1 disabled:opacity-25 disabled:cursor-not-allowed transition-all shadow-md"
//                 >
//                   <span>Next Page</span>
//                   <ChevronRight size={13} />
//                 </button>
//               </div>
//             </div>

//           </div>
//         )}
//       </div>
//     </div>
//   )
// }













// 'use client'

// import { useState, useRef, useEffect } from 'react'
// import {
//   Send,
//   Bot,
//   User,
//   Loader,
//   Sparkles,
//   FolderOpen,
//   UploadCloud,
//   ChevronLeft,
//   ChevronRight,
//   X,
//   AlertCircle,
//   FileText
// } from 'lucide-react'

// const GROQ_API_URL = process.env.NEXT_PUBLIC_GROQ_BASE_URL || 'https://api.groq.com/openai/v1'
// const CHAT_MODEL = 'meta-llama/llama-4-scout-17b-16e-instruct'

// export default function LibraryAssistant() {
//   /* ==========================================
//      CHAT STATE MANAGEMENT
//      ========================================== */
//   const [messages, setMessages] = useState([
//     {
//       id: 'init',
//       role: 'assistant',
//       content: 'Habari! I am your AI Smart Library Companion. Upload any file (.pdf, .docx, .txt, .csv, .json) in the workspace on the right to read it page-by-page in simple terms.'
//     }
//   ])

//   const [inputValue, setInputValue] = useState('')
//   const [isChatLoading, setIsChatLoading] = useState(false)
//   const [chatSystemError, setChatSystemError] = useState(null)
//   const chatBottomRef = useRef(null)

//   /* ==========================================
//      DOCUMENT WORKSPACE STATE MANAGEMENT
//      ========================================== */
//   const [uploadedFile, setUploadedFile] = useState(null)
//   const [documentPages, setDocumentPages] = useState([]) 
//   const [currentPageIndex, setCurrentPageIndex] = useState(0)
//   const [isProcessingDocument, setIsProcessingDocument] = useState(false)
//   const [processingError, setProcessingError] = useState(null)
  
//   const [cachedSummaries, setCachedSummaries] = useState({})
//   const [isPageLoading, setIsPageLoading] = useState(false)
//   const fileInputRef = useRef(null)

//   useEffect(() => {
//     chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' })
//   }, [messages, isChatLoading])

//   /* ==========================================
//      CHAT TUNNEL ROUTINES
//      ========================================== */
//   const transmitChatInference = async (chatHistory) => {
//     const token = typeof window !== 'undefined'
//       ? localStorage.getItem('groq_access_token') || localStorage.getItem('access_token') || process.env.NEXT_PUBLIC_GROQ_API_KEY
//       : process.env.NEXT_PUBLIC_GROQ_API_KEY

//     if (!token || token === 'undefined') {
//       return 'Missing GROQ API authorization token. Please set it in your environment or localStorage.'
//     }

//     const cleanToken = String(token).replace(/['"`;]/g, '').trim()

//     const response = await fetch(`${GROQ_API_URL}/chat/completions`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${cleanToken}`
//       },
//       body: JSON.stringify({
//         model: CHAT_MODEL,
//         temperature: 0.4,
//         max_tokens: 600,
//         messages: [
//           {
//             role: 'system',
//             content: 'You are an elite academic companion. Deliver direct, accessible, and crystal-clear breakdowns of complex educational queries.'
//           },
//           ...chatHistory.filter(m => m.id !== 'init').map(m => ({
//             role: m.role === 'user' ? 'user' : 'assistant',
//             content: m.content
//           }))
//         ]
//       })
//     })

//     if (!response.ok) throw new Error(`Chat connection failure (${response.status})`)
//     const data = await response.json()
//     return data?.choices?.[0]?.message?.content || 'No response captured.'
//   }

//   const handleSendChatMessage = async (e) => {
//     e.preventDefault()
//     if (!inputValue.trim() || isChatLoading) return

//     const userMessage = {
//       id: Date.now().toString(),
//       role: 'user',
//       content: inputValue
//     }

//     const updatedMessages = [...messages, userMessage]
//     setMessages(updatedMessages)
//     setInputValue('')
//     setIsChatLoading(true)
//     setChatSystemError(null)

//     try {
//       const aiResponse = await transmitChatInference(updatedMessages)
//       setMessages(prev => [...prev, {
//         id: (Date.now() + 1).toString(),
//         role: 'assistant',
//         content: aiResponse
//       }])
//     } catch (error) {
//       setChatSystemError(error.message)
//     } finally {
//       setIsChatLoading(false)
//     }
//   }

//   /* ==========================================
//      UNIVERSAL FILE TEXT EXTRACTOR
//      ========================================== */
//   const parseDocumentToPages = (file, extension) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader()

//       if (['pdf', 'docx', 'xlsx', 'xls'].includes(extension)) {
//         reader.readAsArrayBuffer(file)
//       } else {
//         reader.readAsText(file)
//       }

//       reader.onload = async (event) => {
//         try {
//           let chunks = []
//           const buffer = event.target.result

//           if (extension === 'docx') {
//             // 🛠️ Professional Browser-Side Microsoft Word Extraction Engine Injection
//             if (!window.mammoth) {
//               await new Promise((res, rej) => {
//                 const script = document.createElement('script')
//                 script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js'
//                 script.onload = res
//                 script.onerror = rej
//                 document.head.appendChild(script)
//               })
//             }

//             const result = await window.mammoth.extractRawText({ arrayBuffer: buffer })
//             const cleanRawText = result.value || ""

//             // Split on double line breaks to protect paragraph and structural clean page lines
//             const paragraphs = cleanRawText.split('\n\n')
//               .map(p => p.trim())
//               .filter(p => p.length > 10)

//             let currentChunk = ""
//             for (let i = 0; i < paragraphs.length; i++) {
//               currentChunk += paragraphs[i] + "\n\n"
//               // Keep page text targets tightly limited to 1500 chars to avoid model context bleed
//               if (currentChunk.length >= 1500 || i === paragraphs.length - 1) {
//                 chunks.push(currentChunk.trim())
//                 currentChunk = ""
//               }
//             }
//           }
//           else if (extension === 'pdf') {
//             const pdfjsLib = window['pdfjs-dist/build/pdf']
//             if (!pdfjsLib) {
//               await new Promise((res) => {
//                 const s = document.createElement('script')
//                 s.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js'
//                 s.onload = res
//                 document.head.appendChild(s)
//               })
//             }
//             const pdfjs = window['pdfjs-dist/build/pdf']
//             pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js'
            
//             const pdf = await pdfjs.getDocument({ data: buffer }).promise
//             for (let num = 1; num <= pdf.numPages; num++) {
//               const page = await pdf.getPage(num)
//               const contents = await page.getTextContent()
//               const aggregatedText = contents.items.map(item => item.str).join(' ')
//               chunks.push(aggregatedText.trim())
//             }
//           }
//           else {
//             const cleanTextString = typeof buffer === 'string' ? buffer : new TextDecoder('utf-8').decode(new Uint8Array(buffer))
//             const textBody = cleanTextString.trim()
            
//             const charactersPerPage = 2000
//             for (let i = 0; i < textBody.length; i += charactersPerPage) {
//               chunks.push(textBody.substring(i, i + charactersPerPage))
//             }
//           }

//           const finalChunks = chunks.map(c => c.trim()).filter(c => c.length > 0)
//           resolve(finalChunks)
//         } catch (e) {
//           reject(new Error(`Parsing track layout error: ${e.message}`))
//         }
//       }
//       reader.onerror = () => reject(new Error('Unable to capture file buffer stream.'))
//     })
//   }

//   /* ==========================================
//      CORE WORKSPACE PROCESSING INTERACTION
//      ========================================== */
//   const processSelectedFile = async (e) => {
//     const file = e.target.files?.[0]
//     if (!file) return

//     setUploadedFile(file)
//     setIsProcessingDocument(true)
//     setProcessingError(null)
//     setDocumentPages([])
//     setCachedSummaries({})
//     setCurrentPageIndex(0)

//     const fileExtension = file.name.split('.').pop()?.toLowerCase()

//     try {
//       const extractedPagesArray = await parseDocumentToPages(file, fileExtension)
      
//       if (extractedPagesArray.length === 0) {
//         extractedPagesArray.push(`[Document Summary Node Matrix]\nFile Name: ${file.name}\n\nRaw text extraction completed.`);
//       }

//       setDocumentPages(extractedPagesArray)
//       await fetchPageSummary(0, extractedPagesArray)
//     } catch (err) {
//       setDocumentPages([`Error encountered during layout mapping: ${err.message}`])
//       setProcessingError(err.message)
//     } finally {
//       setIsProcessingDocument(false)
//     }
//   }

//   const fetchPageSummary = async (pageIndex, pagesArray = documentPages) => {
//     if (cachedSummaries[pageIndex]) return 

//     setIsPageLoading(true)
    
//     const token = typeof window !== 'undefined'
//       ? localStorage.getItem('groq_access_token') || localStorage.getItem('access_token') || process.env.NEXT_PUBLIC_GROQ_API_KEY
//       : process.env.NEXT_PUBLIC_GROQ_API_KEY

//     if (!token) {
//       setCachedSummaries(prev => ({
//         ...prev,
//         [pageIndex]: "Missing GROQ API access key setup. Configure your keys inside your developer workspace localStorage to initialize summaries."
//       }))
//       setIsPageLoading(false)
//       return
//     }

//     const cleanToken = String(token).replace(/['"`;]/g, '').trim()
//     const textSnippet = pagesArray[pageIndex] || ''

//     try {
//       const response = await fetch(`${GROQ_API_URL}/chat/completions`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${cleanToken}`
//         },
//         body: JSON.stringify({
//           model: CHAT_MODEL,
//           temperature: 0.1, // Dropped temperature to minimum to completely eliminate AI phrasal repetition
//           max_tokens: 500,
//           messages: [
//             {
//               role: 'system',
//               content: 'You are an isolated page-by-page textbook analyst. You must write an entirely unique evaluation matching ONLY the text content wrapped inside the structural user boundaries. Do NOT hallucinate concepts, do NOT carry over themes or vocabulary from previous blocks, and do NOT write introductory filler lines. Deliver one conversational paragraph overview, then add 3 custom bullet highlights utilizing the "•" symbol.'
//             },
//             {
//               role: 'user',
//               content: `Document: ${uploadedFile?.name || 'Academic Material'}\nTarget Range: PAGE ${pageIndex + 1} OF ${pagesArray.length}\n\n--- TARGET CONTEXT BLOCK START ---\n${textSnippet}\n--- TARGET CONTEXT BLOCK END ---`
//             }
//           ]
//         })
//       })

//       if (!response.ok) throw new Error(`Server returned error status ${response.status}`)
      
//       const data = await response.json()
//       const aiContent = data?.choices?.[0]?.message?.content || 'No summary could be compiled.'
      
//       setCachedSummaries(prev => ({ ...prev, [pageIndex]: aiContent }))
//     } catch (err) {
//       setCachedSummaries(prev => ({
//         ...prev,
//         [pageIndex]: `Inference failed: ${err.message}.`
//       }))
//     } finally {
//       setIsPageLoading(false)
//     }
//   }

//   /* ==========================================
//      CARD BUTTON LOGIC INTERACTION
//      ========================================== */
//   const handleNextPageAction = () => {
//     const nextIndex = currentPageIndex + 1
//     if (nextIndex < documentPages.length && !isPageLoading) {
//       setCurrentPageIndex(nextIndex)
//       if (!cachedSummaries[nextIndex]) {
//         fetchPageSummary(nextIndex)
//       }
//     }
//   }

//   const handlePreviousPageAction = () => {
//     if (currentPageIndex > 0 && !isPageLoading) {
//       setCurrentPageIndex(currentPageIndex - 1)
//     }
//   }

//   const resetWorkspacePipeline = () => {
//     setUploadedFile(null)
//     setDocumentPages([])
//     setCachedSummaries({})
//     setCurrentPageIndex(0)
//     setProcessingError(null)
//     if (fileInputRef.current) fileInputRef.current.value = ''
//   }

//   return (
//     <div className="w-full bg-[#07070a] text-white p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[calc(100vh-56px)] box-border">
      
//       {/* ================= CHAT COMPONENT SIDEBAR ================= */}
//       <div className="bg-[#111] border border-white/[0.06] rounded-xl flex flex-col h-[85vh] overflow-hidden shadow-xl w-full box-border">
//         <div className="px-4 py-3.5 border-b border-white/[0.06] bg-white/[0.01] flex items-center gap-2 shrink-0">
//           <Sparkles size={14} className="text-indigo-400" />
//           <h3 className="text-[11px] uppercase tracking-wider text-white/70 font-semibold m-0">
//             Tutor Consultation Terminal
//           </h3>
//         </div>

//         <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-black/[0.05]">
//           {messages.map((msg) => (
//             <div
//               key={msg.id}
//               className={`flex gap-2.5 max-w-[88%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
//             >
//               <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border mt-0.5 ${
//                 msg.role === 'user' ? 'bg-white/[0.06] border-white/10' : 'bg-indigo-500/10 border-indigo-500/20'
//               }`}>
//                 {msg.role === 'user' ? <User size={11} className="text-white/80" /> : <Bot size={11} className="text-indigo-400" />}
//               </div>

//               <div className={`p-3 rounded-xl border text-xs leading-relaxed whitespace-pre-wrap break-words ${
//                 msg.role === 'user' 
//                   ? 'bg-indigo-500/[0.05] border-indigo-500/20 text-white rounded-tr-none' 
//                   : 'bg-white/[0.02] border-white/[0.05] text-white/85 rounded-tl-none'
//               }`}>
//                 {msg.content}
//               </div>
//             </div>
//           ))}

//           {isChatLoading && (
//             <div className="text-white/40 text-xs flex items-center gap-2 pl-1 italic">
//               <Loader size={12} className="animate-spin text-indigo-400" />
//               Compiling...
//             </div>
//           )}

//           {chatSystemError && (
//             <div className="p-3 bg-red-500/[0.02] border border-red-500/15 rounded-lg text-[11px] font-mono text-red-400 break-words">
//               {chatSystemError}
//             </div>
//           )}
//           <div ref={chatBottomRef} />
//         </div>

//         <form onSubmit={handleSendChatMessage} className="p-3 border-t border-white/[0.06] bg-black/20 flex gap-2 shrink-0">
//           <input
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//             className="flex-1 bg-white/[0.03] text-white placeholder-white/25 text-xs px-3 py-2.5 rounded-lg border border-white/[0.07] outline-none"
//             placeholder="Ask your tutor assistant..."
//           />
//           <button 
//             type="submit"
//             disabled={!inputValue.trim() || isChatLoading}
//             className="w-9 h-9 bg-indigo-500 text-white rounded-lg flex items-center justify-center border-0 cursor-pointer hover:bg-indigo-600 transition-all shrink-0"
//           >
//             <Send size={13} />
//           </button>
//         </form>
//       </div>

//       {/* ================= MAIN WORKSPACE (MATCHED SIZE POP CARD VIEW) ================= */}
//       <div className="bg-[#0b0b11] border border-white/[0.06] rounded-xl p-5 lg:p-6 h-[85vh] flex flex-col shadow-xl overflow-hidden w-full box-border">
        
//         <div className="flex items-center gap-2 pb-4 border-b border-white/[0.04] shrink-0">
//           <FolderOpen size={16} className="text-indigo-400" />
//           <h2 className="text-white text-sm font-semibold m-0">
//             Academic Document Workspace Hub
//           </h2>
//         </div>

//         {/* CONDITION 1: FILE SELECTION UPLOADER */}
//         {!uploadedFile && !isProcessingDocument && (
//           <div className="flex-1 flex flex-col justify-center py-6">
//             <label className="flex flex-col items-center justify-center py-16 px-4 border-2 border-dashed border-white/10 hover:border-white/20 bg-white/[0.01] hover:bg-white/[0.02] rounded-xl cursor-pointer transition-all text-center max-w-xl mx-auto w-full box-border">
//               <UploadCloud size={36} className="text-white/30 mb-3" />
//               <p className="text-white/80 text-sm font-medium m-0 mb-1">Upload Study Material Asset</p>
//               <p className="text-white/35 text-[11px] max-w-xs leading-normal m-0">
//                 Click to parse PDF, DOCX, TXT, CSV, or JSON for clear page summaries
//               </p>
//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 hidden
//                 accept=".txt,.md,.csv,.json,.pdf,.docx,.xlsx,.rtf"
//                 onChange={processSelectedFile}
//               />
//             </label>
//           </div>
//         )}

//         {/* CONDITION 2: INITIAL EXTRACTION LOADER */}
//         {isProcessingDocument && (
//           <div className="flex flex-1 flex-col items-center justify-center text-white/50 gap-2.5">
//             <Loader size={20} className="animate-spin text-indigo-400" />
//             <span className="text-xs tracking-wide">Reading text layers and splitting page indexes...</span>
//           </div>
//         )}

//         {/* CONDITION 3: ASSIGNMENT COMPLETED -> SHOW CARD HUB WITH BUTTONS */}
//         {documentPages.length > 0 && (
//           <div className="flex-1 flex flex-col justify-between overflow-hidden mt-4 pt-2">
            
//             <div className="flex-1 overflow-y-auto pr-1">
//               <div className="w-full max-w-2xl mx-auto bg-white/[0.03] border border-indigo-500/20 rounded-xl p-5 md:p-6 box-border shadow-2xl relative">
                
//                 <div className="flex items-center justify-between border-b border-white/[0.05] pb-3 mb-4">
//                   <div className="min-w-0 pr-3 flex items-center gap-2">
//                     <FileText size={14} className="text-indigo-400 shrink-0" />
//                     <div className="truncate">
//                       <span className="text-[9px] font-mono text-indigo-400 font-bold uppercase tracking-widest block">Active Work Card</span>
//                       <h4 className="text-white text-xs mt-0.5 mb-0 font-medium truncate max-w-[180px] sm:max-w-md">
//                         {uploadedFile?.name || 'Processing Ingestion'}
//                       </h4>
//                     </div>
//                   </div>
//                   <span className="text-xs font-mono font-bold bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded text-indigo-400 shrink-0">
//                     PAGE {currentPageIndex + 1} / {documentPages.length}
//                   </span>
//                 </div>

//                 <div className="text-white/90 text-xs leading-relaxed min-h-[180px] bg-black/20 p-4 rounded-lg border border-white/[0.03]">
//                   {isPageLoading ? (
//                     <div className="flex flex-col items-center justify-center gap-2.5 h-[180px]">
//                       <Loader size={16} className="animate-spin text-indigo-400" />
//                       <span className="text-white/40 text-[11px] italic">Translating into simple student terms...</span>
//                     </div>
//                   ) : (
//                     <div className="whitespace-pre-wrap break-words text-white/85 text-xs font-normal">
//                       {cachedSummaries[currentPageIndex] || (
//                         <p className="text-white/30 italic text-center text-[11px] py-8">Parsing complete. Synchronizing AI summary output...</p>
//                       )}
//                     </div>
//                   )}
//                 </div>

//                 {processingError && (
//                   <div className="mt-3 p-2 bg-red-500/10 border border-red-500/20 rounded text-[10px] font-mono text-red-400 flex items-center gap-1.5">
//                     <AlertCircle size={12} />
//                     <span>Layout notice: {processingError}</span>
//                   </div>
//                 )}

//               </div>
//             </div>

//             <div className="flex items-center justify-between border-t border-white/[0.05] pt-4 mt-4 shrink-0 max-w-2xl w-full mx-auto">
//               <button
//                 onClick={resetWorkspacePipeline}
//                 className="px-4 py-2 rounded-lg border border-red-500/20 hover:border-red-500/40 text-red-400 bg-red-500/[0.02] hover:bg-red-500/[0.05] text-xs font-medium cursor-pointer transition-all flex items-center justify-center gap-1 shadow-sm"
//               >
//                 <X size={12} />
//                 <span>Close Panel</span>
//               </button>

//               <div className="flex gap-2">
//                 <button
//                   onClick={handlePreviousPageAction}
//                   disabled={currentPageIndex === 0 || isPageLoading}
//                   className="px-4 py-2 rounded-lg border border-white/10 text-white bg-white/[0.01] text-xs font-medium cursor-pointer flex items-center gap-1 disabled:opacity-25 disabled:cursor-not-allowed hover:bg-white/[0.04] transition-all"
//                 >
//                   <ChevronLeft size={13} />
//                   <span>Back</span>
//                 </button>

//                 <button
//                   onClick={handleNextPageAction}
//                   disabled={currentPageIndex === documentPages.length - 1 || isPageLoading}
//                   className="px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-semibold text-xs border-0 cursor-pointer flex items-center gap-1 disabled:opacity-25 disabled:cursor-not-allowed transition-all shadow-md"
//                 >
//                   <span>Next Page</span>
//                   <ChevronRight size={13} />
//                 </button>
//               </div>
//             </div>

//           </div>
//         )}
//       </div>
//     </div>
//   )
// }










// 'use client'

// import { useState, useRef, useEffect } from 'react'
// import {
//   Send,
//   Bot,
//   User,
//   Loader,
//   Sparkles,
//   FolderOpen,
//   UploadCloud,
//   ChevronLeft,
//   ChevronRight,
//   X,
//   AlertCircle,
//   FileText
// } from 'lucide-react'

// const GROQ_API_URL = process.env.NEXT_PUBLIC_GROQ_BASE_URL || 'https://api.groq.com/openai/v1'
// const CHAT_MODEL = 'meta-llama/llama-4-scout-17b-16e-instruct'

// export default function LibraryAssistant() {
//   /* ==========================================
//      CHAT STATE MANAGEMENT
//      ========================================== */
//   const [messages, setMessages] = useState([
//     {
//       id: 'init',
//       role: 'assistant',
//       content: 'Habari! I am your AI Smart Library Companion. Upload any file (.pdf, .docx, .txt) in the workspace on the right, and ask me anything about it or how this platform architecture works!'
//     }
//   ])

//   const [inputValue, setInputValue] = useState('')
//   const [isChatLoading, setIsChatLoading] = useState(false)
//   const [chatSystemError, setChatSystemError] = useState(null)
//   const chatBottomRef = useRef(null)

//   /* ==========================================
//      DOCUMENT WORKSPACE STATE MANAGEMENT
//      ========================================== */
//   const [uploadedFile, setUploadedFile] = useState(null)
//   const [documentPages, setDocumentPages] = useState([]) 
//   const [currentPageIndex, setCurrentPageIndex] = useState(0)
//   const [isProcessingDocument, setIsProcessingDocument] = useState(false)
//   const [processingError, setProcessingError] = useState(null)
  
//   const [cachedSummaries, setCachedSummaries] = useState({})
//   const [isPageLoading, setIsPageLoading] = useState(false)
//   const fileInputRef = useRef(null)

//   useEffect(() => {
//     chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' })
//   }, [messages, isChatLoading])

//   /* ==========================================
//      CHAT TUNNEL ROUTINES (SYNCHRONIZED ARCHITECTURE)
//      ========================================== */
//   const transmitChatInference = async (chatHistory) => {
//     const token = typeof window !== 'undefined'
//       ? localStorage.getItem('groq_access_token') || localStorage.getItem('access_token') || process.env.NEXT_PUBLIC_GROQ_API_KEY
//       : process.env.NEXT_PUBLIC_GROQ_API_KEY

//     if (!token || token === 'undefined') {
//       return 'Missing GROQ API authorization token. Please set it in your environment or localStorage.'
//     }

//     const cleanToken = String(token).replace(/['"`;]/g, '').trim()

//     // 🌐 PLATFORM ECOSYSTEM MAP: UPDATED WITH SPECIFIC LIBRARY DIRECTORIES
//     let applicationArchitectureBlueprint = `
//       [WEBSITE TECHNICAL SYSTEM BLUEPRINT & ROADMAP]
//       Platform Name: MindBridge Academic Collaborative Workspace
//       Frontend Stack: React 18, Vite Engine, Tailwind CSS, Lucide Icons, Mammoth.js (Word Parser), PDF.js
      
//       UPDATED REPOSITORY STRUCTURE TREE:
//       ├── public/
//       ├── src/
//       │   ├── components/
//       │   │   └── library/                   <-- [Active Academic Module Target Directory]
//       │   │       ├── LibraryAssistant.jsx   <-- (This file: Controls Chat Sidebar panel + Workspace Hub Hub)
//       │   │       ├── SummarizeModal.jsx     <-- (Handles overlay structural content segmentation insights)
//       │   │       ├── QuizModal.jsx          <-- (Triggers deep localized token validation inferences)
//       │   │       ├── MaterialCard.jsx       <-- (Displays standalone uploaded resource items and layouts)
//       │   │       └── BookCard.jsx           <-- (Handles library book item cards and structural metadata)
//       │   ├── App.jsx                        <-- (Main structural wrapper node mounting layouts)
//       │   ├── index.css                      <-- (Tailwind Global directives layer)
//       │   └── main.jsx                       <-- (React DOM structural root mounting point)
//       ├── package.json                       <-- (Dependencies tracking mammoth, lucide-react)
//       └── vite.config.js                     <-- (Bundler build execution parameters)

//       COMPONENT WORKFLOW INTERACTION MATRIX:
//       1. LibraryAssistant.jsx runs the orchestration frame. It relies on BookCard.jsx and MaterialCard.jsx to view standard catalogs.
//       2. When users want deep analytics, SummarizeModal.jsx and QuizModal.jsx are triggered to build interactive test structures.
//       3. The Tutor Consultation Terminal on the left reads the active text array inside LibraryAssistant.jsx to give perfect answers.
//     `

//     // 📄 LIVE DOCUMENT CONTEXT INJECTION PIPELINE
//     let liveDocumentContextOverlay = "Currently, no external file is uploaded in the Workspace Hub. Guide the user to upload an asset on the right panel if they want deep file context processing."
    
//     if (uploadedFile && documentPages.length > 0) {
//       const activePageRawText = documentPages[currentPageIndex] || ""
//       liveDocumentContextOverlay = `
//         [ACTIVE WORKSPACE UPLOAD DETECTED]
//         File Name: "${uploadedFile.name}"
//         Total Document Mapped Frame Size: ${documentPages.length} Pages
//         User Current Viewframe Target: Currently viewing Page ${currentPageIndex + 1}
        
//         --- LIVE ACTIVE VIEWING PAGE TEXT STRING CONTENT START ---
//         ${activePageRawText}
//         --- LIVE ACTIVE VIEWING PAGE TEXT STRING CONTENT END ---
        
//         OPERATIONAL REQUIREMENT: The user is asking a question about this document context layout. Read the text block above carefully to answer their specific question accurately.
//       `
//     }

//     const consolidatedSystemPrompt = `
//       You are the elite MindBridge AI Academic Companion built directly into this workspace platform.
      
//       ${applicationArchitectureBlueprint}
      
//       ${liveDocumentContextOverlay}
      
//       Always reference your specific components within src/components/library/ accurately when asked about how the website works. Maintain full conversational recall of previous discussion threads.
//     `

//     const response = await fetch(`${GROQ_API_URL}/chat/completions`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${cleanToken}`
//       },
//       body: JSON.stringify({
//         model: CHAT_MODEL,
//         temperature: 0.35,
//         max_tokens: 700,
//         messages: [
//           {
//             role: 'system',
//             content: consolidatedSystemPrompt
//           },
//           ...chatHistory.filter(m => m.id !== 'init').map(m => ({
//             role: m.role === 'user' ? 'user' : 'assistant',
//             content: m.content
//           }))
//         ]
//       })
//     })

//     if (!response.ok) throw new Error(`Chat connection failure (${response.status})`)
//     const data = await response.json()
//     return data?.choices?.[0]?.message?.content || 'No response captured.'
//   }

//   const handleSendChatMessage = async (e) => {
//     e.preventDefault()
//     if (!inputValue.trim() || isChatLoading) return

//     const userMessage = {
//       id: Date.now().toString(),
//       role: 'user',
//       content: inputValue
//     }

//     const updatedMessages = [...messages, userMessage]
//     setMessages(updatedMessages)
//     setInputValue('')
//     setIsChatLoading(true)
//     setChatSystemError(null)

//     try {
//       const aiResponse = await transmitChatInference(updatedMessages)
//       setMessages(prev => [...prev, {
//         id: (Date.now() + 1).toString(),
//         role: 'assistant',
//         content: aiResponse
//       }])
//     } catch (error) {
//       setChatSystemError(error.message)
//     } finally {
//       setIsChatLoading(false)
//     }
//   }

//   /* ==========================================
//      UNIVERSAL FILE TEXT EXTRACTOR
//      ========================================== */
//   const parseDocumentToPages = (file, extension) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader()

//       if (['pdf', 'docx', 'xlsx', 'xls'].includes(extension)) {
//         reader.readAsArrayBuffer(file)
//       } else {
//         reader.readAsText(file)
//       }

//       reader.onload = async (event) => {
//         try {
//           let chunks = []
//           const buffer = event.target.result

//           if (extension === 'docx') {
//             if (!window.mammoth) {
//               await new Promise((res, rej) => {
//                 const script = document.createElement('script')
//                 script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js'
//                 script.onload = res
//                 script.onerror = rej
//                 document.head.appendChild(script)
//               })
//             }

//             const result = await window.mammoth.extractRawText({ arrayBuffer: buffer })
//             const extractedText = result.value || ""
//             const splitParagraphs = extractedText.split('\n\n').map(p => p.trim()).filter(p => p.length > 5)

//             let processingPageChunk = ""
//             for (let i = 0; i < splitParagraphs.length; i++) {
//               processingPageChunk += splitParagraphs[i] + "\n\n"
//               if (processingPageChunk.length >= 1600 || i === splitParagraphs.length - 1) {
//                 chunks.push(processingPageChunk.trim())
//                 processingPageChunk = ""
//               }
//             }
//           }
//           else if (extension === 'pdf') {
//             const pdfjsLib = window['pdfjs-dist/build/pdf']
//             if (!pdfjsLib) {
//               await new Promise((res) => {
//                 const s = document.createElement('script')
//                 s.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js'
//                 s.onload = res
//                 document.head.appendChild(s)
//               })
//             }
//             const pdfjs = window['pdfjs-dist/build/pdf']
//             pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js'
            
//             const pdf = await pdfjs.getDocument({ data: buffer }).promise
//             for (let num = 1; num <= pdf.numPages; num++) {
//               const page = await pdf.getPage(num)
//               const contents = await page.getTextContent()
//               const aggregatedText = contents.items.map(item => item.str).join(' ')
//               chunks.push(aggregatedText.trim())
//             }
//           }
//           else {
//             const cleanTextString = typeof buffer === 'string' ? buffer : new TextDecoder('utf-8').decode(new Uint8Array(buffer))
//             const textBody = cleanTextString.trim()
            
//             const charactersPerPage = 2000
//             for (let i = 0; i < textBody.length; i += charactersPerPage) {
//               chunks.push(textBody.substring(i, i + charactersPerPage))
//             }
//           }

//           const finalChunks = chunks.map(c => c.trim()).filter(c => c.length > 0)
//           resolve(finalChunks)
//         } catch (e) {
//           reject(new Error(`Parsing track layout error: ${e.message}`))
//         }
//       }
//       reader.onerror = () => reject(new Error('Unable to capture file buffer stream.'))
//     })
//   }

//   /* ==========================================
//      CORE WORKSPACE PROCESSING INTERACTION
//      ========================================== */
//   const processSelectedFile = async (e) => {
//     const file = e.target.files?.[0]
//     if (!file) return

//     setUploadedFile(file)
//     setIsProcessingDocument(true)
//     setProcessingError(null)
//     setDocumentPages([])
//     setCachedSummaries({})
//     setCurrentPageIndex(0)

//     const fileExtension = file.name.split('.').pop()?.toLowerCase()

//     try {
//       const extractedPagesArray = await parseDocumentToPages(file, fileExtension)
//       if (extractedPagesArray.length === 0) {
//         extractedPagesArray.push(`Raw text extraction complete for ${file.name}`);
//       }

//       setDocumentPages(extractedPagesArray)

//       // Automatically announce layout sync to chat array history
//       setMessages(prev => [
//         ...prev,
//         {
//           id: `upload-${Date.now()}`,
//           role: 'assistant',
//           content: `📥 **System Notice:** I have successfully scanned and mapped your document "${file.name}" into ${extractedPagesArray.length} pages. This content has been synchronized into my active thinking memory! Ask me any questions about it.`
//         }
//       ])

//       await fetchPageSummary(0, extractedPagesArray)
//     } catch (err) {
//       setDocumentPages([`Error during mapping: ${err.message}`])
//       setProcessingError(err.message)
//     } finally {
//       setIsProcessingDocument(false)
//     }
//   }

//   const fetchPageSummary = async (pageIndex, pagesArray = documentPages) => {
//     if (cachedSummaries[pageIndex]) return 

//     setIsPageLoading(true)
//     const token = typeof window !== 'undefined'
//       ? localStorage.getItem('groq_access_token') || localStorage.getItem('access_token') || process.env.NEXT_PUBLIC_GROQ_API_KEY
//       : process.env.NEXT_PUBLIC_GROQ_API_KEY

//     if (!token) {
//       setCachedSummaries(prev => ({ ...prev, [pageIndex]: "Missing GROQ API token setup." }))
//       setIsPageLoading(false)
//       return
//     }

//     const cleanToken = String(token).replace(/['"`;]/g, '').trim()
//     const textSnippet = pagesArray[pageIndex] || ''

//     try {
//       const response = await fetch(`${GROQ_API_URL}/chat/completions`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${cleanToken}`
//         },
//         body: JSON.stringify({
//           model: CHAT_MODEL,
//           temperature: 0.1, 
//           max_tokens: 500,
//           messages: [
//             {
//               role: 'system',
//               content: 'You are an isolated academic page analyzer. Summarize ONLY the provided text block. Never carry over or repeat sentences from prior pages. Provide a clear overview paragraph and 3 simple takeaways using "•".'
//             },
//             {
//               role: 'user',
//               content: `Summarize Page ${pageIndex + 1}:\n\n${textSnippet}`
//             }
//           ]
//         })
//       })

//       if (!response.ok) throw new Error(`Status ${response.status}`)
//       const data = await response.json()
//       setCachedSummaries(prev => ({ ...prev, [pageIndex]: data?.choices?.[0]?.message?.content || 'Empty context summary.' }))
//     } catch (err) {
//       setCachedSummaries(prev => ({ ...prev, [pageIndex]: `Inference failed: ${err.message}` }))
//     } finally {
//       setIsPageLoading(false)
//     }
//   }

//   const handleNextPageAction = () => {
//     const nextIndex = currentPageIndex + 1
//     if (nextIndex < documentPages.length && !isPageLoading) {
//       setCurrentPageIndex(nextIndex)
//       if (!cachedSummaries[nextIndex]) {
//         fetchPageSummary(nextIndex)
//       }
//     }
//   }

//   const handlePreviousPageAction = () => {
//     if (currentPageIndex > 0 && !isPageLoading) {
//       setCurrentPageIndex(currentPageIndex - 1)
//     }
//   }

//   const resetWorkspacePipeline = () => {
//     setUploadedFile(null)
//     setDocumentPages([])
//     setCachedSummaries({})
//     setCurrentPageIndex(0)
//     setProcessingError(null)
//     if (fileInputRef.current) fileInputRef.current.value = ''
//   }

//   return (
//     <div className="w-full bg-[#07070a] text-white p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[calc(100vh-56px)] box-border">
      
//       {/* ================= CHAT COMPONENT SIDEBAR ================= */}
//       <div className="bg-[#111] border border-white/[0.06] rounded-xl flex flex-col h-[85vh] overflow-hidden shadow-xl w-full box-border">
//         <div className="px-4 py-3.5 border-b border-white/[0.06] bg-white/[0.01] flex items-center gap-2 shrink-0">
//           <Sparkles size={14} className="text-indigo-400" />
//           <h3 className="text-[11px] uppercase tracking-wider text-white/70 font-semibold m-0">
//             Tutor Consultation Terminal
//           </h3>
//         </div>

//         <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-black/[0.05]">
//           {messages.map((msg) => (
//             <div
//               key={msg.id}
//               className={`flex gap-2.5 max-w-[88%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
//             >
//               <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border mt-0.5 ${
//                 msg.role === 'user' ? 'bg-white/[0.06] border-white/10' : 'bg-indigo-500/10 border-indigo-500/20'
//               }`}>
//                 {msg.role === 'user' ? <User size={11} className="text-white/80" /> : <Bot size={11} className="text-indigo-400" />}
//               </div>

//               <div className={`p-3 rounded-xl border text-xs leading-relaxed whitespace-pre-wrap break-words ${
//                 msg.role === 'user' 
//                   ? 'bg-indigo-500/[0.05] border-indigo-500/20 text-white rounded-tr-none' 
//                   : 'bg-white/[0.02] border-white/[0.05] text-white/85 rounded-tl-none'
//               }`}>
//                 {msg.content}
//               </div>
//             </div>
//           ))}

//           {isChatLoading && (
//             <div className="text-white/40 text-xs flex items-center gap-2 pl-1 italic">
//               <Loader size={12} className="animate-spin text-indigo-400" />
//               Processing question context buffer...
//             </div>
//           )}

//           {chatSystemError && (
//             <div className="p-3 bg-red-500/[0.02] border border-red-500/15 rounded-lg text-[11px] font-mono text-red-400 break-words">
//               {chatSystemError}
//             </div>
//           )}
//           <div ref={chatBottomRef} />
//         </div>

//         <form onSubmit={handleSendChatMessage} className="p-3 border-t border-white/[0.06] bg-black/20 flex gap-2 shrink-0">
//           <input
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//             className="flex-1 bg-white/[0.03] text-white placeholder-white/25 text-xs px-3 py-2.5 rounded-lg border border-white/[0.07] outline-none"
//             placeholder="Ask me anything about the document or codebase..."
//           />
//           <button 
//             type="submit"
//             disabled={!inputValue.trim() || isChatLoading}
//             className="w-9 h-9 bg-indigo-500 text-white rounded-lg flex items-center justify-center border-0 cursor-pointer hover:bg-indigo-600 transition-all shrink-0"
//           >
//             <Send size={13} />
//           </button>
//         </form>
//       </div>

//       {/* ================= MAIN WORKSPACE ================= */}
//       <div className="bg-[#0b0b11] border border-white/[0.06] rounded-xl p-5 lg:p-6 h-[85vh] flex flex-col shadow-xl overflow-hidden w-full box-border">
        
//         <div className="flex items-center gap-2 pb-4 border-b border-white/[0.04] shrink-0">
//           <FolderOpen size={16} className="text-indigo-400" />
//           <h2 className="text-white text-sm font-semibold m-0">
//             Academic Document Workspace Hub
//           </h2>
//         </div>

//         {/* CONDITION 1: FILE SELECTION UPLOADER */}
//         {!uploadedFile && !isProcessingDocument && (
//           <div className="flex-1 flex flex-col justify-center py-6">
//             <label className="flex flex-col items-center justify-center py-16 px-4 border-2 border-dashed border-white/10 hover:border-white/20 bg-white/[0.01] hover:bg-white/[0.02] rounded-xl cursor-pointer transition-all text-center max-w-xl mx-auto w-full box-border">
//               <UploadCloud size={36} className="text-white/30 mb-3" />
//               <p className="text-white/80 text-sm font-medium m-0 mb-1">Upload Study Material Asset</p>
//               <p className="text-white/35 text-[11px] max-w-xs leading-normal m-0">
//                 Click to parse PDF, DOCX, XLSX, TXT, CSV, or JSON for clear page summaries
//               </p>
//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 hidden
//                 accept=".txt,.md,.csv,.json,.pdf,.docx,.xlsx,.rtf"
//                 onChange={processSelectedFile}
//               />
//             </label>
//           </div>
//         )}

//         {/* CONDITION 2: INITIAL EXTRACTION LOADER */}
//         {isProcessingDocument && (
//           <div className="flex flex-1 flex-col items-center justify-center text-white/50 gap-2.5">
//             <Loader size={20} className="animate-spin text-indigo-400" />
//             <span className="text-xs tracking-wide">Syncing text layers to active workspace memory...</span>
//           </div>
//         )}

//         {/* CONDITION 3: ASSIGNMENT COMPLETED -> SHOW CARD HUB WITH BUTTONS */}
//         {documentPages.length > 0 && (
//           <div className="flex-1 flex flex-col justify-between overflow-hidden mt-4 pt-2">
            
//             <div className="flex-1 overflow-y-auto pr-1">
//               <div className="w-full max-w-2xl mx-auto bg-white/[0.03] border border-indigo-500/20 rounded-xl p-5 md:p-6 box-border shadow-2xl relative">
                
//                 <div className="flex items-center justify-between border-b border-white/[0.05] pb-3 mb-4">
//                   <div className="min-w-0 pr-3 flex items-center gap-2">
//                     <FileText size={14} className="text-indigo-400 shrink-0" />
//                     <div className="truncate">
//                       <span className="text-[9px] font-mono text-indigo-400 font-bold uppercase tracking-widest block">Active Work Card</span>
//                       <h4 className="text-white text-xs mt-0.5 mb-0 font-medium truncate max-w-[180px] sm:max-w-md">
//                         {uploadedFile?.name || 'Processing Ingestion'}
//                       </h4>
//                     </div>
//                   </div>
//                   <span className="text-xs font-mono font-bold bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded text-indigo-400 shrink-0">
//                     PAGE {currentPageIndex + 1} / {documentPages.length}
//                   </span>
//                 </div>

//                 <div className="text-white/90 text-xs leading-relaxed min-h-[180px] bg-black/20 p-4 rounded-lg border border-white/[0.03]">
//                   {isPageLoading ? (
//                     <div className="flex flex-col items-center justify-center gap-2.5 h-[180px]">
//                       <Loader size={16} className="animate-spin text-indigo-400" />
//                       <span className="text-white/40 text-[11px] italic">Compiling unrepeated page index trace...</span>
//                     </div>
//                   ) : (
//                     <div className="whitespace-pre-wrap break-words text-white/85 text-xs font-normal">
//                       {cachedSummaries[currentPageIndex] || (
//                         <p className="text-white/30 italic text-center text-[11px] py-8">Parsing complete. Synchronizing AI summary output...</p>
//                       )}
//                     </div>
//                   )}
//                 </div>

//                 {processingError && (
//                   <div className="mt-3 p-2 bg-red-500/10 border border-red-500/20 rounded text-[10px] font-mono text-red-400 flex items-center gap-1.5">
//                     <AlertCircle size={12} />
//                     <span>Layout notice: {processingError}</span>
//                   </div>
//                 )}

//               </div>
//             </div>

//             {/* MANDATORY CONTROL ROW */}
//             <div className="flex items-center justify-between border-t border-white/[0.05] pt-4 mt-4 shrink-0 max-w-2xl w-full mx-auto">
//               <button
//                 onClick={resetWorkspacePipeline}
//                 className="px-4 py-2 rounded-lg border border-red-500/20 hover:border-red-500/40 text-red-400 bg-red-500/[0.02] hover:bg-red-500/[0.05] text-xs font-medium cursor-pointer transition-all flex items-center justify-center gap-1 shadow-sm"
//               >
//                 <X size={12} />
//                 <span>Close Panel</span>
//               </button>

//               <div className="flex gap-2">
//                 <button
//                   onClick={handlePreviousPageAction}
//                   disabled={currentPageIndex === 0 || isPageLoading}
//                   className="px-4 py-2 rounded-lg border border-white/10 text-white bg-white/[0.01] text-xs font-medium cursor-pointer flex items-center gap-1 disabled:opacity-25 disabled:cursor-not-allowed hover:bg-white/[0.04] transition-all"
//                 >
//                   <ChevronLeft size={13} />
//                   <span>Back</span>
//                 </button>

//                 <button
//                   onClick={handleNextPageAction}
//                   disabled={currentPageIndex === documentPages.length - 1 || isPageLoading}
//                   className="px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-semibold text-xs border-0 cursor-pointer flex items-center gap-1 disabled:opacity-25 disabled:cursor-not-allowed transition-all shadow-md"
//                 >
//                   <span>Next Page</span>
//                   <ChevronRight size={13} />
//                 </button>
//               </div>
//             </div>

//           </div>
//         )}
//       </div>
//     </div>
//   )
// }













'use client'

import { useState, useRef, useEffect } from 'react'
import {
  Send,
  Bot,
  User,
  Loader,
  Sparkles,
  FolderOpen,
  UploadCloud,
  ChevronLeft,
  ChevronRight,
  X,
  AlertCircle,
  FileText
} from 'lucide-react'

const GROQ_API_URL = process.env.NEXT_PUBLIC_GROQ_BASE_URL || 'https://api.groq.com/openai/v1'
const CHAT_MODEL = 'meta-llama/llama-4-scout-17b-16e-instruct'

export default function LibraryAssistant() {
  /* ==========================================
     CHAT STATE MANAGEMENT
     ========================================== */
  const [messages, setMessages] = useState([
    {
      id: 'init',
      role: 'assistant',
      content: 'Habari! I am your AI Smart Library Companion. Upload any file (.pdf, .docx, .txt) in the workspace on the right, and ask me anything about it or how this platform architecture works!'
    }
  ])

  const [inputValue, setInputValue] = useState('')
  const [isChatLoading, setIsChatLoading] = useState(false)
  const [chatSystemError, setChatSystemError] = useState(null)
  const chatBottomRef = useRef(null)

  /* ==========================================
     DOCUMENT WORKSPACE STATE MANAGEMENT
     ========================================== */
  const [uploadedFile, setUploadedFile] = useState(null)
  const [documentPages, setDocumentPages] = useState([]) 
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const [isProcessingDocument, setIsProcessingDocument] = useState(false)
  const [processingError, setProcessingError] = useState(null)
  
  const [cachedSummaries, setCachedSummaries] = useState({})
  const [isPageLoading, setIsPageLoading] = useState(false)
  const fileInputRef = useRef(null)

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isChatLoading])

  /* ==========================================
     CHAT TUNNEL ROUTINES (PROTECTED ENVIRONMENT)
     ========================================== */
  const transmitChatInference = async (chatHistory) => {
    const token = typeof window !== 'undefined'
      ? localStorage.getItem('groq_access_token') || localStorage.getItem('access_token') || process.env.NEXT_PUBLIC_GROQ_API_KEY
      : process.env.NEXT_PUBLIC_GROQ_API_KEY

    if (!token || token === 'undefined') {
      return 'Missing GROQ API authorization token. Please set it in your environment or localStorage.'
    }

    const cleanToken = String(token).replace(/['"`;]/g, '').trim()

    // 🌐 STRICT BEHAVIOR DIRECTIVES (NO ARCHITECTURE CHATTER OR NAVIGATION SUGGESTIONS)
    let applicationArchitectureBlueprint = `
      [WEBSITE TECHNICAL SYSTEM BLUEPRINT & ROADMAP]
      Platform Name: MindBridge Academic Collaborative Workspace
      Frontend Stack: React 18, Vite Engine, Tailwind CSS, Lucide Icons, Mammoth.js (Word Parser), PDF.js

      CRITICAL CONVERSATIONAL PROTECTION RULES:
      1. You are an academic study assistant designed ONLY to answer questions about the user's uploaded materials or general study workflows.
      2. ABSOLUTE PROHIBITION: Never offer to navigate to, look inside, explore, or check code components (such as LibraryAssistant.jsx, SummarizeModal.jsx, QuizModal.jsx, etc.). 
      3. Never output lines like "If you're interested in learning more, I can navigate to..." or "I can look into the codebase for related resources." You do not have navigation tools. Keep your focus entirely on answering the question textually based only on the uploaded documents.
    `

    // 📄 LIVE DOCUMENT CONTEXT INJECTION PIPELINE
    let liveDocumentContextOverlay = "Currently, no external file is uploaded in the Workspace Hub. Guide the user to upload an asset on the right panel if they want deep file context processing."
    
    if (uploadedFile && documentPages.length > 0) {
      const activePageRawText = documentPages[currentPageIndex] || ""
      liveDocumentContextOverlay = `
        [ACTIVE WORKSPACE UPLOAD DETECTED]
        File Name: "${uploadedFile.name}"
        Total Document Mapped Frame Size: ${documentPages.length} Pages
        User Current Viewframe Target: Currently viewing Page ${currentPageIndex + 1}
        
        --- LIVE ACTIVE VIEWING PAGE TEXT STRING CONTENT START ---
        ${activePageRawText}
        --- LIVE ACTIVE VIEWING PAGE TEXT STRING CONTENT END ---
        
        OPERATIONAL REQUIREMENT: The user is asking a question about this document context layout. Read the text block above carefully to answer their specific question accurately.
      `
    }

    const consolidatedSystemPrompt = `
      You are the elite MindBridge AI Academic Companion built directly into this workspace platform.
      
      ${applicationArchitectureBlueprint}
      
      ${liveDocumentContextOverlay}
      
      Strictly focus on answering academic queries based on the document text provided. Under no circumstances should you mention component navigation, or offer to jump to or look inside project repository files like src/components/library/.
    `

    const response = await fetch(`${GROQ_API_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cleanToken}`
      },
      body: JSON.stringify({
        model: CHAT_MODEL,
        temperature: 0.35,
        max_tokens: 700,
        messages: [
          {
            role: 'system',
            content: consolidatedSystemPrompt
          },
          ...chatHistory.filter(m => m.id !== 'init').map(m => ({
            role: m.role === 'user' ? 'user' : 'assistant',
            content: m.content
          }))
        ]
      })
    })

    if (!response.ok) throw new Error(`Chat connection failure (${response.status})`)
    const data = await response.json()
    return data?.choices?.[0]?.message?.content || 'No response captured.'
  }

  const handleSendChatMessage = async (e) => {
    e.preventDefault()
    if (!inputValue.trim() || isChatLoading) return

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue
    }

    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInputValue('')
    setIsChatLoading(true)
    setChatSystemError(null)

    try {
      const aiResponse = await transmitChatInference(updatedMessages)
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse
      }])
    } catch (error) {
      setChatSystemError(error.message)
    } finally {
      setIsChatLoading(false)
    }
  }

  /* ==========================================
     UNIVERSAL FILE TEXT EXTRACTOR
     ========================================== */
  const parseDocumentToPages = (file, extension) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      if (['pdf', 'docx', 'xlsx', 'xls'].includes(extension)) {
        reader.readAsArrayBuffer(file)
      } else {
        reader.readAsText(file)
      }

      reader.onload = async (event) => {
        try {
          let chunks = []
          const buffer = event.target.result

          if (extension === 'docx') {
            if (!window.mammoth) {
              await new Promise((res, rej) => {
                const script = document.createElement('script')
                script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js'
                script.onload = res
                script.onerror = rej
                document.head.appendChild(script)
              })
            }

            const result = await window.mammoth.extractRawText({ arrayBuffer: buffer })
            const extractedText = result.value || ""
            const splitParagraphs = extractedText.split('\n\n').map(p => p.trim()).filter(p => p.length > 5)

            let processingPageChunk = ""
            for (let i = 0; i < splitParagraphs.length; i++) {
              processingPageChunk += splitParagraphs[i] + "\n\n"
              if (processingPageChunk.length >= 1600 || i === splitParagraphs.length - 1) {
                chunks.push(processingPageChunk.trim())
                processingPageChunk = ""
              }
            }
          }
          else if (extension === 'pdf') {
            const pdfjsLib = window['pdfjs-dist/build/pdf']
            if (!pdfjsLib) {
              await new Promise((res) => {
                const s = document.createElement('script')
                s.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js'
                s.onload = res
                document.head.appendChild(s)
              })
            }
            const pdfjs = window['pdfjs-dist/build/pdf']
            pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js'
            
            const pdf = await pdfjs.getDocument({ data: buffer }).promise
            for (let num = 1; num <= pdf.numPages; num++) {
              const page = await pdf.getPage(num)
              const contents = await page.getTextContent()
              const aggregatedText = contents.items.map(item => item.str).join(' ')
              chunks.push(aggregatedText.trim())
            }
          }
          else {
            const cleanTextString = typeof buffer === 'string' ? buffer : new TextDecoder('utf-8').decode(new Uint8Array(buffer))
            const textBody = cleanTextString.trim()
            
            const charactersPerPage = 2000
            for (let i = 0; i < textBody.length; i += charactersPerPage) {
              chunks.push(textBody.substring(i, i + charactersPerPage))
            }
          }

          const finalChunks = chunks.map(c => c.trim()).filter(c => c.length > 0)
          resolve(finalChunks)
        } catch (e) {
          reject(new Error(`Parsing track layout error: ${e.message}`))
        }
      }
      reader.onerror = () => reject(new Error('Unable to capture file buffer stream.'))
    })
  }

  /* ==========================================
     CORE WORKSPACE PROCESSING INTERACTION
     ========================================== */
  const processSelectedFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadedFile(file)
    setIsProcessingDocument(true)
    setProcessingError(null)
    setDocumentPages([])
    setCachedSummaries({})
    setCurrentPageIndex(0)

    const fileExtension = file.name.split('.').pop()?.toLowerCase()

    try {
      const extractedPagesArray = await parseDocumentToPages(file, fileExtension)
      if (extractedPagesArray.length === 0) {
        extractedPagesArray.push(`Raw text extraction complete for ${file.name}`);
      }

      setDocumentPages(extractedPagesArray)

      setMessages(prev => [
        ...prev,
        {
          id: `upload-${Date.now()}`,
          role: 'assistant',
          content: `📥 **System Notice:** I have successfully scanned and mapped your document "${file.name}" into ${extractedPagesArray.length} pages. This content has been synchronized into my active thinking memory! Ask me any questions about it.`
        }
      ])

      await fetchPageSummary(0, extractedPagesArray)
    } catch (err) {
      setDocumentPages([`Error during mapping: ${err.message}`])
      setProcessingError(err.message)
    } finally {
      setIsProcessingDocument(false)
    }
  }

  const fetchPageSummary = async (pageIndex, pagesArray = documentPages) => {
    if (cachedSummaries[pageIndex]) return 

    setIsPageLoading(true)
    const token = typeof window !== 'undefined'
      ? localStorage.getItem('groq_access_token') || localStorage.getItem('access_token') || process.env.NEXT_PUBLIC_GROQ_API_KEY
      : process.env.NEXT_PUBLIC_GROQ_API_KEY

    if (!token) {
      setCachedSummaries(prev => ({ ...prev, [pageIndex]: "Missing GROQ API token setup." }))
      setIsPageLoading(false)
      return
    }

    const cleanToken = String(token).replace(/['"`;]/g, '').trim()
    const textSnippet = pagesArray[pageIndex] || ''

    try {
      const response = await fetch(`${GROQ_API_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cleanToken}`
        },
        body: JSON.stringify({
          model: CHAT_MODEL,
          temperature: 0.1, 
          max_tokens: 500,
          messages: [
            {
              role: 'system',
              content: 'You are an isolated academic page analyzer. Summarize ONLY the provided text block. Never carry over or repeat sentences from prior pages. Provide a clear overview paragraph and 3 simple takeaways using "•".'
            },
            {
              role: 'user',
              content: `Summarize Page ${pageIndex + 1}:\n\n${textSnippet}`
            }
          ]
        })
      })

      if (!response.ok) throw new Error(`Status ${response.status}`)
      const data = await response.json()
      setCachedSummaries(prev => ({ ...prev, [pageIndex]: data?.choices?.[0]?.message?.content || 'Empty context summary.' }))
    } catch (err) {
      setCachedSummaries(prev => ({ ...prev, [pageIndex]: `Inference failed: ${err.message}` }))
    } finally {
      setIsPageLoading(false)
    }
  }

  const handleNextPageAction = () => {
    const nextIndex = currentPageIndex + 1
    if (nextIndex < documentPages.length && !isPageLoading) {
      setCurrentPageIndex(nextIndex)
      if (!cachedSummaries[nextIndex]) {
        fetchPageSummary(nextIndex)
      }
    }
  }

  const handlePreviousPageAction = () => {
    if (currentPageIndex > 0 && !isPageLoading) {
      setCurrentPageIndex(currentPageIndex - 1)
    }
  }

  const resetWorkspacePipeline = () => {
    setUploadedFile(null)
    setDocumentPages([])
    setCachedSummaries({})
    setCurrentPageIndex(0)
    setProcessingError(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div className="w-full bg-[#07070a] text-white p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[calc(100vh-56px)] box-border">
      
      {/* ================= CHAT COMPONENT SIDEBAR ================= */}
      <div className="bg-[#111] border border-white/[0.06] rounded-xl flex flex-col h-[85vh] overflow-hidden shadow-xl w-full box-border">
        <div className="px-4 py-3.5 border-b border-white/[0.06] bg-white/[0.01] flex items-center gap-2 shrink-0">
          <Sparkles size={14} className="text-indigo-400" />
          <h3 className="text-[11px] uppercase tracking-wider text-white/70 font-semibold m-0">
            Tutor Consultation Terminal
          </h3>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-black/[0.05]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 max-w-[88%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border mt-0.5 ${
                msg.role === 'user' ? 'bg-white/[0.06] border-white/10' : 'bg-indigo-500/10 border-indigo-500/20'
              }`}>
                {msg.role === 'user' ? <User size={11} className="text-white/80" /> : <Bot size={11} className="text-indigo-400" />}
              </div>

              <div className={`p-3 rounded-xl border text-xs leading-relaxed whitespace-pre-wrap break-words ${
                msg.role === 'user' 
                  ? 'bg-indigo-500/[0.05] border-indigo-500/20 text-white rounded-tr-none' 
                  : 'bg-white/[0.02] border-white/[0.05] text-white/85 rounded-tl-none'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}

          {isChatLoading && (
            <div className="text-white/40 text-xs flex items-center gap-2 pl-1 italic">
              <Loader size={12} className="animate-spin text-indigo-400" />
              Processing question context buffer...
            </div>
          )}

          {chatSystemError && (
            <div className="p-3 bg-red-500/[0.02] border border-red-500/15 rounded-lg text-[11px] font-mono text-red-400 break-words">
              {chatSystemError}
            </div>
          )}
          <div ref={chatBottomRef} />
        </div>

        <form onSubmit={handleSendChatMessage} className="p-3 border-t border-white/[0.06] bg-black/20 flex gap-2 shrink-0">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 bg-white/[0.03] text-white placeholder-white/25 text-xs px-3 py-2.5 rounded-lg border border-white/[0.07] outline-none"
            placeholder="Ask me anything about the document..."
          />
          <button 
            type="submit"
            disabled={!inputValue.trim() || isChatLoading}
            className="w-9 h-9 bg-indigo-500 text-white rounded-lg flex items-center justify-center border-0 cursor-pointer hover:bg-indigo-600 transition-all shrink-0"
          >
            <Send size={13} />
          </button>
        </form>
      </div>

      {/* ================= MAIN WORKSPACE ================= */}
      <div className="bg-[#0b0b11] border border-white/[0.06] rounded-xl p-5 lg:p-6 h-[85vh] flex flex-col shadow-xl overflow-hidden w-full box-border">
        
        <div className="flex items-center gap-2 pb-4 border-b border-white/[0.04] shrink-0">
          <FolderOpen size={16} className="text-indigo-400" />
          <h2 className="text-white text-sm font-semibold m-0">
            Academic Document Workspace Hub
          </h2>
        </div>

        {/* CONDITION 1: FILE SELECTION UPLOADER */}
        {!uploadedFile && !isProcessingDocument && (
          <div className="flex-1 flex flex-col justify-center py-6">
            <label className="flex flex-col items-center justify-center py-16 px-4 border-2 border-dashed border-white/10 hover:border-white/20 bg-white/[0.01] hover:bg-white/[0.02] rounded-xl cursor-pointer transition-all text-center max-w-xl mx-auto w-full box-border">
              <UploadCloud size={36} className="text-white/30 mb-3" />
              <p className="text-white/80 text-sm font-medium m-0 mb-1">Upload Study Material Asset</p>
              <p className="text-white/35 text-[11px] max-w-xs leading-normal m-0">
                Click to parse PDF, DOCX, XLSX, TXT, CSV, or JSON for clear page summaries
              </p>
              <input
                ref={fileInputRef}
                type="file"
                hidden
                accept=".txt,.md,.csv,.json,.pdf,.docx,.xlsx,.rtf"
                onChange={processSelectedFile}
              />
            </label>
          </div>
        )}

        {/* CONDITION 2: INITIAL EXTRACTION LOADER */}
        {isProcessingDocument && (
          <div className="flex flex-1 flex-col items-center justify-center text-white/50 gap-2.5">
            <Loader size={20} className="animate-spin text-indigo-400" />
            <span className="text-xs tracking-wide">Syncing text layers to active workspace memory...</span>
          </div>
        )}

        {/* CONDITION 3: ASSIGNMENT COMPLETED -> SHOW CARD HUB WITH BUTTONS */}
        {documentPages.length > 0 && (
          <div className="flex-1 flex flex-col justify-between overflow-hidden mt-4 pt-2">
            
            <div className="flex-1 overflow-y-auto pr-1">
              <div className="w-full max-w-2xl mx-auto bg-white/[0.03] border border-indigo-500/20 rounded-xl p-5 md:p-6 box-border shadow-2xl relative">
                
                <div className="flex items-center justify-between border-b border-white/[0.05] pb-3 mb-4">
                  <div className="min-w-0 pr-3 flex items-center gap-2">
                    <FileText size={14} className="text-indigo-400 shrink-0" />
                    <div className="truncate">
                      <span className="text-[9px] font-mono text-indigo-400 font-bold uppercase tracking-widest block">Active Work Card</span>
                      <h4 className="text-white text-xs mt-0.5 mb-0 font-medium truncate max-w-[180px] sm:max-w-md">
                        {uploadedFile?.name || 'Processing Ingestion'}
                      </h4>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded text-indigo-400 shrink-0">
                    PAGE {currentPageIndex + 1} / {documentPages.length}
                  </span>
                </div>

                <div className="text-white/90 text-xs leading-relaxed min-h-[180px] bg-black/20 p-4 rounded-lg border border-white/[0.03]">
                  {isPageLoading ? (
                    <div className="flex flex-col items-center justify-center gap-2.5 h-[180px]">
                      <Loader size={16} className="animate-spin text-indigo-400" />
                      <span className="text-white/40 text-[11px] italic">Compiling unrepeated page index trace...</span>
                    </div>
                  ) : (
                    <div className="whitespace-pre-wrap break-words text-white/85 text-xs font-normal">
                      {cachedSummaries[currentPageIndex] || (
                        <p className="text-white/30 italic text-center text-[11px] py-8">Parsing complete. Synchronizing AI summary output...</p>
                      )}
                    </div>
                  )}
                </div>

                {processingError && (
                  <div className="mt-3 p-2 bg-red-500/10 border border-red-500/20 rounded text-[10px] font-mono text-red-400 flex items-center gap-1.5">
                    <AlertCircle size={12} />
                    <span>Layout notice: {processingError}</span>
                  </div>
                )}

              </div>
            </div>

            {/* MANDATORY CONTROL ROW */}
            <div className="flex items-center justify-between border-t border-white/[0.05] pt-4 mt-4 shrink-0 max-w-2xl w-full mx-auto">
              <button
                onClick={resetWorkspacePipeline}
                className="px-4 py-2 rounded-lg border border-red-500/20 hover:border-red-500/40 text-red-400 bg-red-500/[0.02] hover:bg-red-500/[0.05] text-xs font-medium cursor-pointer transition-all flex items-center justify-center gap-1 shadow-sm"
              >
                <X size={12} />
                <span>Close Panel</span>
              </button>

              <div className="flex gap-2">
                <button
                  onClick={handlePreviousPageAction}
                  disabled={currentPageIndex === 0 || isPageLoading}
                  className="px-4 py-2 rounded-lg border border-white/10 text-white bg-white/[0.01] text-xs font-medium cursor-pointer flex items-center gap-1 disabled:opacity-25 disabled:cursor-not-allowed hover:bg-white/[0.04] transition-all"
                >
                  <ChevronLeft size={13} />
                  <span>Back</span>
                </button>

                <button
                  onClick={handleNextPageAction}
                  disabled={currentPageIndex === documentPages.length - 1 || isPageLoading}
                  className="px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-semibold text-xs border-0 cursor-pointer flex items-center gap-1 disabled:opacity-25 disabled:cursor-not-allowed transition-all shadow-md"
                >
                  <span>Next Page</span>
                  <ChevronRight size={13} />
                </button>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  )
}