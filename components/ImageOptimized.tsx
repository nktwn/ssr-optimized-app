import Image from 'next/image';

interface ImageOptimizedProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    priority?: boolean;
    className?: string;
}

export default function ImageOptimized({
                                           src,
                                           alt,
                                           width,
                                           height,
                                           priority = false,
                                           className = '',
                                       }: ImageOptimizedProps) {
    return (
        <div className={`relative ${className}`}>
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                priority={priority}
                loading={priority ? 'eager' : 'lazy'}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLSQySi0pLisuJjI6UDg2OTozLCctJkRAUFFPPyQ4XEtSV1VNXFRjYUX/2wBDAR..."
            />
        </div>
    );
}