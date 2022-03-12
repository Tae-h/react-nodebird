import PropTypes from "prop-types";

const PostImages = ({images}) => {


    return (
        <>
            <div>
                {images.length > 0 ? <img src={images[0].src}/> : 'images...'}

            </div>
        </>
    )
}

PostImages.propTypes = {
    PostImages: PropTypes.arrayOf(PropTypes.object),
}

export default PostImages;