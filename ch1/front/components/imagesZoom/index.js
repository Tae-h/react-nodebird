import {memo, useState} from "react";
import PropTypes from "prop-types";
import Slick from 'react-slick';
import {CloseBtn, Global, Header, ImageWrapper, Indicator, Overlay, SlickWrapper} from "./styles";

/* styles.js 따로 뺄수 있음! */

const ImagesZoom = memo(({ images, onClose }) => {

    const [currentSlide, setCurrentSlide] = useState(0);

    return (
        <>
            <Overlay>
                <Global/>
                <Header>
                    <h1>상세 이미지</h1>
                    {/*<CloseButton onClick={onClose}>X</CloseButton>*/}
                    <CloseBtn onClick={onClose}>X</CloseBtn>
                </Header>
                <SlickWrapper>
                    <div>
                        <Slick
                            initailSlide={0} /* 0번쨰 부터 슬라이드 */
                            afterChange={(slide) => setCurrentSlide(slide)} /* beforeChange 도 있음*/
                            infinite
                            arrows={false}
                            slidesToShow={1}
                            slidesToScroll={1}
                        >
                            { images?.map((v) => (
                                <ImageWrapper key={v.src}>
                                    <img src={`http://localhost:3060/${v.src}`} alt={v.alt}/>
                                </ImageWrapper>
                            ))}

                        </Slick>
                        <Indicator>
                            <div>
                                {currentSlide + 1}
                                {' '}
                                /
                                {images.length}
                            </div>
                        </Indicator>
                    </div>

                </SlickWrapper>
            </Overlay>
        </>
    )
});

ImagesZoom.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
    onClose: PropTypes.func.isRequired,
}

export default ImagesZoom;