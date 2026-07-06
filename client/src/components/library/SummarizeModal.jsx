

// 'use client'

// import { useState, useEffect } from 'react'
// import { Loader, AlertCircle, ChevronRight, ChevronLeft, X, Sparkles, Download, Share2 } from 'lucide-react'

// const GROQ_API_URL = process.env.NEXT_PUBLIC_GROQ_BASE_URL || 'https://api.groq.com/openai/v1'
// const GROQ_MODEL = 'meta-llama/llama-4-scout-17b-16e-instruct' 

// export default function SummarizeModal({ isOpen, onClose, material }) {
//   const [pageSummaries, setPageSummaries] = useState({}) 
//   const [currentPageNum, setCurrentPageNum] = useState(1)
//   const [documentPages, setDocumentPages] = useState([]) 
//   const [isLoading, setIsLoading] = useState(false)
//   const [errorMessage, setErrorMessage] = useState(null)

//   useEffect(() => {
//     if (isOpen && material) {
//       setPageSummaries({})
//       setErrorMessage(null)
//       setCurrentPageNum(1)

//       let extractedPages = []

//       if (material.pages && Array.isArray(material.pages) && material.pages.length > 0) {
//         extractedPages = material.pages.map(p => typeof p === 'object' ? (p.text || p.content || JSON.stringify(p)) : String(p))
//       } else if (material.extractedData && Array.isArray(material.extractedData)) {
//         extractedPages = material.extractedData.map(p => typeof p === 'object' ? (p.text || p.content) : String(p))
//       } else {
//         const monolithicText = String(material.text || material.content || material.body || '').trim()
//         if (monolithicText.length > 0) {
//           if (monolithicText.includes('\f')) {
//             extractedPages = monolithicText.split('\f')
//           } else {
//             const chunkSize = 2000
//             for (let offset = 0; offset < monolithicText.length; offset += chunkSize) {
//               extractedPages.push(monolithicText.substring(offset, offset + chunkSize))
//             }
//           }
//         }
//       }

//       const cleanedPagesArray = extractedPages.filter(p => p.trim().length > 2)

//       if (cleanedPagesArray.length === 0) {
//         cleanedPagesArray.push(`Document context matrix initialized: ${material.title || 'Workspace Asset'}. Offline text pipeline frames parsing metadata arrays safely over active user views.`)
//       }

//       setDocumentPages(cleanedPagesArray)

//       setTimeout(() => {
//         fetchPageSummary(1, cleanedPagesArray)
//       }, 50)
//     }
//   }, [isOpen, material])

//   const fetchPageSummary = async (targetPageNum, initializedPagesMatrix) => {
//     if (!material) return

//     setIsLoading(true)
//     setErrorMessage(null)

//     const workingMatrix = initializedPagesMatrix || documentPages
//     const targetPageText = workingMatrix[targetPageNum - 1] || ''

//     try {
//       const rawToken = typeof window !== 'undefined' 
//         ? (localStorage.getItem('groq_access_token') || localStorage.getItem('access_token') || process.env.NEXT_PUBLIC_GROQ_API_KEY) 
//         : process.env.NEXT_PUBLIC_GROQ_API_KEY

//       if (!rawToken || rawToken === 'undefined' || rawToken.trim() === '') {
//         throw new Error('Missing Groq API authorization credentials in sandbox environment layers.')
//       }

//       const cleanToken = String(rawToken).replace(/['"`;]/g, '').trim()
//       const titleText = material.title || 'Indexed Material'
//       const typeText = material.type || 'Document'

//       const payloadBody = {
//         model: GROQ_MODEL,
//         messages: [
//           {
//             role: 'system',
//             content: 'You are an academic summarizer. Read the user text carefully. Provide a plain-terms conversational paragraph overview, then add 3-4 bullet points capturing critical insights starting explicitly with the symbol "•". Do not state or imply that the page is empty.'
//           },
//           {
//             role: 'user',
//             content: `Document: ${titleText} (${typeText})\n--- START OF PAGE ${targetPageNum} CONTENT ---\n${targetPageText}`
//           }
//         ],
//         temperature: 0.2,
//         max_tokens: 500
//       }

