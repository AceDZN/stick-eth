import { Image } from 'react-konva';
import useImage from 'use-image';
const url = 'https://konvajs.github.io/assets/yoda.jpg';


export const ImageSticker = ({url}:{url:string}) => {
    const [image] = useImage(url);
    return (
        <Image image={image} />
    )
}


