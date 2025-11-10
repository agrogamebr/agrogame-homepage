'use client'

import Image from 'next/image'
import { useRef, useEffect, useState } from 'react'

export default function DownloadApp() {
  const imageRef = useRef<HTMLImageElement>(null)
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateSize = () => {
      if (imageRef.current) {
        setImageSize({
          width: imageRef.current.offsetWidth,
          height: imageRef.current.offsetHeight
        })
      }
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  const handleAppStoreClick = () => {
    window.open('https://apps.apple.com/app/your-app', '_blank')
  }

  const handleGooglePlayClick = () => {
    window.open('https://play.google.com/store/apps/details?id=com.yourapp', '_blank')
  }

  // Cálculos baseados no tamanho atual da imagem
  const buttonWidth = Math.round(imageSize.width * 0.0902)
  const buttonHeight = Math.round(imageSize.height * 0.0768)
  const buttonTop = Math.round(imageSize.height * 0.684)
  const appStoreLeft = Math.round(imageSize.width * 0.0686)
  const googlePlayLeft = Math.round(imageSize.width * 0.1773)

  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-center relative">
          <Image
            ref={imageRef}
            src="/assets/svgs/downloadApp.svg"
            alt="Download nosso app"
            width={1320}
            height={508}
            className="max-w-[1320px] w-full h-auto"
            onLoad={() => {
              if (imageRef.current) {
                setImageSize({
                  width: imageRef.current.offsetWidth,
                  height: imageRef.current.offsetHeight
                })
              }
            }}
          />

          {imageSize.width > 0 && (
            <div className="absolute inset-0 flex justify-center">
              <div className="relative" style={{ width: imageSize.width, height: imageSize.height }}>
                <button
                  onClick={handleAppStoreClick}
                  className="absolute bg-transparent hover:bg-transparent transition-colors cursor-pointer"
                  style={{
                    left: `${appStoreLeft}px`,
                    top: `${buttonTop}px`,
                    width: `${buttonWidth}px`,
                    height: `${buttonHeight}px`,
                  }}
                  aria-label="Download na App Store"
                />

                <button
                  onClick={handleGooglePlayClick}
                  className="absolute bg-transparent hover:bg-transparent transition-colors cursor-pointer"
                  style={{
                    left: `${googlePlayLeft}px`,
                    top: `${buttonTop}px`,
                    width: `${buttonWidth}px`,
                    height: `${buttonHeight}px`,
                  }}
                  aria-label="Download no Google Play"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}