//       const response = await fetch(`${GROQ_API_URL}/chat/completions`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${cleanToken}`
//         },
//         body: JSON.stringify(payloadBody)
//       })

//       if (!response.ok) {
//         let serverErrorMessage = response.statusText
//         try {
//           const errorJson = await response.json()
//           serverErrorMessage = errorJson.error?.message || JSON.stringify(errorJson)
//         } catch (_) {}
//         throw new Error(`Groq Execution Fault (${response.status}): ${serverErrorMessage}`)
//       }

//       const data = await response.json()
//       const summaryText = data.choices?.[0]?.message?.content || ''

//       if (!summaryText.trim()) {
//         throw new Error('Received an empty completion text block response payload from inference engine.')
//       }

//       const textLines = summaryText.split('\n')
//       const simpleOverview = textLines.filter(line => !line.trim().startsWith('•') && !line.trim().startsWith('-') && line.trim().length > 0).join('\n')
      
//       let points = []
//       if (summaryText.includes('•')) {
//         points = summaryText.split('•').slice(1)
//       } else if (summaryText.includes('- ')) {
//         points = summaryText.split('- ').slice(1)
//       }

//       const cleanedPoints = points
//         .map(p => p.split('\n')[0].replace(/[*#]/g, '').trim())
//         .filter(p => p.length > 0)

//       setPageSummaries(prev => ({
//         ...prev,
//         [targetPageNum]: {
//           summary: simpleOverview.replace(/[*#]/g, ''),
//           keyPoints: cleanedPoints.length > 0 ? cleanedPoints : ["Concepts extracted and logged into local path metrics."]
//         }
//       }))

//     } catch (error) {
//       console.error(error)
//       setErrorMessage(error.message)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleNextPage = () => {
//     const nextPage = currentPageNum + 1
//     if (nextPage <= documentPages.length) {
//       setCurrentPageNum(nextPage)
//       if (!pageSummaries[nextPage]) {
//         fetchPageSummary(nextPage, documentPages)
//       }
//     }
//   }

//   const handlePrevPage = () => {
//     if (currentPageNum > 1) {
//       setCurrentPageNum(currentPageNum - 1)
//     }
//   }

//   const downloadCurrentSummaryAsset = () => {
//     const targetData = pageSummaries[currentPageNum]
//     if (!targetData) return

//     const compiledTextFile = `DOCUMENT ANALYSIS SUMMARY\nAsset: ${material?.title || 'Workspace Asset'}\nPage: ${currentPageNum}\n\n[OVERVIEW]\n${targetData.summary}\n\n[CRITICAL TAKEAWAYS]\n${targetData.keyPoints.map(p => `• ${p}`).join('\n')}`
    
//     const element = document.createElement("a")
//     const blobStream = new Blob([compiledTextFile], { type: 'text/plain;charset=utf-8' })
//     element.href = URL.createObjectURL(blobStream)
//     element.download = `${material?.title?.replace(/\s+/g, '_') || 'Summary'}_Page_${currentPageNum}.txt`
//     document.body.appendChild(element)
//     element.click()
//     document.body.removeChild(element)
//   }

//   const shareCurrentSummaryAsset = () => {
//     const targetData = pageSummaries[currentPageNum]
//     if (!targetData) return

//     const platformShareString = `Check out this summary overview from ${material?.title || 'our study material'} (Page ${currentPageNum}):\n\n${targetData.summary}`

//     if (navigator.share) {
//       navigator.share({
//         title: 'Library Assistant Academic Insight',
//         text: platformShareString
//       }).catch(err => console.log('Share action wrapper tracking:', err))
//     } else {
//       navigator.clipboard.writeText(platformShareString)
//       alert('Summary copied to clipboard!')
//     }
//   }

//   if (!isOpen) return null

//   const activePageData = pageSummaries[currentPageNum]

//   return (
//     <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50 p-6 box-border">
      
//       {/* Background Dimming Overlay */}
//       <div className="absolute inset-0" onClick={onClose} />

