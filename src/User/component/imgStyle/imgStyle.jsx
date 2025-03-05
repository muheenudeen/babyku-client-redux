const ImageGallery = () => {
    const giftSections = [
      {
        id: 1,
        image:
          "https://cdn.shopify.com/s/files/1/0581/5064/9942/files/Gifting-Section-All-Banner-570x630.jpg?v=1727171689",
        fullWidth: true,
      },
      {
        id: 2,
        image:
          "https://cdn.shopify.com/s/files/1/0581/5064/9942/files/Gifting-Section-Gift-Sets-Banner-570x630.jpg?v=1727171689",
      },
      {
        id: 3,
        image:
          "https://cdn.shopify.com/s/files/1/0581/5064/9942/files/Gifting-Section-Gift-Hampers-Banner-570x630.jpg?v=1727172705",
      },
      {
        id: 4,
        image:
          "https://cdn.shopify.com/s/files/1/0581/5064/9942/files/Gifting-Section-Gift-Cards-Banner-570x308.jpg?v=1727171689",
      },
      {
        id: 5,
        image:
          "https://cdn.shopify.com/s/files/1/0581/5064/9942/files/Gifting-Section-Gift-Cards-Banner-570x308.jpg?v=1727171689",
      },
    ]
  
    return (
      <div className="container mx-auto p-4">
        <h1>GIFTING GUIDE</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* First column - full height banner */}
          <div className="lg:col-span-1 h-full">
            <div className=" h-full rounded-lg overflow-hidden shadow-md">
              <img
                src={giftSections[0].image || "/placeholder.svg"}
                alt={giftSections[0].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="text-center mb-4">
                    {giftSections[0].buttonText}
                </div>
              </div>
            </div>
          </div>
  
          {/* Second and third columns - grid layout */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
              {giftSections.slice(1).map((section) => (
                <div key={section.id} className=" rounded-lg overflow-hidden shadow-md">
                  <img
                    src={section.image || "/placeholder.svg"}
                    alt={section.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end items-center p-4">
                    <h3 className="text-3xl font-bold text-brown-800 mb-2">{section.title}</h3>
                      
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default ImageGallery
  
  