


'use client'

import React, { useState, useEffect, useRef } from 'react'
import { 
  Phone, 
  Video, 
  Mic, 
  MicOff, 
  VideoOff, 
  X, 
  Users, 
  Radio, 
  Volume2,
  PhoneCall,
  User,
  Hand
} from 'lucide-react'

const initialContributors = [
  { id: 'usr-1', name: 'Alex (Dev)', avatar: 'A', status: 'idle', isMuted: false, isHandRaised: false, streamUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-working-on-a-laptop-in-a-bright-office-42282-large.mp4' },
  { id: 'usr-2', name: 'Sarah (Design)', avatar: 'S', status: 'idle', isMuted: true, isHandRaised: false, streamUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-filming-herself-with-a-smartphone-43187-large.mp4' },
  { id: 'usr-3', name: 'David (AI Lead)', avatar: 'D', status: 'idle', isMuted: false, isHandRaised: false, streamUrl: '' }
];

export default function LiveSession() {
  const [isCallActive, setIsCallActive] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isLocalHandRaised, setIsLocalHandRaised] = useState(false)
  const [permissionError, setPermissionError] = useState(null)
  const [callType, setCallType] = useState(null) // 'audio' | 'video'

  const [peers, setPeers] = useState(initialContributors)
  const [isRingingContributors, setIsRingingContributors] = useState(false)

  const localVideoRef = useRef(null)
  const streamRef = useRef(null)
  const signalingTimeoutRef = useRef(null)
  const handRaiseTimeoutRef = useRef(null)

  // Ensure video element rebinds correctly when video is toggled back ON
  useEffect(() => {
    if (isCallActive && isVideoOn && callType === 'video' && localVideoRef.current && streamRef.current) {
      localVideoRef.current.srcObject = streamRef.current
    }
  }, [isVideoOn, isCallActive, callType])

  const broadcastCallSignal = (type) => {
    setIsRingingContributors(true)
    setPeers(prev => prev.map(p => ({ ...p, status: 'ringing' })))

    signalingTimeoutRef.current = setTimeout(() => {
      setPeers(prev => prev.map((p, index) => ({
        ...p,
        status: index === 2 ? 'declined' : 'connected'
      })))
      setIsRingingContributors(false)

      // Mock an incoming peer hand-raise payload 3 seconds after connection
      handRaiseTimeoutRef.current = setTimeout(() => {
        setPeers(prev => prev.map(p => p.id === 'usr-1' ? { ...p, isHandRaised: true } : p))
      }, 3000)

    }, 2500)
  }

  const startMediaStream = async (startWithVideo = true) => {
    try {
      setPermissionError(null)
      setIsVideoOn(startWithVideo)
      setCallType(startWithVideo ? 'video' : 'audio')

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: startWithVideo,
        audio: true
      })

      streamRef.current = mediaStream
      setIsCallActive(true)
      broadcastCallSignal(startWithVideo ? 'video' : 'audio')

    } catch (err) {
      console.error('Hardware access request failed:', err)
      setPermissionError('Camera or microphone access denied or busy.')
      setIsCallActive(false)
    }
  }

  const stopMediaStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    if (signalingTimeoutRef.current) clearTimeout(signalingTimeoutRef.current)
    if (handRaiseTimeoutRef.current) clearTimeout(handRaiseTimeoutRef.current)
    
    setIsCallActive(false)
    setIsRingingContributors(false)
    setIsLocalHandRaised(false)
    setPeers(initialContributors)
    setCallType(null)
  }

  const toggleAudio = () => {
    if (streamRef.current) {
      const audioTracks = streamRef.current.getAudioTracks()
      if (audioTracks.length > 0) {
        audioTracks[0].enabled = isMuted 
        setIsMuted(!isMuted)
      }
    }
  }

  const toggleVideo = () => {
    if (callType === 'audio') return

    if (streamRef.current) {
      const videoTracks = streamRef.current.getVideoTracks()
      
      if (videoTracks.length > 0) {
        const nextVideoState = !isVideoOn
        videoTracks[0].enabled = nextVideoState
        setIsVideoOn(nextVideoState)
      } else if (!isVideoOn) {
        startMediaStream(true)
      }
    }
  }

  const toggleLocalHandRaise = () => {
    setIsLocalHandRaised(!isLocalHandRaised)
  }

  // Remote Node Modification Utility (Host Privileges)
  const togglePeerMute = (peerId) => {
    setPeers(prev => prev.map(p => {
      if (p.id === peerId) {
        return { ...p, isMuted: !p.isMuted }
      }
      return p
    }))
  }

  const lowerPeerHand = (peerId) => {
    setPeers(prev => prev.map(p => p.id === peerId ? { ...p, isHandRaised: false } : p))
  }

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
      if (signalingTimeoutRef.current) clearTimeout(signalingTimeoutRef.current)
      if (handRaiseTimeoutRef.current) clearTimeout(handRaiseTimeoutRef.current)
    }
  }, [])

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-2xl backdrop-blur-md text-white select-none">
      
      {/* HEADER SECTION */}
      <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Radio size={16} className={isCallActive ? "text-emerald-400 animate-pulse" : "text-slate-500"} />
          <h3 className="text-xs font-bold tracking-wider text-slate-400 uppercase">Live Studio Session</h3>
        </div>
        {isCallActive && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-400 font-bold tracking-wider animate-pulse">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
            LIVE
          </div>
        )}
      </div>

      {permissionError && (
        <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg text-rose-400 text-xs mb-4 flex items-center gap-2">
          <span className="font-bold">Hardware Fault:</span> {permissionError}
        </div>
      )}

      {/* PRE-CALL TRAY */}
      {!isCallActive ? (
        <div className="space-y-3">
          <div className="bg-slate-950/40 border border-slate-800/40 p-5 rounded-xl text-center">
            <p className="text-xs text-slate-400 leading-relaxed max-w-md mx-auto">
              Ready to initialize studio sync? Initiating a channel request rings all workspace contributors tracked inside this active team room.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              onClick={() => startMediaStream(false)}
              className="flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600/15 border border-emerald-500/20 text-emerald-400 rounded-xl font-semibold text-xs tracking-wide uppercase transition-all duration-150 hover:bg-emerald-600/25 hover:border-emerald-500/40 active:scale-[0.99]"
            >
              <Phone size={14} /> Ring Audio Session
            </button>
            
            <button
              onClick={() => startMediaStream(true)}
              className="flex items-center justify-center gap-2 py-3 px-4 bg-blue-600/15 border border-blue-500/20 text-blue-400 rounded-xl font-semibold text-xs tracking-wide uppercase transition-all duration-150 hover:bg-blue-600/25 hover:border-blue-500/40 active:scale-[0.99]"
            >
              <Video size={14} /> Ring Video Session
            </button>
          </div>
        </div>
      ) : (
        
        // ACTIVE CALL LAYOUT
        <div className="space-y-4 animate-in fade-in duration-300">
          
          {isRingingContributors && (
            <div className="bg-blue-600/10 border border-blue-500/20 rounded-xl p-3 flex items-center justify-between text-xs text-blue-300 animate-pulse">
              <div className="flex items-center gap-2">
                <PhoneCall size={14} className="animate-bounce text-blue-400" />
                <span>Broadcasting multi-peer signaling payloads... Connecting devices.</span>
              </div>
              <span className="text-[10px] uppercase opacity-50 tracking-widest font-mono">Signaling</span>
            </div>
          )}

          <div className="flex items-center justify-between px-1 text-slate-400 text-[10px] font-bold uppercase tracking-wider max-w-4xl mx-auto">
            <div className="flex items-center gap-1.5">
              <Users size={12} className="text-slate-500" />
              <span>Active Studio Viewports</span>
            </div>
            <span className="font-mono text-slate-500">Channel ID: MB-CORE-TR01</span>
          </div>

          {/* DOWNWARD HIGH-SCALE VIEWPORT MATRIX */}
          <div className="flex flex-col gap-5">
            
            {/* VIEWPORT 1: Host User Track */}
            <div className={`w-full max-w-4xl mx-auto flex flex-col rounded-xl overflow-hidden bg-slate-950 border transition-colors duration-300 ${
              isLocalHandRaised ? 'border-amber-500/50 shadow-amber-950/20 shadow-2xl' : 'border-slate-800'
            }`}>
              <div className="w-full aspect-video bg-slate-900 border-b border-slate-950 flex items-center justify-center relative overflow-hidden">
                {isVideoOn && callType === 'video' ? (
                  <video
                    ref={localVideoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover scale-x-[-1]"
                  />
                ) : (
                  <div className="text-center p-5 space-y-2">
                    <div className="w-14 h-14 rounded-full bg-slate-900 border border-slate-800 text-slate-500 flex items-center justify-center font-bold text-xl mx-auto shadow">
                      <VideoOff size={20} />
                    </div>
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Camera Terminated</p>
                  </div>
                )}
                
                <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
                  {isLocalHandRaised && (
                    <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/30 font-bold uppercase tracking-wider flex items-center gap-1 animate-in zoom-in-95 duration-150">
                      <Hand size={11} className="fill-amber-400/20 text-amber-400" /> Hand Raised
                    </span>
                  )}
                  <span className="text-[10px] text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded border border-blue-500/20 font-bold uppercase tracking-wider">
                    Host
                  </span>
                </div>

                {isMuted && (
                  <div className="absolute bottom-3 right-3 bg-rose-500/20 border border-rose-500/30 text-rose-400 text-[10px] px-2 py-1 rounded backdrop-blur-sm font-semibold tracking-wider uppercase">
                    Muted
                  </div>
                )}
              </div>

              <div className="p-3 bg-slate-950 flex items-center justify-between border-t border-slate-900">
                <div className="flex items-center gap-2">
                  <User size={13} className="text-blue-500" />
                  <span className="font-bold text-sm text-slate-200">You (Host Node)</span>
                </div>
                <span className="text-[10px] font-mono text-slate-600">Local Stream</span>
              </div>
            </div>

            {/* VIEWPORTS 2-4: Contributors Sync Tracks */}
            {peers.map((peer) => {
              const isConnectedVideo = callType === 'video' && peer.status === 'connected';
              
              return (
                <div 
                  key={peer.id} 
                  className={`w-full max-w-4xl mx-auto flex flex-col rounded-xl overflow-hidden bg-slate-950 border transition-all duration-200 ${
                    peer.isHandRaised ? 'border-amber-500/60 shadow-amber-950/30 shadow-xl' :
                    peer.status === 'connected' ? 'border-slate-800 shadow-xl' : 'border-slate-900/50 opacity-40'
                  }`}
                >
                  <div className="w-full aspect-video bg-slate-900 border-b border-slate-950 flex items-center justify-center relative overflow-hidden">
                    {isConnectedVideo && peer.streamUrl ? (
                      <video
                        src={peer.streamUrl}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center p-5 space-y-2">
                        <div className={`w-14 h-14 rounded-full bg-slate-950 border text-slate-400 flex items-center justify-center font-bold text-base mx-auto shadow ${
                          peer.status === 'connected' && !peer.isMuted ? 'border-emerald-500/30 text-emerald-400' : 'border-slate-800'
                        }`}>
                          {peer.avatar}
                        </div>
                        {peer.status === 'connected' && (
                          <p className="text-xs text-slate-500 font-medium">
                            {peer.streamUrl ? 'Video Stream Disabled' : 'Voice Node Only'}
                          </p>
                        )}
                      </div>
                    )}

                    <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
                      {peer.isHandRaised && (
                        <button 
                          onClick={() => lowerPeerHand(peer.id)}
                          className="text-[10px] text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 px-2 py-1 rounded border border-amber-500/30 font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer group"
                          title="Click to lower user's hand"
                        >
                          <Hand size={11} className="fill-amber-400/20 text-amber-400 group-hover:scale-90 transition-transform" /> 
                          <span>Hand Raised</span>
                        </button>
                      )}
                      {peer.status === 'ringing' && (
                        <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20 animate-pulse font-bold tracking-wider uppercase">Ringing</span>
                      )}
                      {peer.status === 'connected' && (
                        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20 font-bold flex items-center gap-1.5 uppercase tracking-wider">
                          <Volume2 size={12} className={!peer.isMuted ? "animate-pulse" : ""} /> Live
                        </span>
                      )}
                      {peer.status === 'declined' && (
                        <span className="text-[10px] text-slate-400 bg-slate-800/40 px-2.5 py-1 rounded border border-slate-800/50 font-bold uppercase">Absent</span>
                      )}
                      {peer.status === 'idle' && (
                        <span className="text-[10px] text-slate-600 font-bold uppercase">Offline</span>
                      )}
                    </div>

                    {peer.status === 'connected' && peer.isMuted && (
                      <div className="absolute bottom-3 right-3 bg-rose-500/20 border border-rose-500/30 text-rose-400 text-[10px] px-2 py-1 rounded backdrop-blur-sm font-semibold tracking-wider uppercase">
                        Muted
                      </div>
                    )}
                  </div>

                  <div className="p-2.5 bg-slate-950 flex items-center justify-between border-t border-slate-900">
                    <div className="flex items-center gap-2">
                      <User size={13} className="text-slate-500" />
                      <span className="font-bold text-sm text-slate-300">{peer.name}</span>
                    </div>
                    
                    {/* Host Authority Actions Block */}
                    {peer.status === 'connected' && (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => togglePeerMute(peer.id)}
                          className={`text-[10px] font-semibold uppercase px-2 py-1 rounded border transition-all duration-100 ${
                            peer.isMuted 
                              ? 'bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-500/20' 
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                          }`}
                        >
                          {peer.isMuted ? 'Unmute Node' : 'Mute Peer'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* COMPACT UTILITY HARDWARE DECK */}
          <div className="w-full flex justify-center pt-2 mt-1">
            <div className="flex items-center gap-1 bg-slate-950/90 border border-slate-800 rounded-lg p-1 shadow-xl backdrop-blur-sm w-max">
              
              {/* Mute Action Element */}
              <button
                onClick={toggleAudio}
                className={`flex items-center gap-1 py-1 px-2 rounded md:px-2.5 text-[10px] font-medium tracking-tight transition-all duration-100 border outline-none active:scale-[0.97] ${
                  isMuted 
                    ? 'bg-rose-500/10 border-rose-500/20 text-rose-400 hover:bg-rose-500/20' 
                    : 'bg-slate-900 border-slate-800/60 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {isMuted ? <MicOff size={11} className="text-rose-400" /> : <Mic size={11} className="text-emerald-400" />}
                <span>{isMuted ? 'Unmute' : 'Mute'}</span>
              </button>

              {/* Cam Action Element */}
              <button
                onClick={toggleVideo}
                className={`flex items-center gap-1 py-1 px-2 rounded md:px-2.5 text-[10px] font-medium tracking-tight transition-all duration-100 border outline-none active:scale-[0.97] ${
                  !isVideoOn || callType === 'audio'
                    ? 'bg-rose-500/10 border-rose-500/20 text-rose-400 hover:bg-rose-500/20 disabled:opacity-30' 
                    : 'bg-slate-900 border-slate-800/60 text-slate-300 hover:bg-slate-800'
                }`}
                disabled={callType === 'audio'}
              >
                {isVideoOn && callType === 'video' ? <Video size={11} className="text-blue-400" /> : <VideoOff size={11} className="text-rose-400" />}
                <span>{isVideoOn && callType === 'video' ? 'Cam On' : 'Cam Off'}</span>
              </button>

              {/* Raise Hand Utility Option */}
              <button
                onClick={toggleLocalHandRaise}
                className={`flex items-center gap-1 py-1 px-2 rounded md:px-2.5 text-[10px] font-medium tracking-tight transition-all duration-100 border outline-none active:scale-[0.97] ${
                  isLocalHandRaised 
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20' 
                    : 'bg-slate-900 border-slate-800/60 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Hand size={11} className={isLocalHandRaised ? 'fill-amber-400/20 text-amber-400' : 'text-slate-400'} />
                <span>{isLocalHandRaised ? 'Lower' : 'Hand'}</span>
              </button>

              {/* Minimal Divider */}
              <div className="w-[1px] h-3 bg-slate-800 mx-0.5" />

              {/* End Call Action Element */}
              <button
                onClick={stopMediaStream}
                className="flex items-center gap-1 py-1 px-2.5 bg-rose-600 hover:bg-rose-500 border border-rose-500/30 text-white rounded text-[10px] font-semibold tracking-tight transition-all duration-100 active:scale-[0.97] outline-none"
              >
                <X size={11} strokeWidth={2.5} />
                <span>End</span>
              </button>

            </div>
          </div>

        </div>
      )}
    </div>
  )
}