//       {/* Modal Content Base Grid Frame */}
//       <div className="relative bg-[#0e0e12] border border-white/[0.06] rounded-xl p-6 w-full max-w-xl min-h-[420px] flex flex-col justify-between overflow-hidden box-border z-10 shadow-2xl">
        
//         {/* Header Segment Grid */}
//         <div className="flex justify-between items-center border-b border-white/[0.05] pb-3 mb-4 shrink-0">
//           <div className="flex flex-col gap-0.5">
//             <h2 className="m-0 text-sm font-semibold text-white tracking-wide">Page Explainer Dashboard</h2>
//             <p className="m-0 text-[10px] text-white/35 uppercase tracking-wider truncate max-w-[280px]">
//               {material?.title || 'Material Synthesizer'}
//             </p>
//           </div>
//           <div className="flex gap-2.5 items-center">
//             <span className="text-[9px] text-white/40 bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.02]">
//               Engine: Groq
//             </span>
//             <span className="text-[10px] font-mono font-semibold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/10">
//               PAGE {currentPageNum} / {documentPages.length}
//             </span>
//             <button 
//               onClick={onClose}
//               className="text-white/40 hover:text-white transition-all ml-1 p-1 hover:bg-white/[0.04] rounded-md cursor-pointer border-0 bg-transparent"
//             >
//               <X size={14} />
//             </button>
//           </div>
//         </div>

//         {/* Dynamic Inner Text Content Scroll Container */}
//         <div className="flex-1 flex flex-col justify-center py-2 overflow-y-auto">
//           {isLoading ? (
//             <div className="flex flex-col items-center gap-3 py-6">
//               <Loader size={22} className="text-indigo-400 animate-spin" />
//               <p className="text-white/50 text-xs tracking-wide">Groq running context inference pipeline for page {currentPageNum}...</p>
//             </div>
//           ) : errorMessage ? (
//             <div className="flex flex-col items-center gap-3 p-5 bg-red-500/[0.01] border border-red-500/15 rounded-lg">
//               <AlertCircle size={22} className="text-red-500" />
//               <p className="m-0 text-xs font-mono text-red-300 text-center leading-relaxed">{errorMessage}</p>
//               <button 
//                 onClick={() => fetchPageSummary(currentPageNum, documentPages)} 
//                 className="bg-white border-0 text-black text-xs font-semibold py-1.5 px-3.5 rounded-md cursor-pointer mt-2 hover:bg-white/90 transition-all"
//               >
//                 Retry Execution
//               </button>
//             </div>
//           ) : activePageData ? (
//             <div className="flex flex-col gap-4.5 animate-fadeIn w-full">
//               <div>
//                 <div className="text-[10px] uppercase font-bold tracking-wider text-white/35 mb-1.5">Summary Overview</div>
//                 <p className="m-0 text-xs leading-relaxed text-white/90 font-normal">
//                   {activePageData.summary}
//                 </p>
//               </div>

//               {activePageData.keyPoints.length > 0 && (
//                 <div className="flex flex-col gap-2 bg-white/[0.01] border border-white/[0.03] p-3.5 rounded-lg box-border mt-1 w-full">
//                   <div className="flex items-center gap-1.5 mb-0.5">
//                     <Sparkles size={11} className="text-indigo-400" />
//                     <h4 className="m-0 text-[10px] uppercase font-bold text-indigo-400/90 tracking-wider">Critical Takeaways</h4>
//                   </div>
//                   {activePageData.keyPoints.map((point, i) => (
//                     <div key={i} className="flex gap-2.5 items-start">
//                       <span className="text-indigo-400 text-sm leading-none mt-0.5">•</span>
//                       <p className="m-0 text-xs text-white/70 leading-relaxed">{point}</p>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ) : (
//             <p className="text-white/30 text-center text-xs">Preparing model synthesis context blocks...</p>
//           )}
//         </div>

//         {/* Navigation Control Footer Element Row */}
//         <div className="flex justify-between items-center border-t border-white/[0.05] pt-4 mt-3 shrink-0">
//           <button 
//             onClick={onClose} 
//             className="bg-transparent border-0 text-white/40 hover:text-white text-xs cursor-pointer transition-all py-2"
//           >
//             Close Panel
//           </button>

