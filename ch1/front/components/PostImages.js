import PropTypes from "prop-types";
import {useCallback, useState} from "react";
import {PlusOutlined} from "@ant-design/icons";
import ImagesZoom from "./imagesZoom";

const PostImages = ({ images }) => {

    const [showImagesZoom, setShowImagesZoom] = useState(false);

    const onZoom = useCallback(() => {
        setShowImagesZoom(true);
    }, [showImagesZoom])

    const onCloseZoom = useCallback(() => {
        setShowImagesZoom(false);
    }, [showImagesZoom]);


    /* 한 개인 경우 이미지 꽉 차게 */
    if ( images.length === 1 ) {
        return (
            <>
                <div>
                    <img role="presentation" src={images[0].src} alt={images[0].alt} onClick={onZoom}/>
                    {showImagesZoom && <ImagesZoom images={images} onClose={onCloseZoom}/>}
                </div>
            </>
        )
    }

    if ( images.length === 2) {
        return (
            <>
                <div>
                    <img role="presentation" width={"50%"} src={images[0].src} alt={images[0].alt} onClick={onZoom}/>
                    <img role="presentation" width={"50%"} src={images[1].src} alt={images[1].alt} onClick={onZoom}/>
                    {showImagesZoom && <ImagesZoom images={images} onClose={onCloseZoom}/>}
                </div>
            </>
        )
    }

    return (
        <>
            <div>
                <img role="presentation" width={"50%"} src={images[0].src} alt={images[0].alt} onClick={onZoom}/>
                <div
                    role={"presentation"}
                    style={{display: 'inline-block', width: '50%', textAlign: 'center', verticalAlign: 'middle'}}
                    onClick={onZoom}
                >
                    <PlusOutlined/>
                    <br/>
                    {images.length - 1} 개의 사진 더보기

                </div>
                {showImagesZoom && <ImagesZoom images={images} onClose={onCloseZoom}/>}
            </div>
        </>
    )

}

PostImages.propTypes = {
    PostImages: PropTypes.arrayOf(PropTypes.object),
}

export default PostImages;