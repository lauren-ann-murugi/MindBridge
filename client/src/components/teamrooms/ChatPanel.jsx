


// //WORKING CODE BELOW

'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import {
  Send, MoreVertical, Search, Bell, BellOff, Pin, Smile,
  FileText, Image as ImageIcon, Camera, BarChart2, Paperclip,
  X, Trash2, CheckCircle, Edit3, Palette, Download, ChevronRight,
  ChevronDown, ArrowLeft
} from 'lucide-react'

const EMOJI_LIST = [
  "😀","😃","😄","😁","😆","😅","😂","🤣","🥲","😊","😇","🙂","🙃","😉","😌","😍","🥰","😘",
  "😗","😙","😚","😋","😜","😝","😛","🤑","🤗","🤪","🤨","🧐","🤓","😎","🥸","🤩","🥳","🤡","🤠",
  "😏","😒","😞","😔","😟","😕","🙁","😣","😖","😫","😩","🥺","😤","😠","😡","🤬","🤯","😶",
  "🥵","🥶","😐","😑","😯","😦","😧","😮","😲","🥱","😵","😳","😱","😨","😰","😢","😥","🤤","😭",
  "😓","😪","😴","🙄","🤔","🤭","🤫","🤥","😬","🤐","🥴","🤢","👿","😈","🤕","🤒","😷","🤧","🤮",
  "👹","👺","💩","👻","💀","👽","😻","😹","😸","😺","🎃","🤖","👾","😼","😽","🙀","😿","😾",
  "🤲","👐","👊","👎","👍","🤝","🙏","👏","🙌","✊","🤛","🤜","🤞","🤟","🤘","👌","🤏","👈",
  "👉","👆","👇","💪","🤙","👋","🖖","🖐","🤚","✋","👅","🦷","👄","💋","💄","💍","💅","👀","👣","🫂",
  "❤️","🧡","💛","💚","💙","💜","🖤","🤍","🤎","💔","❣️","💕","💞","💓","💗","💖","💘","💝",
  "❌","💢","💯","🔥","✨","🌟","⚡","💥","🎉","🎊","🚀","🌹","🥀","🌻","🌼","🌸","🌺",
  "🍑","🍆","🍒","🍉","🍌","🍋","🍫","🍸","🥃","🍾","☕","🙈","🙉","🙊","🐒","🐶","🐱","🪐","💫","⭐","💦","💧","🌙"
]

const THEME_MANIFEST = [
  { id: 'default', name: 'Default', url: '' },
  { id: 'dark-floral', name: 'Dark Floral', url: '/Darkfloral.jpg' },
  { id: 'chill-cat', name: 'Chill Cat', url: '/Chillcat.jpg' },
  { id: 'selfie-goats', name: 'Selfie Goats', url: '/Selfiegoats.jpg' },
  { id: 'toothless-eyes', name: 'Toothless Eyes', url: '/Toothlesseyes.jpg' },
  { id: 'amber-vinyl', name: 'Amber Vinyl', url: '/Ambervinyl.jpg' },
]

const INITIAL_MESSAGES = [
  { id: 1, author: 'Sarah L.', content: 'Can someone explain closures in JavaScript?', time: '2:15 PM', avatar: 'SL', reactions: {}, type: 'text', isPinned: false, fileData: null },
  { id: 2, author: 'You', content: 'Sure! A closure is a function that retains access to variables from its outer scope even after the outer function has returned.', time: '2:18 PM', avatar: 'You', reactions: {}, type: 'text', isPinned: false, fileData: null },
  { id: 3, author: 'John M.', content: null, time: '2:22 PM', avatar: 'JM', reactions: { '❤️': 1, '🚀': 1 }, type: 'document', fileName: 'Web_Core_Closures.pdf', fileSize: '2.4 MB', isPinned: false, fileData: null },
]