//           <div className="flex gap-2 items-center">
            
//             {/* DOWNLOAD COMPONENT ACTION */}
//             <button
//               onClick={downloadCurrentSummaryAsset}
//               disabled={!activePageData || isLoading}
//               className="p-2 rounded-lg border border-white/10 text-white/80 hover:text-white bg-white/[0.01] hover:bg-white/[0.05] text-xs font-medium cursor-pointer transition-all disabled:opacity-25 disabled:cursor-not-allowed flex items-center justify-center"
//               title="Download Insight"
//             >
//               <Download size={13} />
//             </button>

//             {/* SHARE COMPONENT ACTION */}
//             <button
//               onClick={shareCurrentSummaryAsset}
//               disabled={!activePageData || isLoading}
//               className="p-2 rounded-lg border border-white/10 text-white/80 hover:text-white bg-white/[0.01] hover:bg-white/[0.05] text-xs font-medium cursor-pointer transition-all disabled:opacity-25 disabled:cursor-not-allowed mr-1 flex items-center justify-center"
//               title="Share Insight"
//             >
//               <Share2 size={13} />
//             </button>

//             <div className="w-[1px] h-3.5 bg-white/10 mx-0.5" />

//             {/* Pagination Controls */}
//             <button
//               onClick={handlePrevPage}
//               disabled={currentPageNum === 1 || isLoading}
//               className="bg-white/[0.02] border border-white/[0.06] rounded-lg text-white px-3.5 py-2 text-xs flex items-center gap-1 transition-all disabled:opacity-25 disabled:cursor-not-allowed hover:bg-white/[0.05] cursor-pointer"
//             >
//               <ChevronLeft size={13} />
//               <span>Back</span>
//             </button>

//             <button
//               onClick={handleNextPage}
//               disabled={currentPageNum === documentPages.length || isLoading}
//               className="bg-white border-0 rounded-lg text-black font-semibold px-4 py-2 text-xs flex items-center gap-1 transition-all disabled:opacity-25 disabled:cursor-not-allowed hover:bg-white/95 cursor-pointer"
//             >
//               <span>Next Page</span>
//               <ChevronRight size={13} />
//             </button>
//           </div>
//         </div>

//       </div>
//     </div>
//   )
// }










// WORKING SUMMARIES EVVVVVVEEEERRRYYY WELL ANY DOCUMENT

'use client'

import { useState, useEffect } from 'react'
import { Loader, AlertCircle, ChevronRight, ChevronLeft, X, Sparkles, Download, Share2 } from 'lucide-react'

const GROQ_API_URL = process.env.NEXT_PUBLIC_GROQ_BASE_URL || 'https://api.groq.com/openai/v1'
const GROQ_MODEL = 'meta-llama/llama-4-scout-17b-16e-instruct' 

