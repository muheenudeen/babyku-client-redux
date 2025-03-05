// "use client"

// import { useState, useEffect, useRef } from "react"

// const VideoGallery = () => {
//   const [activeVideoIndex, setActiveVideoIndex] = useState(0)
//   const videoRefs = useRef([])

//   const videoSections = [
//     {
//       id: 1,
//       videoId: "f8zVcmTmxWM",
//     },
//     {
//       id: 2,
//       videoId: "34CDOKOXczc",
//     },
//     {
//       id: 3,
//       videoId: "j3GWrfWMZjk",
//     },
//     {
//       id: 4,
//       videoId: "1GoqXu9Q9fA",
//     },
//   ]

//   useEffect(() => {
//     const options = {
//       root: null,
//       rootMargin: "0px",
//       threshold: 0.5,
//     }

//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach((entry) => {
//         const index = Number.parseInt(entry.target.dataset.index)
//         if (entry.isIntersecting) {
//           setActiveVideoIndex(index)
//         }
//       })
//     }, options)

//     videoRefs.current.forEach((ref) => {
//       if (ref) observer.observe(ref)
//     })

//     return () => {
//       videoRefs.current.forEach((ref) => {
//         if (ref) observer.unobserve(ref)
//       })
//     }
//   }, [])

//   return (
//     <div className="bg-white min-h-screen">
//       {/* Header */}
//       <div className="bg-orange-100 py-3 text-center text-sm">
//         <p>7 days return policy | T&C Applied*</p>
//       </div>

//       {/* Main Title */}
//       <div className="text-center my-8">
//         <h1 className="text-2xl font-bold">SHOP BY REELS</h1>
//         <div className="w-32 h-1 bg-orange-500 mx-auto mt-2"></div>
//       </div>

//       {/* Video Grid */}
//       <div className="container mx-auto px-4 mb-10">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
//           {videoSections.map((section, index) => (
//             <div
//               key={section.id}
//               className="relative rounded-lg overflow-hidden shadow-md"
//               ref={(el) => (videoRefs.current[index] = el)}
//               data-index={index}
//             >
//               <div className="aspect-w-16 aspect-h-9">
//                 <iframe
//                   src={`https://www.youtube.com/embed/${section.videoId}?autoplay=${activeVideoIndex === index ? 1 : 0}&mute=1&loop=1&playlist=${section.videoId}&rel=0`}
//                   title={`Video ${section.id}`}
//                   className="w-full h-full"
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                   allowFullScreen
//                 ></iframe>
//               </div>

//               {/* Optional overlay text */}
//               {section.overlayText && (
//                 <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-3 text-center">
//                   <p className="font-bold">{section.overlayText}</p>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default VideoGallery