export default function ChatPanel({ roomName = 'Web Development Room' }) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [inputValue, setInputValue] = useState('')
  const [hoveredId, setHoveredId] = useState(null)
  const [activeActionId, setActiveActionId] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [editValue, setEditValue] = useState('')
  const [showMenu, setShowMenu] = useState(false)
  const [showThemeMenu, setShowThemeMenu] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchFilter, setSearchFilter] = useState('all')
  const [isMuted, setIsMuted] = useState(false)
  const [isPinned, setIsPinned] = useState(false)
  const [showAttachMenu, setShowAttachMenu] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [showPollModal, setShowPollModal] = useState(false)
  const [showCamModal, setShowCamModal] = useState(false)
  const [pollQuestion, setPollQuestion] = useState('')
  const [pollOptions, setPollOptions] = useState(['', ''])
  const [currentWallpaper, setCurrentWallpaper] = useState('')
  const [camError, setCamError] = useState('')

  const messagesEndRef = useRef(null)
  const messagesContainerRef = useRef(null)
  const menuRef = useRef(null)
  const attachRef = useRef(null)
  const actionRef = useRef(null)
  const fileDocRef = useRef(null)
  const fileImgRef = useRef(null)
  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const searchInputRef = useRef(null)

  // Scroll to bottom inside the messages container (never affects page)
  useEffect(() => {
    if (!showSearch && !searchQuery) {
      const el = messagesContainerRef.current
      if (el) el.scrollTop = el.scrollHeight
    }
  }, [messages, showSearch, searchQuery])

  // Focus search input when search panel opens
  useEffect(() => {
    if (showSearch) setTimeout(() => searchInputRef.current?.focus(), 50)
  }, [showSearch])

  // Click-outside handler for dropdowns
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false)
        setShowThemeMenu(false)
      }
      if (attachRef.current && !attachRef.current.contains(e.target)) {
        setShowAttachMenu(false)
        setShowEmojiPicker(false)
      }
      if (actionRef.current && !actionRef.current.contains(e.target)) {
        setActiveActionId(null)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const nowTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  const sendMessage = useCallback((payload = null) => {
    if (!payload && !inputValue.trim()) return
    const base = { id: Date.now(), author: 'You', avatar: 'You', time: nowTime(), reactions: {}, isPinned: false, fileData: null }
    const msg = payload ? { ...base, ...payload } : { ...base, type: 'text', content: inputValue.trim() }
    setMessages(prev => [...prev, msg])
    setInputValue('')
    setShowEmojiPicker(false)
    setShowAttachMenu(false)
  }, [inputValue])

  const deleteMessage = (id) => { setMessages(prev => prev.filter(m => m.id !== id)); setActiveActionId(null) }
  const pinMessage = (id) => { setMessages(prev => prev.map(m => m.id === id ? { ...m, isPinned: !m.isPinned } : m)); setActiveActionId(null) }
  const startEdit = (id, content) => { setEditingId(id); setEditValue(content); setActiveActionId(null) }
  const saveEdit = (id) => {
    if (!editValue.trim()) return
    setMessages(prev => prev.map(m => m.id === id ? { ...m, content: editValue } : m))
    setEditingId(null); setEditValue('')
  }
  const cancelEdit = () => { setEditingId(null); setEditValue('') }

  const reactToMessage = (id, emoji) => {
    setMessages(prev => prev.map(m => {
      if (m.id !== id) return m
      const r = { ...m.reactions }
      r[emoji] ? delete r[emoji] : (r[emoji] = 1)
      return { ...m, reactions: r }
    }))
  }

  const castVote = (msgId, optId) => {
    setMessages(prev => prev.map(m => {
      if (m.id !== msgId || m.type !== 'poll') return m
      const opts = m.options.map(o => {
        const voted = o.votedUsers.includes('You')
        if (o.id === optId) {
          return voted
            ? { ...o, votes: o.votes - 1, votedUsers: o.votedUsers.filter(u => u !== 'You') }
            : { ...o, votes: o.votes + 1, votedUsers: [...o.votedUsers, 'You'] }
        } else if (voted) {
          return { ...o, votes: o.votes - 1, votedUsers: o.votedUsers.filter(u => u !== 'You') }
        }
        return o
      })
      return { ...m, options: opts }
    }))
  }

  const handleDocUpload = (e) => {
    const file = e.target.files?.[0]; if (!file) return
    const sz = file.size > 1048576 ? `${(file.size / 1048576).toFixed(1)} MB` : `${(file.size / 1024).toFixed(1)} KB`
    const reader = new FileReader()
    reader.onload = () => sendMessage({ type: 'document', fileName: file.name, fileSize: sz, fileData: reader.result, content: null })
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const handleImgUpload = (e) => {
    const file = e.target.files?.[0]; if (!file) return
    const reader = new FileReader()
    reader.onload = () => sendMessage({ type: 'image', content: reader.result, fileName: file.name, fileData: reader.result })
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const startCamera = async () => {
    setShowAttachMenu(false)
    setCamError('')
    setShowCamModal(true)
    setTimeout(async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } })
        streamRef.current = stream
        if (videoRef.current) videoRef.current.srcObject = stream
      } catch (err) {
        setCamError(err.message || 'Camera unavailable')
      }
    }, 120)
  }

  const capturePhoto = () => {
    if (!videoRef.current) return
    const c = document.createElement('canvas')
    c.width = videoRef.current.videoWidth; c.height = videoRef.current.videoHeight
    c.getContext('2d').drawImage(videoRef.current, 0, 0)
    const data = c.toDataURL('image/png')
    sendMessage({ type: 'image', content: data, fileName: `Capture_${Date.now()}.png`, fileData: data })
    stopCamera()
  }

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach(t => t.stop())
    streamRef.current = null
    setShowCamModal(false)
    setCamError('')
  }

  const submitPoll = () => {
    if (!pollQuestion.trim()) return
    const opts = pollOptions.filter(o => o.trim())
    if (opts.length < 2) { alert('Please add at least 2 options.'); return }
    sendMessage({ type: 'poll', question: pollQuestion, options: opts.map((t, i) => ({ id: i, text: t, votes: 0, votedUsers: [] })), content: null })
    setPollQuestion(''); setPollOptions(['', '']); setShowPollModal(false)
  }

  const downloadFile = (fileName, fileData) => {
    if (!fileData) { alert('This is a demo file — only uploaded files can be downloaded.'); return }
    const a = document.createElement('a'); a.href = fileData; a.download = fileName; a.click()
  }

  const cancelSearch = () => {
    setSearchQuery('')
    setSearchFilter('all')
    setShowSearch(false)
  }

  const filteredMessages = messages.filter(m => {
    const q = searchQuery.toLowerCase()
    const matchText = !q
      || (m.content && m.content.toLowerCase().includes(q))
      || (m.fileName && m.fileName.toLowerCase().includes(q))
      || (m.question && m.question.toLowerCase().includes(q))
    if (!matchText) return false
    if (searchFilter === 'all') return true
    if (searchFilter === 'docs') return m.type === 'document'
    if (searchFilter === 'media') return m.type === 'image'
    if (searchFilter === 'polls') return m.type === 'poll'
    if (searchFilter === 'links') return m.type === 'text' && /https?:\/\/[^\s]+/.test(m.content || '')
    return false
  })

  const S = {
    bg: '#020b14',
    surface: '#091d33',
    surface2: '#0f1f3a',
    accent: '#3b82f6',
    accent2: '#60a5fa',
    text: '#f1f5f9',
    muted: '#94a3b8',
    border: 'rgba(255,255,255,0.07)',
    danger: '#f87171',
  }

  return (
    /*
     * KEY FIX: The outermost wrapper uses position:relative + a fixed pixel height
     * (not flex-grow or min-height). overflow:hidden on the wrapper guarantees
     * nothing can push it taller. The inner column is also height:100% so it
     * fills exactly the wrapper. The messages div gets flex:1 + overflow-y:auto
     * + min-height:0 so it is the ONLY part that scrolls — header, search bar,
     * and input bar are flex-shrink:0 and never grow.
     */
    <div style={{
      position: 'relative',
      width: '100%',
      height: '640px',        /* ← fixed, never changes */
      maxHeight: '640px',     /* ← hard cap */
      overflow: 'hidden',     /* ← nothing escapes */
      background: S.bg,
      border: `1px solid ${S.border}`,
      borderRadius: 16,
      fontFamily: 'Inter, system-ui, sans-serif',
    }}>

      {/* Hidden file inputs */}
      <input type="file" ref={fileDocRef} onChange={handleDocUpload} style={{ display: 'none' }} accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.csv,.ppt,.pptx" />
      <input type="file" ref={fileImgRef} onChange={handleImgUpload} style={{ display: 'none' }} accept="image/*" />

      {/* Full-height column that never grows beyond the wrapper */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',       /* ← fill the 640px wrapper exactly */
        width: '100%',
        overflow: 'hidden',   /* ← belt-and-suspenders */
      }}>

        {/* ── Header — fixed, never shrinks or grows ── */}
        <div style={{
          flexShrink: 0,
          padding: '14px 20px',
          background: S.surface,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: `1px solid ${S.border}`,
          zIndex: 50,
          position: 'relative',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <h2 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: S.text }}>{roomName}</h2>
              {isPinned && <Pin size={12} style={{ color: S.accent2, transform: 'rotate(45deg)' }} />}
            </div>
            <p style={{ margin: '2px 0 0', fontSize: 11, color: S.muted }}>
              {isMuted ? 'Notifications muted' : 'Online · 14 active contributors'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <button
              onClick={() => setShowSearch(s => !s)}
              title="Search"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: showSearch ? S.accent2 : S.muted, padding: 5, borderRadius: 6, display: 'flex', alignItems: 'center' }}
            >
              <Search size={18} />
            </button>

            <div ref={menuRef} style={{ position: 'relative' }}>
              <button
                onClick={() => { setShowMenu(s => !s); setShowThemeMenu(false) }}
                title="More options"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: S.muted, padding: 5, borderRadius: 6, display: 'flex', alignItems: 'center' }}
              >
                <MoreVertical size={18} />
              </button>
              {showMenu && (
                <div style={{
                  position: 'absolute', top: 34, right: 0, background: S.surface2,
                  borderRadius: 10, width: 220, boxShadow: '0 8px 32px rgba(0,0,0,.6)',
                  zIndex: 200, border: `1px solid ${S.border}`, overflow: 'hidden',
                }}>
                  {[
                    { icon: <Search size={14} />, label: 'Search messages', action: () => { setShowSearch(true); setShowMenu(false) } },
                    { icon: isMuted ? <Bell size={14} /> : <BellOff size={14} />, label: isMuted ? 'Unmute notifications' : 'Mute notifications', action: () => { setIsMuted(s => !s); setShowMenu(false) } },
                    { icon: <Pin size={14} />, label: isPinned ? 'Unpin channel' : 'Pin channel', action: () => { setIsPinned(s => !s); setShowMenu(false) } },
                  ].map((item, i) => (
                    <div key={i} onClick={item.action}
                      style={{ padding: '10px 16px', fontSize: 13, color: S.text, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, transition: 'background .15s' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.05)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >{item.icon}{item.label}</div>
                  ))}
                  <div style={{ borderTop: `1px solid ${S.border}` }} />
                  <div
                    onClick={(e) => { e.stopPropagation(); setShowThemeMenu(s => !s) }}
                    style={{ padding: '10px 16px', fontSize: 13, color: showThemeMenu ? S.accent2 : S.text, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, transition: 'background .15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.05)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <Palette size={14} />
                    <span style={{ flex: 1 }}>Change theme</span>
                    {showThemeMenu ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                  </div>
                  {showThemeMenu && (
                    <div style={{ background: S.surface, borderTop: `1px solid ${S.border}`, maxHeight: 160, overflowY: 'auto' }}>
                      {THEME_MANIFEST.map(t => (
                        <div key={t.id}
                          onClick={() => { setCurrentWallpaper(t.url); setShowMenu(false); setShowThemeMenu(false) }}
                          style={{
                            padding: '8px 16px 8px 32px', fontSize: 12,
                            color: currentWallpaper === t.url ? S.accent2 : S.muted,
                            cursor: 'pointer', fontWeight: currentWallpaper === t.url ? 600 : 400,
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            background: currentWallpaper === t.url ? 'rgba(96,165,250,.07)' : 'transparent',
                            transition: 'background .15s',
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.04)'}
                          onMouseLeave={e => e.currentTarget.style.background = currentWallpaper === t.url ? 'rgba(96,165,250,.07)' : 'transparent'}
                        >
                          {t.name}
                          {currentWallpaper === t.url && <div style={{ width: 5, height: 5, borderRadius: '50%', background: S.accent2 }} />}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Search bar — fixed height when open, never pushes messages out ── */}
        {showSearch && (
          <div style={{
            flexShrink: 0,
            padding: '10px 16px',
            background: S.surface2,
            borderBottom: `1px solid ${S.border}`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <div style={{
                flex: 1, display: 'flex', alignItems: 'center', gap: 8,
                background: S.bg, border: `1px solid ${S.border}`, borderRadius: 8, padding: '0 10px',
              }}>
                <Search size={14} style={{ color: S.muted, flexShrink: 0 }} />
                <input
                  ref={searchInputRef}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onKeyDown={e => e.key === 'Escape' && cancelSearch()}
                  placeholder="Search messages, files, polls..."
                  style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: S.text, fontSize: 13, padding: '9px 0' }}
                />
                {searchQuery && (
                  <X size={14} style={{ color: S.muted, cursor: 'pointer', flexShrink: 0 }} onClick={() => setSearchQuery('')} />
                )}
              </div>
              <button
                onClick={cancelSearch}
                style={{
                  background: 'none', border: `1px solid ${S.border}`, borderRadius: 7,
                  color: S.muted, fontSize: 12, fontWeight: 500, padding: '7px 14px',
                  cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0, transition: 'all .2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = S.text; e.currentTarget.style.borderColor = 'rgba(255,255,255,.22)' }}
                onMouseLeave={e => { e.currentTarget.style.color = S.muted; e.currentTarget.style.borderColor = S.border }}
              >Cancel</button>
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {[
                { key: 'all', label: 'All' },
                { key: 'docs', label: 'Docs' },
                { key: 'media', label: 'Media' },
                { key: 'polls', label: 'Polls' },
                { key: 'links', label: 'Links' },
              ].map(f => (
                <button key={f.key} onClick={() => setSearchFilter(f.key)} style={{
                  padding: '4px 12px', borderRadius: 20, fontSize: 11,
                  border: `1px solid ${searchFilter === f.key ? S.accent : S.border}`,
                  background: searchFilter === f.key ? S.accent : 'transparent',
                  color: searchFilter === f.key ? '#fff' : S.muted,
                  cursor: 'pointer', transition: 'all .2s',
                }}>{f.label}</button>
              ))}
            </div>
          </div>
        )}

        {/* ── Messages — THE ONLY SCROLLABLE PART. flex:1 + min-height:0 is the key ── */}
        <div
          ref={messagesContainerRef}
          style={{
            flex: 1,              /* takes all remaining vertical space */
            minHeight: 0,         /* CRITICAL: allows flex child to shrink below content height */
            overflowY: 'auto',    /* scroll happens HERE, nowhere else */
            overflowX: 'hidden',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            /* custom scrollbar */
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(255,255,255,0.15) transparent',
            /* wallpaper */
            backgroundImage: currentWallpaper ? `url('${currentWallpaper}')` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            boxShadow: currentWallpaper ? 'inset 0 0 0 2000px rgba(2,11,20,.6)' : 'none',
          }}
        >
          {/* No results */}
          {filteredMessages.length === 0 ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '40px 20px' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: S.surface2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Search size={28} style={{ color: S.muted }} />
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ margin: 0, fontSize: 15, fontWeight: 600, color: S.text }}>No results found</p>
                <p style={{ margin: '6px 0 0', fontSize: 13, color: S.muted }}>
                  {searchQuery ? `Nothing matches "${searchQuery}"` : `No ${searchFilter} messages yet`}
                </p>
              </div>
              <button
                onClick={cancelSearch}
                style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 20px', borderRadius: 8, background: S.accent, border: 'none', color: '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}
              >
                <ArrowLeft size={14} /> Back to chat
              </button>
            </div>
          ) : (
            filteredMessages.map(msg => {
              const isMe = msg.author === 'You'
              const reactionKeys = Object.keys(msg.reactions)
              const totalVotes = msg.type === 'poll' ? msg.options.reduce((s, o) => s + o.votes, 0) : 0
              const isEditing = editingId === msg.id

              return (
                <div
                  key={msg.id}
                  onMouseEnter={() => setHoveredId(msg.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{
                    display: 'flex', justifyContent: isMe ? 'flex-end' : 'flex-start',
                    width: '100%', position: 'relative',
                    marginBottom: reactionKeys.length > 0 ? 14 : 4,
                  }}
                >
                  {/* Quick reaction bar */}
                  {hoveredId === msg.id && !isEditing && (
                    <div style={{
                      position: 'absolute', top: -32,
                      [isMe ? 'right' : 'left']: isMe ? 12 : 40,
                      background: S.surface2, borderRadius: 20, padding: '3px 10px',
                      display: 'flex', gap: 6, boxShadow: '0 4px 12px rgba(0,0,0,.4)',
                      zIndex: 50, border: `1px solid ${S.border}`,
                    }}>
                      {['👍', '❤️', '😂', '😮', '🚀', '🙏'].map(e => (
                        <span key={e} onClick={() => reactToMessage(msg.id, e)}
                          style={{ cursor: 'pointer', fontSize: 15, transition: 'transform .1s' }}
                          onMouseEnter={ev => ev.currentTarget.style.transform = 'scale(1.3)'}
                          onMouseLeave={ev => ev.currentTarget.style.transform = 'scale(1)'}
                        >{e}</span>
                      ))}
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: 8, maxWidth: '65%', flexDirection: isMe ? 'row-reverse' : 'row' }}>
                    {!isMe && (
                      <div style={{
                        width: 28, height: 28, borderRadius: '50%', background: S.accent,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 10, fontWeight: 700, color: '#fff', flexShrink: 0, marginTop: 2,
                      }}>{msg.avatar}</div>
                    )}

                    <div style={{ position: 'relative' }}>
                      {/* Pin badge */}
                      {msg.isPinned && (
                        <div style={{
                          position: 'absolute', top: -17, [isMe ? 'right' : 'left']: 0,
                          display: 'flex', alignItems: 'center', gap: 3,
                          background: S.surface, border: `1px solid ${S.border}`,
                          padding: '2px 7px', borderRadius: 5, fontSize: 9, color: S.accent2, whiteSpace: 'nowrap',
                        }}>
                          <Pin size={8} style={{ transform: 'rotate(45deg)' }} /> Pinned
                        </div>
                      )}

                      {/* Bubble */}
                      <div
                        onClick={() => isMe && !isEditing && setActiveActionId(activeActionId === msg.id ? null : msg.id)}
                        style={{
                          background: isMe ? 'rgba(29,78,216,.92)' : 'rgba(15,30,50,.96)',
                          backdropFilter: currentWallpaper ? 'blur(4px)' : 'none',
                          padding: '9px 12px 20px',
                          borderRadius: isMe ? '10px 2px 10px 10px' : '2px 10px 10px 10px',
                          color: S.text, boxShadow: '0 1px 4px rgba(0,0,0,.3)',
                          border: `1px solid ${isMe ? 'rgba(96,165,250,.15)' : S.border}`,
                          cursor: isMe && !isEditing ? 'pointer' : 'default', position: 'relative',
                        }}
                      >
                        {!isMe && <div style={{ fontSize: 11, fontWeight: 600, color: S.accent2, marginBottom: 3 }}>{msg.author}</div>}

                        {/* TEXT */}
                        {msg.type === 'text' && (
                          isEditing ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 220 }}>
                              <input
                                value={editValue}
                                onChange={e => setEditValue(e.target.value)}
                                onKeyDown={e => { if (e.key === 'Enter') saveEdit(msg.id); if (e.key === 'Escape') cancelEdit() }}
                                autoFocus
                                style={{ background: S.bg, border: `1px solid ${S.accent2}`, borderRadius: 6, padding: '6px 10px', color: S.text, fontSize: 13, outline: 'none', fontFamily: 'inherit' }}
                              />
                              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                                <span onClick={cancelEdit} style={{ fontSize: 11, color: S.danger, cursor: 'pointer' }}>Cancel</span>
                                <span onClick={() => saveEdit(msg.id)} style={{ fontSize: 11, color: S.accent2, cursor: 'pointer', fontWeight: 600 }}>Save</span>
                              </div>
                            </div>
                          ) : (
                            <p
                              style={{ margin: 0, fontSize: 13.5, lineHeight: 1.5, wordBreak: 'break-word', paddingRight: 44 }}
                              dangerouslySetInnerHTML={{ __html: (msg.content || '').replace(/https?:\/\/[^\s]+/g, u => `<a href="${u}" style="color:${S.accent2}" target="_blank" rel="noopener">${u}</a>`) }}
                            />
                          )
                        )}

                        {/* IMAGE */}
                        {msg.type === 'image' && (
                          <div>
                            <img src={msg.content} alt={msg.fileName} style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 8, display: 'block', cursor: 'pointer' }} onClick={() => downloadFile(msg.fileName, msg.fileData)} />
                            <div onClick={() => downloadFile(msg.fileName, msg.fileData)} style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 6, fontSize: 11, color: S.accent2, cursor: 'pointer' }}>
                              <Download size={12} /> {msg.fileName}
                            </div>
                          </div>
                        )}

                        {/* DOCUMENT */}
                        {msg.type === 'document' && (
                          <div
                            onClick={() => downloadFile(msg.fileName, msg.fileData)}
                            style={{
                              display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(0,0,0,.2)',
                              padding: 10, borderRadius: 8, border: `1px solid ${S.border}`,
                              minWidth: 210, cursor: 'pointer', marginBottom: 4, transition: 'background .2s',
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.05)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,.2)'}
                          >
                            <FileText size={24} style={{ color: S.muted, flexShrink: 0 }} />
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontSize: 12.5, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{msg.fileName}</div>
                              <div style={{ fontSize: 10.5, color: S.muted }}>{msg.fileSize}</div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: S.accent2, padding: '3px 8px', border: `1px solid rgba(96,165,250,.3)`, borderRadius: 5, flexShrink: 0 }}>
                              <Download size={11} /> Download
                            </div>
                          </div>
                        )}

                        {/* POLL */}
                        {msg.type === 'poll' && (
                          <div style={{ minWidth: 250 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13.5, fontWeight: 600, marginBottom: 10, color: S.accent2 }}>
                              <BarChart2 size={15} /> {msg.question}
                            </div>
                            {msg.options.map(opt => {
                              const voted = opt.votedUsers.includes('You')
                              const pct = totalVotes === 0 ? 0 : Math.round((opt.votes / totalVotes) * 100)
                              return (
                                <div key={opt.id}
                                  onClick={e => { e.stopPropagation(); castVote(msg.id, opt.id) }}
                                  style={{
                                    background: 'rgba(255,255,255,.02)',
                                    border: `1px solid ${voted ? S.accent2 : S.border}`,
                                    borderRadius: 6, padding: '8px 12px', fontSize: 12.5,
                                    cursor: 'pointer', position: 'relative', overflow: 'hidden',
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                    marginBottom: 5, transition: 'border-color .2s',
                                  }}
                                >
                                  <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: `${pct}%`, background: 'rgba(59,130,246,.1)', transition: 'width .3s', zIndex: 1 }} />
                                  <span style={{ zIndex: 2, fontWeight: voted ? 600 : 400, display: 'flex', alignItems: 'center', gap: 6 }}>
                                    {voted && <CheckCircle size={13} style={{ color: S.accent2 }} />} {opt.text}
                                  </span>
                                  <span style={{ zIndex: 2, fontSize: 11, color: S.muted }}>{opt.votes} ({pct}%)</span>
                                </div>
                              )
                            })}
                            <div style={{ fontSize: 10, color: S.muted, textAlign: 'right', marginTop: 4 }}>Total votes: {totalVotes}</div>
                          </div>
                        )}

                        <div style={{ position: 'absolute', bottom: 4, right: 8, fontSize: 9.5, color: S.muted }}>{msg.time}</div>
                      </div>

                      {/* Action popover */}
                      {activeActionId === msg.id && (
                        <div ref={actionRef} style={{
                          position: 'absolute', bottom: 'calc(100% + 6px)', right: 0,
                          background: S.surface2, borderRadius: 8, width: 150,
                          boxShadow: '0 4px 20px rgba(0,0,0,.5)', zIndex: 200,
                          border: `1px solid ${S.border}`, overflow: 'hidden',
                        }}>
                          {msg.type === 'text' && !isEditing && (
                            <div onClick={e => { e.stopPropagation(); startEdit(msg.id, msg.content) }}
                              style={{ padding: '9px 12px', fontSize: 12.5, color: S.text, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, transition: 'background .15s' }}
                              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.05)'}
                              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                            ><Edit3 size={13} style={{ color: S.accent2 }} /> Edit</div>
                          )}
                          <div onClick={e => { e.stopPropagation(); pinMessage(msg.id) }}
                            style={{ padding: '9px 12px', fontSize: 12.5, color: S.text, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, transition: 'background .15s' }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.05)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                          ><Pin size={13} style={{ color: '#eab308', transform: 'rotate(45deg)' }} /> {msg.isPinned ? 'Unpin' : 'Pin'}</div>
                          <div onClick={e => { e.stopPropagation(); deleteMessage(msg.id) }}
                            style={{ padding: '9px 12px', fontSize: 12.5, color: S.danger, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, transition: 'background .15s' }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(248,113,113,.1)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                          ><Trash2 size={13} /> Delete</div>
                        </div>
                      )}

                      {/* Reactions */}
                      {reactionKeys.length > 0 && (
                        <div style={{
                          position: 'absolute', bottom: -12, [isMe ? 'left' : 'right']: 8,
                          background: '#0e1e30', border: `1px solid ${S.border}`, borderRadius: 10,
                          padding: '2px 8px', display: 'flex', alignItems: 'center', gap: 3,
                          fontSize: 12, boxShadow: '0 2px 6px rgba(0,0,0,.3)', zIndex: 10,
                        }}>
                          {reactionKeys.map((r, i) => <span key={i}>{r}</span>)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* ── Input area — fixed at bottom, never grows ── */}
        <div style={{
          flexShrink: 0,
          padding: '10px 16px',
          background: S.surface,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          borderTop: `1px solid ${S.border}`,
          position: 'relative',
          zIndex: 60,
        }}>
          <div ref={attachRef} style={{ display: 'flex', gap: 6, position: 'relative' }}>
            {/* Emoji */}
            <button onClick={() => { setShowEmojiPicker(s => !s); setShowAttachMenu(false) }}
              title="Emoji"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: showEmojiPicker ? S.accent2 : S.muted, padding: 4, borderRadius: 6, display: 'flex', alignItems: 'center' }}
            >
              <Smile size={20} />
            </button>
            {showEmojiPicker && (
              <div style={{
                position: 'absolute', bottom: 44, left: -8, background: S.surface2,
                border: `1px solid ${S.border}`, borderRadius: 12, padding: 10, width: 286,
                maxHeight: 210, overflowY: 'auto', display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)',
                gap: 4, boxShadow: '0 -4px 24px rgba(0,0,0,.6)', zIndex: 999,
              }}>
                {EMOJI_LIST.map((em, i) => (
                  <span key={i} onClick={() => setInputValue(v => v + em)}
                    style={{ cursor: 'pointer', fontSize: 18, textAlign: 'center', lineHeight: 1, padding: 3, borderRadius: 4, transition: 'background .1s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.08)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >{em}</span>
                ))}
              </div>
            )}

            {/* Attach */}
            <button onClick={() => { setShowAttachMenu(s => !s); setShowEmojiPicker(false) }}
              title="Attach"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: showAttachMenu ? S.accent2 : S.muted, padding: 4, borderRadius: 6, display: 'flex', alignItems: 'center', transform: 'rotate(45deg)' }}
            >
              <Paperclip size={20} />
            </button>
            {showAttachMenu && (
              <div style={{
                position: 'absolute', bottom: 44, left: 20, background: S.surface2, borderRadius: 10,
                width: 195, boxShadow: '0 -4px 20px rgba(0,0,0,.5)', border: `1px solid ${S.border}`,
                overflow: 'hidden', zIndex: 999,
              }}>
                {[
                  { icon: <FileText size={15} style={{ color: S.muted }} />, label: 'Local document', action: () => fileDocRef.current?.click() },
                  { icon: <ImageIcon size={15} style={{ color: S.accent2 }} />, label: 'Upload picture', action: () => fileImgRef.current?.click() },
                  { icon: <Camera size={15} style={{ color: '#ec407a' }} />, label: 'Device camera', action: startCamera },
                  { icon: <BarChart2 size={15} style={{ color: '#eab308' }} />, label: 'Deploy live poll', action: () => { setShowPollModal(true); setShowAttachMenu(false) } },
                ].map((item, i) => (
                  <div key={i} onClick={item.action}
                    style={{ padding: '10px 14px', fontSize: 13, color: S.text, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, transition: 'background .15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.05)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >{item.icon}{item.label}</div>
                ))}
              </div>
            )}
          </div>

          <input
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..."
            style={{
              flex: 1, background: S.bg, border: `1px solid ${S.border}`, padding: '9px 14px',
              borderRadius: 8, color: S.text, fontSize: 13.5, outline: 'none', fontFamily: 'inherit', transition: 'border-color .2s',
            }}
            onFocus={e => e.target.style.borderColor = 'rgba(96,165,250,.4)'}
            onBlur={e => e.target.style.borderColor = S.border}
          />

          <button onClick={() => sendMessage()} disabled={!inputValue.trim()} style={{
            width: 36, height: 36, borderRadius: '50%',
            background: inputValue.trim() ? S.accent : 'rgba(255,255,255,.04)',
            border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: inputValue.trim() ? 'pointer' : 'default', transition: 'background .2s', flexShrink: 0,
          }}>
            <Send size={14} style={{ color: inputValue.trim() ? '#fff' : S.muted, marginLeft: 1 }} />
          </button>
        </div>
      </div>

      {/* ── Poll modal ── */}
      {showPollModal && (
        <div onClick={() => setShowPollModal(false)} style={{
          position: 'absolute', inset: 0, background: 'rgba(0,0,0,.7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 500,
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: S.surface2, borderRadius: 14, padding: 24, width: 360,
            border: `1px solid ${S.border}`, boxShadow: '0 8px 40px rgba(0,0,0,.6)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: S.text, display: 'flex', alignItems: 'center', gap: 8 }}>
                <BarChart2 size={16} style={{ color: '#eab308' }} /> Create a poll
              </h3>
              <button onClick={() => setShowPollModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: S.muted, padding: 2 }}><X size={18} /></button>
            </div>
            <input value={pollQuestion} onChange={e => setPollQuestion(e.target.value)} placeholder="Ask a question..."
              style={{ width: '100%', background: S.bg, border: `1px solid ${S.border}`, borderRadius: 8, padding: '9px 12px', color: S.text, fontSize: 13, outline: 'none', fontFamily: 'inherit', marginBottom: 10, boxSizing: 'border-box' }}
              onFocus={e => e.target.style.borderColor = 'rgba(96,165,250,.4)'}
              onBlur={e => e.target.style.borderColor = S.border}
            />
            {pollOptions.map((opt, i) => (
              <div key={i} style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                <input value={opt} onChange={e => { const o = [...pollOptions]; o[i] = e.target.value; setPollOptions(o) }} placeholder={`Option ${i + 1}`}
                  style={{ flex: 1, background: S.bg, border: `1px solid ${S.border}`, borderRadius: 8, padding: '8px 12px', color: S.text, fontSize: 13, outline: 'none', fontFamily: 'inherit' }}
                  onFocus={e => e.target.style.borderColor = 'rgba(96,165,250,.4)'}
                  onBlur={e => e.target.style.borderColor = S.border}
                />
                {pollOptions.length > 2 && (
                  <button onClick={() => setPollOptions(o => o.filter((_, j) => j !== i))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: S.danger, padding: '0 4px', display: 'flex', alignItems: 'center' }}><X size={15} /></button>
                )}
              </div>
            ))}
            {pollOptions.length < 6 && (
              <button onClick={() => setPollOptions(o => [...o, ''])}
                style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px', borderRadius: 6, background: 'transparent', border: `1px solid ${S.border}`, color: S.muted, fontSize: 12, cursor: 'pointer', marginTop: 4 }}>
                + Add option
              </button>
            )}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16 }}>
              <button onClick={() => setShowPollModal(false)} style={{ padding: '8px 18px', borderRadius: 8, background: 'transparent', border: `1px solid ${S.border}`, color: S.muted, fontSize: 13, cursor: 'pointer' }}>Cancel</button>
              <button onClick={submitPoll} style={{ padding: '8px 18px', borderRadius: 8, background: S.accent, border: 'none', color: '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>Launch poll</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Camera modal ── */}
      {showCamModal && (
        <div style={{
          position: 'absolute', inset: 0, background: 'rgba(0,0,0,.75)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 500,
        }}>
          <div style={{
            background: S.surface2, borderRadius: 14, padding: 24, width: 380,
            border: `1px solid ${S.border}`, boxShadow: '0 8px 40px rgba(0,0,0,.6)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: S.text, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Camera size={16} style={{ color: '#ec407a' }} /> Device camera
              </h3>
              <button onClick={stopCamera} style={{ background: 'none', border: 'none', cursor: 'pointer', color: S.muted, padding: 2 }}><X size={18} /></button>
            </div>
            {camError ? (
              <div style={{ padding: '24px 16px', textAlign: 'center', color: S.danger, fontSize: 13 }}>
                <Camera size={32} style={{ color: S.muted, display: 'block', margin: '0 auto 10px' }} />
                Camera unavailable: {camError}
              </div>
            ) : (
              <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', borderRadius: 10, background: '#000', display: 'block', maxHeight: 240 }} />
            )}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 14 }}>
              <button onClick={stopCamera} style={{ padding: '8px 18px', borderRadius: 8, background: 'transparent', border: `1px solid ${S.border}`, color: S.muted, fontSize: 13, cursor: 'pointer' }}>Cancel</button>
              {!camError && (
                <button onClick={capturePhoto} style={{ padding: '8px 18px', borderRadius: 8, background: '#ec407a', border: 'none', color: '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Camera size={14} /> Capture
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}




// 'use client'

// import { useState, useRef, useEffect, useCallback } from 'react'
// import {
//   Send, MoreVertical, Search, Bell, BellOff, Pin, Smile,
//   FileText, Image as ImageIcon, Camera, BarChart2, Paperclip,
//   X, Trash2, CheckCircle, Edit3, Palette, Download, ChevronRight,
//   ChevronDown, ArrowLeft
// } from 'lucide-react'

// const EMOJI_LIST = [
//   "😀","😃","😄","😁","😆","😅","😂","🤣","🥲","😊","😇","🙂","🙃","😉","😌","😍","🥰","😘",
//   "😗","😙","😚","😋","😜","😝","😛","🤑","🤗","🤪","🤨","🧐","🤓","😎","🥸","🤩","🥳","🤡","🤠",
//   "😏","😒","😞","😔","😟","😕","🙁","😣","😖","😫","😩","🥺","😤","😠","😡","🤬","🤯","😶",
//   "🥵","🥶","😐","😑","😯","😦","😧","😮","😲","🥱","😵","😳","😱","😨","😰","😢","😥","🤤","😭",
//   "😓","😪","😴","🙄","🤔","🤭","🤫","🤥","😬","🤐","🥴","🤢","👿","😈","🤕","🤒","😷","🤧","🤮",
//   "👹","👺","💩","👻","💀","👽","😻","😹","😸","😺","🎃","🤖","👾","😼","😽","🙀","😿","😾",
//   "🤲","👐","👊","👎","👍","🤝","🙏","👏","🙌","✊","🤛","🤜","🤞","🤟","🤘","👌","🤏","👈",
//   "👉","👆","👇","💪","🤙","👋","🖖","🖐","🤚","✋","👅","🦷","👄","💋","💄","💍","💅","👀","👣","🫂",
//   "❤️","🧡","💛","💚","💙","💜","🖤","🤍","🤎","💔","❣️","💕","💞","💓","💗","💖","💘","💝",
//   "❌","💢","💯","🔥","✨","🌟","⚡","💥","🎉","🎊","🚀","🌹","🥀","🌻","🌼","🌸","🌺",
//   "🍑","🍆","🍒","🍉","🍌","🍋","🍫","🍸","🥃","🍾","☕","🙈","🙉","🙊","🐒","🐶","🐱","🪐","💫","⭐","💦","💧","🌙"
// ]

// const THEME_MANIFEST = [
//   { id: 'default', name: 'Default', url: '' },
//   { id: 'dark-floral', name: 'Dark Floral', url: '/Darkfloral.jpg' },
//   { id: 'chill-cat', name: 'Chill Cat', url: '/Chillcat.jpg' },
//   { id: 'selfie-goats', name: 'Selfie Goats', url: '/Selfiegoats.jpg' },
//   { id: 'toothless-eyes', name: 'Toothless Eyes', url: '/Toothlesseyes.jpg' },
//   { id: 'amber-vinyl', name: 'Amber Vinyl', url: '/Ambervinyl.jpg' },
// ]

// const INITIAL_MESSAGES = [
//   { id: 1, author: 'Sarah L.', content: 'Can someone explain closures in JavaScript?', time: '2:15 PM', avatar: 'SL', reactions: {}, type: 'text', isPinned: false, fileData: null },
//   { id: 2, author: 'You', content: 'Sure! A closure is a function that retains access to variables from its outer scope even after the outer function has returned.', time: '2:18 PM', avatar: 'You', reactions: {}, type: 'text', isPinned: false, fileData: null },
//   { id: 3, author: 'John M.', content: null, time: '2:22 PM', avatar: 'JM', reactions: { '❤️': 1, '🚀': 1 }, type: 'document', fileName: 'Web_Core_Closures.pdf', fileSize: '2.4 MB', isPinned: false, fileData: null },
// ]

// export default function ChatPanel({ roomName = 'Web Development Room' }) {
//   const [messages, setMessages] = useState(INITIAL_MESSAGES)
//   const [inputValue, setInputValue] = useState('')
//   const [hoveredId, setHoveredId] = useState(null)
//   const [activeActionId, setActiveActionId] = useState(null)
//   const [editingId, setEditingId] = useState(null)
//   const [editValue, setEditValue] = useState('')
//   const [showMenu, setShowMenu] = useState(false)
//   const [showThemeMenu, setShowThemeMenu] = useState(false)
//   const [showSearch, setShowSearch] = useState(false)
//   const [searchQuery, setSearchQuery] = useState('')
//   const [searchFilter, setSearchFilter] = useState('all')
//   const [isMuted, setIsMuted] = useState(false)
//   const [isPinned, setIsPinned] = useState(false)
//   const [showAttachMenu, setShowAttachMenu] = useState(false)
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false)
//   const [showPollModal, setShowPollModal] = useState(false)
//   const [showCamModal, setShowCamModal] = useState(false)
//   const [pollQuestion, setPollQuestion] = useState('')
//   const [pollOptions, setPollOptions] = useState(['', ''])
//   const [currentWallpaper, setCurrentWallpaper] = useState('')
//   const [camError, setCamError] = useState('')
//   const [isScrolling, setIsScrolling] = useState(false)

//   const messagesEndRef = useRef(null)
//   const messagesContainerRef = useRef(null)
//   const menuRef = useRef(null)
//   const attachRef = useRef(null)
//   const actionRef = useRef(null)
//   const fileDocRef = useRef(null)
//   const fileImgRef = useRef(null)
//   const videoRef = useRef(null)
//   const streamRef = useRef(null)
//   const searchInputRef = useRef(null)
//   const scrollTimeoutRef = useRef(null)

//   // Auto-scroll to bottom with smooth behavior - only when NOT searching
//   useEffect(() => {
//     if (!showSearch && !searchQuery && messagesContainerRef.current) {
//       messagesContainerRef.current.scrollIntoView({ behavior: 'smooth' })
//     }
//   }, [messages, showSearch, searchQuery])

//   // Focus search input when search panel opens
//   useEffect(() => {
//     if (showSearch) setTimeout(() => searchInputRef.current?.focus(), 50)
//   }, [showSearch])

//   // Enhanced scroll detection for smooth scrolling
//   useEffect(() => {
//     const container = messagesContainerRef.current?.parentElement
//     if (!container) return

//     const handleScroll = () => {
//       setIsScrolling(true)
//       if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
//       scrollTimeoutRef.current = setTimeout(() => setIsScrolling(false), 150)
//     }

//     container.addEventListener('scroll', handleScroll, { passive: true })
//     return () => {
//       container.removeEventListener('scroll', handleScroll)
//       if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
//     }
//   }, [])

//   // Click-outside handler for dropdowns
//   useEffect(() => {
//     const handler = (e) => {
//       if (menuRef.current && !menuRef.current.contains(e.target)) {
//         setShowMenu(false)
//         setShowThemeMenu(false)
//       }
//       if (attachRef.current && !attachRef.current.contains(e.target)) {
//         setShowAttachMenu(false)
//         setShowEmojiPicker(false)
//       }
//       if (actionRef.current && !actionRef.current.contains(e.target)) {
//         setActiveActionId(null)
//       }
//     }
//     document.addEventListener('mousedown', handler)
//     return () => document.removeEventListener('mousedown', handler)
//   }, [])

//   const nowTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

//   const sendMessage = useCallback((payload = null) => {
//     if (!payload && !inputValue.trim()) return
//     const base = { id: Date.now(), author: 'You', avatar: 'You', time: nowTime(), reactions: {}, isPinned: false, fileData: null }
//     const msg = payload ? { ...base, ...payload } : { ...base, type: 'text', content: inputValue.trim() }
//     setMessages(prev => [...prev, msg])
//     setInputValue('')
//     setShowEmojiPicker(false)
//     setShowAttachMenu(false)
//   }, [inputValue])

//   const deleteMessage = (id) => { setMessages(prev => prev.filter(m => m.id !== id)); setActiveActionId(null) }
//   const pinMessage = (id) => { setMessages(prev => prev.map(m => m.id === id ? { ...m, isPinned: !m.isPinned } : m)); setActiveActionId(null) }
//   const startEdit = (id, content) => { setEditingId(id); setEditValue(content); setActiveActionId(null) }
//   const saveEdit = (id) => {
//     if (!editValue.trim()) return
//     setMessages(prev => prev.map(m => m.id === id ? { ...m, content: editValue } : m))
//     setEditingId(null); setEditValue('')
//   }
//   const cancelEdit = () => { setEditingId(null); setEditValue('') }

//   const reactToMessage = (id, emoji) => {
//     setMessages(prev => prev.map(m => {
//       if (m.id !== id) return m
//       const r = { ...m.reactions }
//       r[emoji] ? delete r[emoji] : (r[emoji] = 1)
//       return { ...m, reactions: r }
//     }))
//   }

//   const castVote = (msgId, optId) => {
//     setMessages(prev => prev.map(m => {
//       if (m.id !== msgId || m.type !== 'poll') return m
//       const opts = m.options.map(o => {
//         const voted = o.votedUsers.includes('You')
//         if (o.id === optId) {
//           return voted
//             ? { ...o, votes: o.votes - 1, votedUsers: o.votedUsers.filter(u => u !== 'You') }
//             : { ...o, votes: o.votes + 1, votedUsers: [...o.votedUsers, 'You'] }
//         } else if (voted) {
//           return { ...o, votes: o.votes - 1, votedUsers: o.votedUsers.filter(u => u !== 'You') }
//         }
//         return o
//       })
//       return { ...m, options: opts }
//     }))
//   }

//   const handleDocUpload = (e) => {
//     const file = e.target.files?.[0]; if (!file) return
//     const sz = file.size > 1048576 ? `${(file.size / 1048576).toFixed(1)} MB` : `${(file.size / 1024).toFixed(1)} KB`
//     const reader = new FileReader()
//     reader.onload = () => sendMessage({ type: 'document', fileName: file.name, fileSize: sz, fileData: reader.result, content: null })
//     reader.readAsDataURL(file)
//     e.target.value = ''
//   }

//   const handleImgUpload = (e) => {
//     const file = e.target.files?.[0]; if (!file) return
//     const reader = new FileReader()
//     reader.onload = () => sendMessage({ type: 'image', content: reader.result, fileName: file.name, fileData: reader.result })
//     reader.readAsDataURL(file)
//     e.target.value = ''
//   }

//   const startCamera = async () => {
//     setShowAttachMenu(false)
//     setCamError('')
//     setShowCamModal(true)
//     setTimeout(async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } })
//         streamRef.current = stream
//         if (videoRef.current) videoRef.current.srcObject = stream
//       } catch (err) {
//         setCamError(err.message || 'Camera unavailable')
//       }
//     }, 120)
//   }

//   const capturePhoto = () => {
//     if (!videoRef.current) return
//     const c = document.createElement('canvas')
//     c.width = videoRef.current.videoWidth; c.height = videoRef.current.videoHeight
//     c.getContext('2d').drawImage(videoRef.current, 0, 0)
//     const data = c.toDataURL('image/png')
//     sendMessage({ type: 'image', content: data, fileName: `Capture_${Date.now()}.png`, fileData: data })
//     stopCamera()
//   }

//   const stopCamera = () => {
//     streamRef.current?.getTracks().forEach(t => t.stop())
//     streamRef.current = null
//     setShowCamModal(false)
//     setCamError('')
//   }

//   const submitPoll = () => {
//     if (!pollQuestion.trim()) return
//     const opts = pollOptions.filter(o => o.trim())
//     if (opts.length < 2) { alert('Please add at least 2 options.'); return }
//     sendMessage({ type: 'poll', question: pollQuestion, options: opts.map((t, i) => ({ id: i, text: t, votes: 0, votedUsers: [] })), content: null })
//     setPollQuestion(''); setPollOptions(['', '']); setShowPollModal(false)
//   }

//   const downloadFile = (fileName, fileData) => {
//     if (!fileData) { alert('This is a demo file — only uploaded files can be downloaded.'); return }
//     const a = document.createElement('a'); a.href = fileData; a.download = fileName; a.click()
//   }

//   const cancelSearch = () => {
//     setSearchQuery('')
//     setSearchFilter('all')
//     setShowSearch(false)
//   }

//   const filteredMessages = messages.filter(m => {
//     const q = searchQuery.toLowerCase()
//     const matchText = !q
//       || (m.content && m.content.toLowerCase().includes(q))
//       || (m.fileName && m.fileName.toLowerCase().includes(q))
//       || (m.question && m.question.toLowerCase().includes(q))
//     if (!matchText) return false
//     if (searchFilter === 'all') return true
//     if (searchFilter === 'docs') return m.type === 'document'
//     if (searchFilter === 'media') return m.type === 'image'
//     if (searchFilter === 'polls') return m.type === 'poll'
//     if (searchFilter === 'links') return m.type === 'text' && /https?:\/\/[^\s]+/.test(m.content || '')
//     return false
//   })

//   // Style tokens
//   const S = {
//     bg: '#020b14',
//     surface: '#091d33',
//     surface2: '#0f1f3a',
//     accent: '#3b82f6',
//     accent2: '#60a5fa',
//     text: '#f1f5f9',
//     muted: '#94a3b8',
//     border: 'rgba(255,255,255,0.07)',
//     danger: '#f87171',
//   }

//   return (
//     <div style={{
//       flex: 1, display: 'flex', height: 640, background: S.bg,
//       border: `1px solid ${S.border}`, borderRadius: 16, overflow: 'hidden',
//       fontFamily: 'Inter, system-ui, sans-serif', position: 'relative'
//     }}>

//       {/* Hidden file inputs */}
//       <input type="file" ref={fileDocRef} onChange={handleDocUpload} style={{ display: 'none' }} accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.csv,.ppt,.pptx" />
//       <input type="file" ref={fileImgRef} onChange={handleImgUpload} style={{ display: 'none' }} accept="image/*" />

//       <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>

//         {/* ── Header ── */}
//         <div style={{
//           padding: '14px 20px', background: S.surface,
//           display: 'flex', justifyContent: 'space-between', alignItems: 'center',
//           borderBottom: `1px solid ${S.border}`, flexShrink: 0, zIndex: 50, position: 'relative'
//         }}>
//           <div>
//             <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
//               <h2 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: S.text }}>{roomName}</h2>
//               {isPinned && <Pin size={12} style={{ color: S.accent2, transform: 'rotate(45deg)' }} />}
//             </div>
//             <p style={{ margin: '2px 0 0', fontSize: 11, color: S.muted }}>
//               {isMuted ? 'Notifications muted' : 'Online · 14 active contributors'}
//             </p>
//           </div>
//           <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
//             {/* Search icon toggle */}
//             <button
//               onClick={() => setShowSearch(s => !s)}
//               title="Search"
//               style={{ background: 'none', border: 'none', cursor: 'pointer', color: showSearch ? S.accent2 : S.muted, padding: 5, borderRadius: 6, display: 'flex', alignItems: 'center' }}
//             >
//               <Search size={18} />
//             </button>

//             {/* More menu */}
//             <div ref={menuRef} style={{ position: 'relative' }}>
//               <button
//                 onClick={() => { setShowMenu(s => !s); setShowThemeMenu(false) }}
//                 title="More options"
//                 style={{ background: 'none', border: 'none', cursor: 'pointer', color: S.muted, padding: 5, borderRadius: 6, display: 'flex', alignItems: 'center' }}
//               >
//                 <MoreVertical size={18} />
//               </button>
//               {showMenu && (
//                 <div style={{
//                   position: 'absolute', top: 34, right: 0, background: S.surface2,
//                   borderRadius: 10, width: 220, boxShadow: '0 8px 32px rgba(0,0,0,.6)',
//                   zIndex: 200, border: `1px solid ${S.border}`, overflow: 'hidden'
//                 }}>
//                   {[
//                     { icon: <Search size={14} />, label: 'Search messages', action: () => { setShowSearch(true); setShowMenu(false) } },
//                     { icon: isMuted ? <Bell size={14} /> : <BellOff size={14} />, label: isMuted ? 'Unmute notifications' : 'Mute notifications', action: () => { setIsMuted(s => !s); setShowMenu(false) } },
//                     { icon: <Pin size={14} />, label: isPinned ? 'Unpin channel' : 'Pin channel', action: () => { setIsPinned(s => !s); setShowMenu(false) } },
//                   ].map((item, i) => (
//                     <div key={i} onClick={item.action} style={{ padding: '10px 16px', fontSize: 13, color: S.text, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, transition: 'background .15s' }}
//                       onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.05)'}
//                       onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
//                     >{item.icon}{item.label}</div>
//                   ))}
//                   <div style={{ borderTop: `1px solid ${S.border}` }} />
//                   <div
//                     onClick={(e) => { e.stopPropagation(); setShowThemeMenu(s => !s) }}
//                     style={{ padding: '10px 16px', fontSize: 13, color: showThemeMenu ? S.accent2 : S.text, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, transition: 'background .15s' }}
//                     onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.05)'}
//                     onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
//                   >
//                     <Palette size={14} />
//                     <span style={{ flex: 1 }}>Change theme</span>
//                     {showThemeMenu ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
//                   </div>
//                   {showThemeMenu && (
//                     <div style={{ background: S.surface, borderTop: `1px solid ${S.border}`, maxHeight: 160, overflowY: 'auto' }}>
//                       {THEME_MANIFEST.map(t => (
//                         <div key={t.id}
//                           onClick={() => { setCurrentWallpaper(t.url); setShowMenu(false); setShowThemeMenu(false) }}
//                           style={{
//                             padding: '8px 16px 8px 32px', fontSize: 12,
//                             color: currentWallpaper === t.url ? S.accent2 : S.muted,
//                             cursor: 'pointer', fontWeight: currentWallpaper === t.url ? 600 : 400,
//                             display: 'flex', justifyContent: 'space-between', alignItems: 'center',
//                             background: currentWallpaper === t.url ? 'rgba(96,165,250,.07)' : 'transparent',
//                             transition: 'background .15s'
//                           }}
//                           onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.04)'}
//                           onMouseLeave={e => e.currentTarget.style.background = currentWallpaper === t.url ? 'rgba(96,165,250,.07)' : 'transparent'}
//                         >
//                           {t.name}
//                           {currentWallpaper === t.url && <div style={{ width: 5, height: 5, borderRadius: '50%', background: S.accent2 }} />}
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* ── Search bar ── */}
//         {showSearch && (
//           <div style={{ padding: '10px 16px 10px', background: S.surface2, borderBottom: `1px solid ${S.border}`, flexShrink: 0 }}>
//             {/* Input + Cancel row */}
//             <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
//               <div style={{
//                 flex: 1, display: 'flex', alignItems: 'center', gap: 8,
//                 background: S.bg, border: `1px solid ${S.border}`, borderRadius: 8, padding: '0 10px'
//               }}>
//                 <Search size={14} style={{ color: S.muted, flexShrink: 0 }} />
//                 <input
//                   ref={searchInputRef}
//                   value={searchQuery}
//                   onChange={e => setSearchQuery(e.target.value)}
//                   onKeyDown={e => e.key === 'Escape' && cancelSearch()}
//                   placeholder="Search messages, files, polls..."
//                   style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: S.text, fontSize: 13, padding: '9px 0' }}
//                 />
//                 {searchQuery && (
//                   <X
//                     size={14}
//                     style={{ color: S.muted, cursor: 'pointer', flexShrink: 0 }}
//                     onClick={() => setSearchQuery('')}
//                   />
//                 )}
//               </div>
//               <button
//                 onClick={cancelSearch}
//                 style={{
//                   background: 'none', border: `1px solid ${S.border}`, borderRadius: 7,
//                   color: S.muted, fontSize: 12, fontWeight: 500, padding: '7px 14px',
//                   cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0, transition: 'all .2s'
//                 }}
//                 onMouseEnter={e => { e.currentTarget.style.color = S.text; e.currentTarget.style.borderColor = 'rgba(255,255,255,.22)' }}
//                 onMouseLeave={e => { e.currentTarget.style.color = S.muted; e.currentTarget.style.borderColor = S.border }}
//               >
//                 Cancel
//               </button>
//             </div>
//             {/* Filter pills */}
//             <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
//               {[
//                 { key: 'all', label: 'All' },
//                 { key: 'docs', label: 'Docs' },
//                 { key: 'media', label: 'Media' },
//                 { key: 'polls', label: 'Polls' },
//                 { key: 'links', label: 'Links' },
//               ].map(f => (
//                 <button key={f.key} onClick={() => setSearchFilter(f.key)} style={{
//                   padding: '4px 12px', borderRadius: 20, fontSize: 11,
//                   border: `1px solid ${searchFilter === f.key ? S.accent : S.border}`,
//                   background: searchFilter === f.key ? S.accent : 'transparent',
//                   color: searchFilter === f.key ? '#fff' : S.muted,
//                   cursor: 'pointer', transition: 'all .2s'
//                 }}>{f.label}</button>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* ── Messages Container with Enhanced Scrolling & Wallpaper ── */}
//         <div
//           ref={messagesContainerRef}
//           style={{
//             flex: 1,
//             overflowY: 'auto',
//             overflowX: 'hidden',
//             padding: '20px 24px',
//             display: 'flex',
//             flexDirection: 'column',
//             gap: 6,
//             minHeight: 0,
//             // Smooth scrollbar
//             scrollBehavior: 'smooth',
//             scrollbarWidth: 'thin',
//             scrollbarColor: isScrolling ? 'rgba(96,165,250,0.6)' : 'rgba(255,255,255,0.14)',
//             // Wallpaper settings - PERFECT FIT
//             backgroundImage: currentWallpaper ? `linear-gradient(135deg, rgba(2,11,20,.7) 0%, rgba(2,11,20,.6) 100%), url('${currentWallpaper}')` : 'none',
//             backgroundSize: 'cover',
//             backgroundPosition: 'center center',
//             backgroundAttachment: 'fixed',
//             backgroundRepeat: 'no-repeat',
//             // Fix the background to viewport for better visual
//             backgroundColor: S.bg,
//             // Smooth scroll momentum
//             overscrollBehavior: 'auto',
//             WebkitOverflowScrolling: 'touch',
//             // Custom scrollbar CSS
//             msOverflowStyle: 'auto',
//           }}
//         >
//           {/* Custom scrollbar styles */}
//           <style>{`
//             div::-webkit-scrollbar {
//               width: 8px;
//             }
//             div::-webkit-scrollbar-track {
//               background: rgba(255,255,255,0.05);
//             }
//             div::-webkit-scrollbar-thumb {
//               background: rgba(255,255,255,0.14);
//               border-radius: 4px;
//               transition: background 0.2s ease;
//             }
//             div::-webkit-scrollbar-thumb:hover {
//               background: rgba(96,165,250,0.6);
//             }
//             div::-webkit-scrollbar-thumb:active {
//               background: rgba(96,165,250,0.8);
//             }
//           `}</style>

//           {/* ── No results state ── */}
//           {filteredMessages.length === 0 ? (
//             <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '40px 20px' }}>
//               <div style={{ width: 64, height: 64, borderRadius: '50%', background: S.surface2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                 <Search size={28} style={{ color: S.muted }} />
//               </div>
//               <div style={{ textAlign: 'center' }}>
//                 <p style={{ margin: 0, fontSize: 15, fontWeight: 600, color: S.text }}>No results found</p>
//                 <p style={{ margin: '6px 0 0', fontSize: 13, color: S.muted }}>
//                   {searchQuery ? `Nothing matches "${searchQuery}"` : `No ${searchFilter} messages yet`}
//                 </p>
//               </div>
//               <button
//                 onClick={cancelSearch}
//                 style={{
//                   display: 'flex', alignItems: 'center', gap: 8, padding: '9px 20px',
//                   borderRadius: 8, background: S.accent, border: 'none',
//                   color: '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer'
//                 }}
//               >
//                 <ArrowLeft size={14} /> Back to chat
//               </button>
//             </div>
//           ) : (
//             filteredMessages.map(msg => {
//               const isMe = msg.author === 'You'
//               const reactionKeys = Object.keys(msg.reactions)
//               const totalVotes = msg.type === 'poll' ? msg.options.reduce((s, o) => s + o.votes, 0) : 0
//               const isEditing = editingId === msg.id

//               return (
//                 <div
//                   key={msg.id}
//                   onMouseEnter={() => setHoveredId(msg.id)}
//                   onMouseLeave={() => setHoveredId(null)}
//                   style={{
//                     display: 'flex', justifyContent: isMe ? 'flex-end' : 'flex-start',
//                     width: '100%', position: 'relative',
//                     marginBottom: reactionKeys.length > 0 ? 14 : 4
//                   }}
//                 >
//                   {/* Quick reaction bar */}
//                   {hoveredId === msg.id && !isEditing && (
//                     <div style={{
//                       position: 'absolute', top: -32,
//                       [isMe ? 'right' : 'left']: isMe ? 12 : 40,
//                       background: S.surface2, borderRadius: 20, padding: '3px 10px',
//                       display: 'flex', gap: 6, boxShadow: '0 4px 12px rgba(0,0,0,.4)',
//                       zIndex: 50, border: `1px solid ${S.border}`
//                     }}>
//                       {['👍', '❤️', '😂', '😮', '🚀', '🙏'].map(e => (
//                         <span key={e} onClick={() => reactToMessage(msg.id, e)}
//                           style={{ cursor: 'pointer', fontSize: 15, transition: 'transform .1s' }}
//                           onMouseEnter={ev => ev.currentTarget.style.transform = 'scale(1.3)'}
//                           onMouseLeave={ev => ev.currentTarget.style.transform = 'scale(1)'}
//                         >{e}</span>
//                       ))}
//                     </div>
//                   )}

//                   <div style={{ display: 'flex', gap: 8, maxWidth: '65%', flexDirection: isMe ? 'row-reverse' : 'row' }}>
//                     {!isMe && (
//                       <div style={{
//                         width: 28, height: 28, borderRadius: '50%', background: S.accent,
//                         display: 'flex', alignItems: 'center', justifyContent: 'center',
//                         fontSize: 10, fontWeight: 700, color: '#fff', flexShrink: 0, marginTop: 2
//                       }}>{msg.avatar}</div>
//                     )}

//                     <div style={{ position: 'relative' }}>
//                       {/* Pin badge */}
//                       {msg.isPinned && (
//                         <div style={{
//                           position: 'absolute', top: -17, [isMe ? 'right' : 'left']: 0,
//                           display: 'flex', alignItems: 'center', gap: 3,
//                           background: S.surface, border: `1px solid ${S.border}`,
//                           padding: '2px 7px', borderRadius: 5, fontSize: 9, color: S.accent2, whiteSpace: 'nowrap'
//                         }}>
//                           <Pin size={8} style={{ transform: 'rotate(45deg)' }} /> Pinned
//                         </div>
//                       )}

//                       {/* Message bubble */}
//                       <div
//                         onClick={() => isMe && !isEditing && setActiveActionId(activeActionId === msg.id ? null : msg.id)}
//                         style={{
//                           background: isMe ? 'rgba(29,78,216,.92)' : 'rgba(15,30,50,.96)',
//                           backdropFilter: currentWallpaper ? 'blur(4px)' : 'none',
//                           padding: '9px 12px 20px',
//                           borderRadius: isMe ? '10px 2px 10px 10px' : '2px 10px 10px 10px',
//                           color: S.text, boxShadow: '0 1px 4px rgba(0,0,0,.3)',
//                           border: `1px solid ${isMe ? 'rgba(96,165,250,.15)' : S.border}`,
//                           cursor: isMe && !isEditing ? 'pointer' : 'default', position: 'relative'
//                         }}
//                       >
//                         {!isMe && <div style={{ fontSize: 11, fontWeight: 600, color: S.accent2, marginBottom: 3 }}>{msg.author}</div>}

//                         {/* TEXT */}
//                         {msg.type === 'text' && (
//                           isEditing ? (
//                             <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 220 }}>
//                               <input
//                                 value={editValue}
//                                 onChange={e => setEditValue(e.target.value)}
//                                 onKeyDown={e => { if (e.key === 'Enter') saveEdit(msg.id); if (e.key === 'Escape') cancelEdit() }}
//                                 autoFocus
//                                 style={{ background: S.bg, border: `1px solid ${S.accent2}`, borderRadius: 6, padding: '6px 10px', color: S.text, fontSize: 13, outline: 'none', fontFamily: 'inherit' }}
//                               />
//                               <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
//                                 <span onClick={cancelEdit} style={{ fontSize: 11, color: S.danger, cursor: 'pointer' }}>Cancel</span>
//                                 <span onClick={() => saveEdit(msg.id)} style={{ fontSize: 11, color: S.accent2, cursor: 'pointer', fontWeight: 600 }}>Save</span>
//                               </div>
//                             </div>
//                           ) : (
//                             <p
//                               style={{ margin: 0, fontSize: 13.5, lineHeight: 1.5, wordBreak: 'break-word', paddingRight: 44 }}
//                               dangerouslySetInnerHTML={{ __html: (msg.content || '').replace(/https?:\/\/[^\s]+/g, u => `<a href="${u}" style="color:${S.accent2}" target="_blank" rel="noopener">${u}</a>`) }}
//                             />
//                           )
//                         )}

//                         {/* IMAGE */}
//                         {msg.type === 'image' && (
//                           <div>
//                             <img src={msg.content} alt={msg.fileName} style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 8, display: 'block', cursor: 'pointer' }} onClick={() => downloadFile(msg.fileName, msg.fileData)} />
//                             <div onClick={() => downloadFile(msg.fileName, msg.fileData)} style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 6, fontSize: 11, color: S.accent2, cursor: 'pointer' }}>
//                               <Download size={12} /> {msg.fileName}
//                             </div>
//                           </div>
//                         )}

//                         {/* DOCUMENT */}
//                         {msg.type === 'document' && (
//                           <div
//                             onClick={() => downloadFile(msg.fileName, msg.fileData)}
//                             style={{
//                               display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(0,0,0,.2)',
//                               padding: 10, borderRadius: 8, border: `1px solid ${S.border}`,
//                               minWidth: 210, cursor: 'pointer', marginBottom: 4, transition: 'background .2s'
//                             }}
//                             onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.05)'}
//                             onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,.2)'}
//                           >
//                             <FileText size={24} style={{ color: S.muted, flexShrink: 0 }} />
//                             <div style={{ flex: 1, minWidth: 0 }}>
//                               <div style={{ fontSize: 12.5, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{msg.fileName}</div>
//                               <div style={{ fontSize: 10.5, color: S.muted }}>{msg.fileSize}</div>
//                             </div>
//                             <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: S.accent2, padding: '3px 8px', border: `1px solid rgba(96,165,250,.3)`, borderRadius: 5, flexShrink: 0 }}>
//                               <Download size={11} /> Download
//                             </div>
//                           </div>
//                         )}

//                         {/* POLL */}
//                         {msg.type === 'poll' && (
//                           <div style={{ minWidth: 250 }}>
//                             <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13.5, fontWeight: 600, marginBottom: 10, color: S.accent2 }}>
//                               <BarChart2 size={15} /> {msg.question}
//                             </div>
//                             {msg.options.map(opt => {
//                               const voted = opt.votedUsers.includes('You')
//                               const pct = totalVotes === 0 ? 0 : Math.round((opt.votes / totalVotes) * 100)
//                               return (
//                                 <div key={opt.id}
//                                   onClick={e => { e.stopPropagation(); castVote(msg.id, opt.id) }}
//                                   style={{
//                                     background: 'rgba(255,255,255,.02)',
//                                     border: `1px solid ${voted ? S.accent2 : S.border}`,
//                                     borderRadius: 6, padding: '8px 12px', fontSize: 12.5,
//                                     cursor: 'pointer', position: 'relative', overflow: 'hidden',
//                                     display: 'flex', justifyContent: 'space-between', alignItems: 'center',
//                                     marginBottom: 5, transition: 'border-color .2s'
//                                   }}
//                                 >
//                                   <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: `${pct}%`, background: 'rgba(59,130,246,.1)', transition: 'width .3s', zIndex: 1 }} />
//                                   <span style={{ zIndex: 2, fontWeight: voted ? 600 : 400, display: 'flex', alignItems: 'center', gap: 6 }}>
//                                     {voted && <CheckCircle size={13} style={{ color: S.accent2 }} />} {opt.text}
//                                   </span>
//                                   <span style={{ zIndex: 2, fontSize: 11, color: S.muted }}>{opt.votes} ({pct}%)</span>
//                                 </div>
//                               )
//                             })}
//                             <div style={{ fontSize: 10, color: S.muted, textAlign: 'right', marginTop: 4 }}>Total votes: {totalVotes}</div>
//                           </div>
//                         )}

//                         <div style={{ position: 'absolute', bottom: 4, right: 8, fontSize: 9.5, color: S.muted }}>{msg.time}</div>
//                       </div>

//                       {/* Action popover (own messages only) */}
//                       {activeActionId === msg.id && (
//                         <div ref={actionRef} style={{
//                           position: 'absolute', bottom: 'calc(100% + 6px)', right: 0,
//                           background: S.surface2, borderRadius: 8, width: 150,
//                           boxShadow: '0 4px 20px rgba(0,0,0,.5)', zIndex: 200,
//                           border: `1px solid ${S.border}`, overflow: 'hidden'
//                         }}>
//                           {msg.type === 'text' && !isEditing && (
//                             <div onClick={e => { e.stopPropagation(); startEdit(msg.id, msg.content) }}
//                               style={{ padding: '9px 12px', fontSize: 12.5, color: S.text, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, transition: 'background .15s' }}
//                               onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.05)'}
//                               onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
//                             ><Edit3 size={13} style={{ color: S.accent2 }} /> Edit</div>
//                           )}
//                           <div onClick={e => { e.stopPropagation(); pinMessage(msg.id) }}
//                             style={{ padding: '9px 12px', fontSize: 12.5, color: S.text, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, transition: 'background .15s' }}
//                             onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.05)'}
//                             onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
//                           ><Pin size={13} style={{ color: '#eab308', transform: 'rotate(45deg)' }} /> {msg.isPinned ? 'Unpin' : 'Pin'}</div>
//                           <div onClick={e => { e.stopPropagation(); deleteMessage(msg.id) }}
//                             style={{ padding: '9px 12px', fontSize: 12.5, color: S.danger, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, transition: 'background .15s' }}
//                             onMouseEnter={e => e.currentTarget.style.background = 'rgba(248,113,113,.1)'}
//                             onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
//                           ><Trash2 size={13} /> Delete</div>
//                         </div>
//                       )}

//                       {/* Reactions */}
//                       {reactionKeys.length > 0 && (
//                         <div style={{
//                           position: 'absolute', bottom: -12, [isMe ? 'left' : 'right']: 8,
//                           background: '#0e1e30', border: `1px solid ${S.border}`, borderRadius: 10,
//                           padding: '2px 8px', display: 'flex', alignItems: 'center', gap: 3,
//                           fontSize: 12, boxShadow: '0 2px 6px rgba(0,0,0,.3)', zIndex: 10
//                         }}>
//                           {reactionKeys.map((r, i) => <span key={i}>{r}</span>)}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               )
//             })
//           )}
//           <div ref={messagesEndRef} />
//         </div>

//         {/* ── Input area ── */}
//         <div style={{
//           padding: '10px 16px', background: S.surface, display: 'flex', alignItems: 'center',
//           gap: 10, borderTop: `1px solid ${S.border}`, flexShrink: 0, position: 'relative', zIndex: 60
//         }}>
//           <div ref={attachRef} style={{ display: 'flex', gap: 6, position: 'relative' }}>
//             {/* Emoji button */}
//             <button onClick={() => { setShowEmojiPicker(s => !s); setShowAttachMenu(false) }}
//               title="Emoji"
//               style={{ background: 'none', border: 'none', cursor: 'pointer', color: showEmojiPicker ? S.accent2 : S.muted, padding: 4, borderRadius: 6, display: 'flex', alignItems: 'center' }}
//             >
//               <Smile size={20} />
//             </button>
//             {showEmojiPicker && (
//               <div style={{
//                 position: 'absolute', bottom: 44, left: -8, background: S.surface2,
//                 border: `1px solid ${S.border}`, borderRadius: 12, padding: 10, width: 286,
//                 maxHeight: 210, overflowY: 'auto', display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)',
//                 gap: 4, boxShadow: '0 -4px 24px rgba(0,0,0,.6)', zIndex: 999
//               }}>
//                 {EMOJI_LIST.map((em, i) => (
//                   <span key={i} onClick={() => setInputValue(v => v + em)}
//                     style={{ cursor: 'pointer', fontSize: 18, textAlign: 'center', lineHeight: 1, padding: 3, borderRadius: 4, transition: 'background .1s' }}
//                     onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.08)'}
//                     onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
//                   >{em}</span>
//                 ))}
//               </div>
//             )}

//             {/* Attach button */}
//             <button onClick={() => { setShowAttachMenu(s => !s); setShowEmojiPicker(false) }}
//               title="Attach"
//               style={{ background: 'none', border: 'none', cursor: 'pointer', color: showAttachMenu ? S.accent2 : S.muted, padding: 4, borderRadius: 6, display: 'flex', alignItems: 'center', transform: 'rotate(45deg)' }}
//             >
//               <Paperclip size={20} />
//             </button>
//             {showAttachMenu && (
//               <div style={{
//                 position: 'absolute', bottom: 44, left: 20, background: S.surface2, borderRadius: 10,
//                 width: 195, boxShadow: '0 -4px 20px rgba(0,0,0,.5)', border: `1px solid ${S.border}`,
//                 overflow: 'hidden', zIndex: 999
//               }}>
//                 {[
//                   { icon: <FileText size={15} style={{ color: S.muted }} />, label: 'Local document', action: () => fileDocRef.current?.click() },
//                   { icon: <ImageIcon size={15} style={{ color: S.accent2 }} />, label: 'Upload picture', action: () => fileImgRef.current?.click() },
//                   { icon: <Camera size={15} style={{ color: '#ec407a' }} />, label: 'Device camera', action: startCamera },
//                   { icon: <BarChart2 size={15} style={{ color: '#eab308' }} />, label: 'Deploy live poll', action: () => { setShowPollModal(true); setShowAttachMenu(false) } },
//                 ].map((item, i) => (
//                   <div key={i} onClick={item.action}
//                     style={{ padding: '10px 14px', fontSize: 13, color: S.text, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, transition: 'background .15s' }}
//                     onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.05)'}
//                     onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
//                   >{item.icon}{item.label}</div>
//                 ))}
//               </div>
//             )}
//           </div>

//           <input
//             value={inputValue}
//             onChange={e => setInputValue(e.target.value)}
//             onKeyDown={e => e.key === 'Enter' && sendMessage()}
//             placeholder="Type a message..."
//             style={{
//               flex: 1, background: S.bg, border: `1px solid ${S.border}`, padding: '9px 14px',
//               borderRadius: 8, color: S.text, fontSize: 13.5, outline: 'none', fontFamily: 'inherit', transition: 'border-color .2s'
//             }}
//             onFocus={e => e.target.style.borderColor = 'rgba(96,165,250,.4)'}
//             onBlur={e => e.target.style.borderColor = S.border}
//           />

//           <button onClick={() => sendMessage()} disabled={!inputValue.trim()} style={{
//             width: 36, height: 36, borderRadius: '50%',
//             background: inputValue.trim() ? S.accent : 'rgba(255,255,255,.04)',
//             border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
//             cursor: inputValue.trim() ? 'pointer' : 'default', transition: 'background .2s', flexShrink: 0
//           }}>
//             <Send size={14} style={{ color: inputValue.trim() ? '#fff' : S.muted, marginLeft: 1 }} />
//           </button>
//         </div>
//       </div>

//       {/* ── Poll modal ── */}
//       {showPollModal && (
//         <div onClick={() => setShowPollModal(false)} style={{
//           position: 'absolute', inset: 0, background: 'rgba(0,0,0,.7)',
//           display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 500
//         }}>
//           <div onClick={e => e.stopPropagation()} style={{
//             background: S.surface2, borderRadius: 14, padding: 24, width: 360,
//             border: `1px solid ${S.border}`, boxShadow: '0 8px 40px rgba(0,0,0,.6)'
//           }}>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
//               <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: S.text, display: 'flex', alignItems: 'center', gap: 8 }}>
//                 <BarChart2 size={16} style={{ color: '#eab308' }} /> Create a poll
//               </h3>
//               <button onClick={() => setShowPollModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: S.muted, padding: 2 }}><X size={18} /></button>
//             </div>
//             <input value={pollQuestion} onChange={e => setPollQuestion(e.target.value)} placeholder="Ask a question..."
//               style={{ width: '100%', background: S.bg, border: `1px solid ${S.border}`, borderRadius: 8, padding: '9px 12px', color: S.text, fontSize: 13, outline: 'none', fontFamily: 'inherit', marginBottom: 10, boxSizing: 'border-box' }}
//               onFocus={e => e.target.style.borderColor = 'rgba(96,165,250,.4)'}
//               onBlur={e => e.target.style.borderColor = S.border}
//             />
//             {pollOptions.map((opt, i) => (
//               <div key={i} style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
//                 <input value={opt} onChange={e => { const o = [...pollOptions]; o[i] = e.target.value; setPollOptions(o) }} placeholder={`Option ${i + 1}`}
//                   style={{ flex: 1, background: S.bg, border: `1px solid ${S.border}`, borderRadius: 8, padding: '8px 12px', color: S.text, fontSize: 13, outline: 'none', fontFamily: 'inherit' }}
//                   onFocus={e => e.target.style.borderColor = 'rgba(96,165,250,.4)'}
//                   onBlur={e => e.target.style.borderColor = S.border}
//                 />
//                 {pollOptions.length > 2 && (
//                   <button onClick={() => setPollOptions(o => o.filter((_, j) => j !== i))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: S.danger, padding: '0 4px', display: 'flex', alignItems: 'center' }}><X size={15} /></button>
//                 )}
//               </div>
//             ))}
//             {pollOptions.length < 6 && (
//               <button onClick={() => setPollOptions(o => [...o, ''])}
//                 style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px', borderRadius: 6, background: 'transparent', border: `1px solid ${S.border}`, color: S.muted, fontSize: 12, cursor: 'pointer', marginTop: 4 }}>
//                 + Add option
//               </button>
//             )}
//             <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16 }}>
//               <button onClick={() => setShowPollModal(false)} style={{ padding: '8px 18px', borderRadius: 8, background: 'transparent', border: `1px solid ${S.border}`, color: S.muted, fontSize: 13, cursor: 'pointer' }}>Cancel</button>
//               <button onClick={submitPoll} style={{ padding: '8px 18px', borderRadius: 8, background: S.accent, border: 'none', color: '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>Launch poll</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ── Camera modal ── */}
//       {showCamModal && (
//         <div style={{
//           position: 'absolute', inset: 0, background: 'rgba(0,0,0,.75)',
//           display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 500
//         }}>
//           <div style={{
//             background: S.surface2, borderRadius: 14, padding: 24, width: 380,
//             border: `1px solid ${S.border}`, boxShadow: '0 8px 40px rgba(0,0,0,.6)'
//           }}>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
//               <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: S.text, display: 'flex', alignItems: 'center', gap: 8 }}>
//                 <Camera size={16} style={{ color: '#ec407a' }} /> Device camera
//               </h3>
//               <button onClick={stopCamera} style={{ background: 'none', border: 'none', cursor: 'pointer', color: S.muted, padding: 2 }}><X size={18} /></button>
//             </div>
//             {camError ? (
//               <div style={{ padding: '24px 16px', textAlign: 'center', color: S.danger, fontSize: 13 }}>
//                 <Camera size={32} style={{ color: S.muted, marginBottom: 10, display: 'block', margin: '0 auto 10px' }} />
//                 Camera unavailable: {camError}
//               </div>
//             ) : (
//               <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', borderRadius: 10, background: '#000', display: 'block', maxHeight: 240 }} />
//             )}
//             <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 14 }}>
//               <button onClick={stopCamera} style={{ padding: '8px 18px', borderRadius: 8, background: 'transparent', border: `1px solid ${S.border}`, color: S.muted, fontSize: 13, cursor: 'pointer' }}>Cancel</button>
//               {!camError && (
//                 <button onClick={capturePhoto} style={{ padding: '8px 18px', borderRadius: 8, background: '#ec407a', border: 'none', color: '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
//                   <Camera size={14} /> Capture
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }



















