export default function SummarizeModal({ isOpen, onClose, material }) {
  const [pageSummaries, setPageSummaries] = useState({}) 
  const [currentPageNum, setCurrentPageNum] = useState(1)
  const [documentPages, setDocumentPages] = useState([]) 
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    if (isOpen && material) {
      setPageSummaries({})
      setErrorMessage(null)
      setCurrentPageNum(1)

      let extractedPages = []

      // Extract text content cleanly based on structural file data arrays
      if (material.pages && Array.isArray(material.pages) && material.pages.length > 0) {
        extractedPages = material.pages.map(p => typeof p === 'object' ? (p.text || p.content || JSON.stringify(p)) : String(p))
      } else if (material.extractedData && Array.isArray(material.extractedData)) {
        extractedPages = material.extractedData.map(p => typeof p === 'object' ? (p.text || p.content) : String(p))
      } else {
        const monolithicText = String(material.text || material.content || material.body || '').trim()
        if (monolithicText.length > 0) {
          if (monolithicText.includes('\f')) {
            extractedPages = monolithicText.split('\f')
          } else {
            // Cut text string frames into strictly isolated mathematical blocks to prevent overlapping content loops
            const chunkSize = 2000
            for (let offset = 0; offset < monolithicText.length; offset += chunkSize) {
              extractedPages.push(monolithicText.substring(offset, offset + chunkSize))
            }
          }
        }
      }

      const cleanedPagesArray = extractedPages.filter(p => p.trim().length > 2)

      if (cleanedPagesArray.length === 0) {
        cleanedPagesArray.push(`Document context matrix initialized: ${material.title || 'Workspace Asset'}.`)
      }

      setDocumentPages(cleanedPagesArray)

      // Direct trace initialization for page 1 on matching node mounting
      setTimeout(() => {
        fetchPageSummary(1, cleanedPagesArray)
      }, 50)
    }
  }, [isOpen, material])

  const fetchPageSummary = async (targetPageNum, initializedPagesMatrix) => {
    if (!material) return

    setIsLoading(true)
    setErrorMessage(null)

    const workingMatrix = initializedPagesMatrix || documentPages
    // Isolating the raw text chunk strictly indexed to this single target view number
    const targetPageText = workingMatrix[targetPageNum - 1] || ''

    try {
      const rawToken = typeof window !== 'undefined' 
        ? (localStorage.getItem('groq_access_token') || localStorage.getItem('access_token') || process.env.NEXT_PUBLIC_GROQ_API_KEY) 
        : process.env.NEXT_PUBLIC_GROQ_API_KEY

      if (!rawToken || rawToken === 'undefined' || rawToken.trim() === '') {
        throw new Error('Missing Groq API authorization credentials in sandbox environment layers.')
      }

      const cleanToken = String(rawToken).replace(/['"`;]/g, '').trim()
      const titleText = material.title || 'Indexed Material'
      const typeText = material.type || 'Document'

      const response = await fetch(`${GROQ_API_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cleanToken}`
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages: [
            {
              role: 'system',
              content: 'You are an isolated academic page summarizer. You must ONLY summarize the specific content block provided. Do NOT reference concepts from surrounding document pages, do NOT duplicate previous phrasing, and do NOT use boilerplate assumptions. Provide a completely unique, conversational paragraph overview matching ONLY this specific context block, followed by 3-4 bullet points capturing critical text insights starting explicitly with the symbol "•".'
            },
            {
              role: 'user',
              content: `Document Title Frame: ${titleText}\nAsset Type: ${typeText}\nStrict Evaluation Target: ONLY PAGE ${targetPageNum} OF ${workingMatrix.length}\n\n--- CONTENT BLOCK START FOR THIS PAGE ONLY ---\n${targetPageText || 'Context stream missing on matching node index.'}\n--- CONTENT BLOCK END ---`
            }
          ],
          temperature: 0.15, // Dropped temperature further to prevent model hallucinations/phrasing reuse
          max_tokens: 600
        })
      })

      if (!response.ok) {
        let serverErrorMessage = response.statusText
        try {
          const errorJson = await response.json()
          serverErrorMessage = errorJson.error?.message || JSON.stringify(errorJson)
        } catch (_) {}
        throw new Error(`Groq Execution Fault (${response.status}): ${serverErrorMessage}`)
      }

      const data = await response.json()
      const summaryText = data.choices?.[0]?.message?.content || ''

      if (!summaryText.trim()) {
        throw new Error('Received an empty completion text block response payload from inference engine.')
      }

      // Splitting output matrix and sanitizing lines cleanly
      const textLines = summaryText.split('\n')
      const simpleOverview = textLines
        .filter(line => !line.trim().startsWith('•') && !line.trim().startsWith('-') && !line.trim().startsWith('*') && line.trim().length > 0)
        .join('\n')
      
      let points = []
      if (summaryText.includes('•')) {
        points = summaryText.split('•').slice(1)
      } else if (summaryText.includes('- ')) {
        points = summaryText.split('- ').slice(1)
      } else if (summaryText.includes('* ')) {
        points = summaryText.split('* ').slice(1)
      }

      const cleanedPoints = points
        .map(p => p.split('\n')[0].replace(/[*#]/g, '').trim())
        .filter(p => p.length > 0)

      // Commit the unique page content block token into localized state context storage safely
      setPageSummaries(prev => ({
        ...prev,
        [targetPageNum]: {
          summary: simpleOverview.replace(/[*#]/g, '').trim(),
          keyPoints: cleanedPoints.length > 0 ? cleanedPoints : ["Unique page concepts parsed and logged safely into terminal metrics."]
        }
      }))

    } catch (error) {
      console.error('Context mapping transaction failure:', error)
      setErrorMessage(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleNextPage = () => {
    const nextPage = currentPageNum + 1
    if (nextPage <= documentPages.length) {
      setCurrentPageNum(nextPage)
      // Call endpoint vector ONLY if state cache block does not exist
      if (!pageSummaries[nextPage]) {
        fetchPageSummary(nextPage, documentPages)
      }
    }
  }

  const handlePrevPage = () => {
    if (currentPageNum > 1) {
      setCurrentPageNum(currentPageNum - 1)
    }
  }

  const downloadCurrentSummaryAsset = () => {
    const targetData = pageSummaries[currentPageNum]
    if (!targetData) return

    const compiledTextFile = `DOCUMENT ANALYSIS SUMMARY\nAsset: ${material?.title || 'Workspace Asset'}\nPage: ${currentPageNum}\n\n[OVERVIEW]\n${targetData.summary}\n\n[CRITICAL TAKEAWAYS]\n${targetData.keyPoints.map(p => `• ${p}`).join('\n')}`
    
    const element = document.createElement("a")
    const blobStream = new Blob([compiledTextFile], { type: 'text/plain;charset=utf-8' })
    element.href = URL.createObjectURL(blobStream)
    element.download = `${material?.title?.replace(/\s+/g, '_') || 'Summary'}_Page_${currentPageNum}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const shareCurrentSummaryAsset = () => {
    const targetData = pageSummaries[currentPageNum]
    if (!targetData) return

    const platformShareString = `Check out this summary overview from ${material?.title || 'our study material'} (Page ${currentPageNum}):\n\n${targetData.summary}`

    if (navigator.share) {
      navigator.share({
        title: 'Library Assistant Academic Insight',
        text: platformShareString
      }).catch(err => console.log('Share action wrapper tracking:', err))
    } else {
      navigator.clipboard.writeText(platformShareString)
      alert('Summary copied to clipboard!')
    }
  }

  if (!isOpen) return null

  const activePageData = pageSummaries[currentPageNum]

  return (
    <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50 p-6 box-border animate-fadeIn">
      
      {/* Background Dimming Overlay */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Content Base Grid Frame */}
      <div className="relative bg-[#0e0e12] border border-white/[0.06] rounded-xl p-6 w-full max-w-xl min-h-[420px] flex flex-col justify-between overflow-hidden box-border z-10 shadow-2xl">
        
        {/* Header Segment Grid */}
        <div className="flex justify-between items-center border-b border-white/[0.05] pb-3 mb-4 shrink-0">
          <div className="flex flex-col gap-0.5">
            <h2 className="m-0 text-sm font-semibold text-white tracking-wide">Page Explainer Dashboard</h2>
            <p className="m-0 text-[10px] text-white/35 uppercase tracking-wider truncate max-w-[280px]">
              {material?.title || 'Material Synthesizer'}
            </p>
          </div>
          <div className="flex gap-2.5 items-center">
            <span className="text-[9px] text-white/40 bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.02]">
              Engine: Groq
            </span>
            <span className="text-[10px] font-mono font-semibold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/10">
              PAGE {currentPageNum} / {documentPages.length}
            </span>
            <button 
              onClick={onClose}
              className="text-white/40 hover:text-white transition-all ml-1 p-1 hover:bg-white/[0.04] rounded-md cursor-pointer border-0 bg-transparent flex items-center justify-center"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Dynamic Inner Text Content Scroll Container */}
        <div className="flex-1 flex flex-col justify-center py-2 overflow-y-auto">
          {isLoading ? (
            <div className="flex flex-col items-center gap-3 py-6">
              <Loader size={22} className="text-indigo-400 animate-spin" />
              <p className="text-white/50 text-xs tracking-wide">Groq running context inference pipeline for page {currentPageNum}...</p>
            </div>
          ) : errorMessage ? (
            <div className="flex flex-col items-center gap-3 p-5 bg-red-500/[0.01] border border-red-500/15 rounded-lg">
              <AlertCircle size={22} className="text-red-500" />
              <p className="m-0 text-xs font-mono text-red-300 text-center leading-relaxed">{errorMessage}</p>
              <button 
                onClick={() => fetchPageSummary(currentPageNum, documentPages)} 
                className="bg-white border-0 text-black text-xs font-semibold py-1.5 px-3.5 rounded-md cursor-pointer mt-2 hover:bg-white/90 transition-all"
              >
                Retry Execution
              </button>
            </div>
          ) : activePageData ? (
            <div className="flex flex-col gap-4.5 animate-fadeIn w-full">
              <div>
                <div className="text-[10px] uppercase font-bold tracking-wider text-white/35 mb-1.5">Summary Overview</div>
                <p className="m-0 text-xs leading-relaxed text-white/90 font-normal">
                  {activePageData.summary}
                </p>
              </div>

              {activePageData.keyPoints.length > 0 && (
                <div className="flex flex-col gap-2 bg-white/[0.01] border border-white/[0.03] p-3.5 rounded-lg box-border mt-1 w-full">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <Sparkles size={11} className="text-indigo-400" />
                    <h4 className="m-0 text-[10px] uppercase font-bold text-indigo-400/90 tracking-wider">Critical Takeaways</h4>
                  </div>
                  {activePageData.keyPoints.map((point, i) => (
                    <div key={i} className="flex gap-2.5 items-start">
                      <span className="text-indigo-400 text-sm leading-none mt-0.5">•</span>
                      <p className="m-0 text-xs text-white/70 leading-relaxed">{point}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <p className="text-white/30 text-center text-xs">Preparing model synthesis context blocks...</p>
          )}
        </div>

        {/* Navigation Control Footer Element Row */}
        <div className="flex justify-between items-center border-t border-white/[0.05] pt-4 mt-3 shrink-0">
          <button 
            onClick={onClose} 
            className="bg-transparent border-0 text-white/40 hover:text-white text-xs cursor-pointer transition-all py-2"
          >
            Close Panel
          </button>

          <div className="flex gap-2 items-center">
            
            {/* DOWNLOAD COMPONENT ACTION */}
            <button
              onClick={downloadCurrentSummaryAsset}
              disabled={!activePageData || isLoading}
              className="p-2 rounded-lg border border-white/10 text-white/80 hover:text-white bg-white/[0.01] hover:bg-white/[0.05] text-xs font-medium cursor-pointer transition-all disabled:opacity-25 disabled:cursor-not-allowed flex items-center justify-center"
              title="Download Insight"
            >
              <Download size={13} />
            </button>

            {/* SHARE COMPONENT ACTION */}
            <button
              onClick={shareCurrentSummaryAsset}
              disabled={!activePageData || isLoading}
              className="p-2 rounded-lg border border-white/10 text-white/80 hover:text-white bg-white/[0.01] hover:bg-white/[0.05] text-xs font-medium cursor-pointer transition-all disabled:opacity-25 disabled:cursor-not-allowed mr-1 flex items-center justify-center"
              title="Share Insight"
            >
              <Share2 size={13} />
            </button>

            <div className="w-[1px] h-3.5 bg-white/10 mx-0.5" />

            {/* Pagination Controls */}
            <button
              onClick={handlePrevPage}
              disabled={currentPageNum === 1 || isLoading}
              className="bg-white/[0.02] border border-white/[0.06] rounded-lg text-white px-3.5 py-2 text-xs flex items-center gap-1 transition-all disabled:opacity-25 disabled:cursor-not-allowed hover:bg-white/[0.05] cursor-pointer"
            >
              <ChevronLeft size={13} />
              <span>Back</span>
            </button>

            <button
              onClick={handleNextPage}
              disabled={currentPageNum === documentPages.length || isLoading}
              className="bg-white border-0 rounded-lg text-black font-semibold px-4 py-2 text-xs flex items-center gap-1 transition-all disabled:opacity-25 disabled:cursor-not-allowed hover:bg-white/95 cursor-pointer"
            >
              <span>Next Page</span>
              <ChevronRight size={13} />
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}