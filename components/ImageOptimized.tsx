import Image, { type ImageProps } from 'next/image';

type Base = {
    src: ImageProps['src'];
    alt: string;
    priority?: boolean;
    className?: string;
    sizes?: string;
    quality?: number;
};

type FillVariant = Base & {
    fill: true;
    width?: never;
    height?: never;
};

type FixedVariant = Base & {
    width: number;
    height: number;
    fill?: false;
};

type Props = FillVariant | FixedVariant;

function isFill(p: Props): p is FillVariant {
    return (p as FillVariant).fill === true;
}

export default function ImageOptimized(props: Props) {
    const {
        src,
        alt,
        priority = false,
        className = '',
        sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
        quality = 80,
    } = props;

    const common: Omit<ImageProps, 'src' | 'alt' | 'fill' | 'width' | 'height'> = {
        priority,
        loading: priority ? 'eager' : 'lazy',
        sizes,
        quality,
        className: `object-cover ${className}`,
        placeholder: 'empty',
    };

    if (isFill(props)) {
        return (
            <div className="relative">
                <Image src={src} alt={alt} fill {...common} />
            </div>
        );
    }

    return (
        <Image
            src={src}
            alt={alt}
            width={props.width}
            height={props.height}
            {...common}
        />
    );
}
