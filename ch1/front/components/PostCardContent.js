import {memo} from "react";
import PropTypes from "prop-types";
import Link from "next/link";


const PostCardContent = memo(({postData}) => {

    return (
        <>
            <div>
                {/* ํด์ํ๊ทธ */}
                { postData.split(/(#[^\s#]+)/g).map((v, i) => {
                    if ( v.match(/(#[^\s#]+)/g) ) {
                        return <Link href={`/hashtag/${v.slice(1)}`} key={i}><a>{v}</a></Link>
                    }

                    return v;
                }) }
            </div>

        </>
    )
})

PostCardContent.propTypes = {
    postData: PropTypes.string.isRequired,
}
export default PostCardContent;